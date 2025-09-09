"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeWebhook = exports.createPayment = void 0;
const stripe_1 = __importDefault(require("stripe"));
const Orders_1 = __importDefault(require("../infrastructure/db/entities/Orders"));
const Address_1 = __importDefault(require("../infrastructure/db/entities/Address"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20",
});
const createPayment = async (req, res, next) => {
    try {
        const { amount, orderData } = req.body;
        const addressDoc = await Address_1.default.create(orderData.address); // orderData.address must exist
        const savedOrder = await Orders_1.default.create({
            ...orderData,
            addressId: addressDoc._id,
            paymentStatus: "PENDING",
        });
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "lkr",
            automatic_payment_methods: { enabled: true },
            metadata: { orderId: savedOrder._id.toString() },
        });
        res.json({
            clientSecret: paymentIntent.client_secret,
            orderId: savedOrder._id,
        });
    }
    catch (error) {
        console.error("Stripe error:", error);
        next(error);
    }
};
exports.createPayment = createPayment;
// Stripe Webhook
const stripeWebhook = async (req, res, next) => {
    try {
        const sig = req.headers["stripe-signature"];
        const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        console.log("🔔 Stripe event received:", event.type);
        console.log("📝 Event data:", event.data.object);
        if (event.type === "payment_intent.succeeded") {
            const paymentIntent = event.data.object;
            console.log("💰 PaymentIntent metadata:", paymentIntent.metadata);
            const orderId = paymentIntent.metadata.orderId;
            console.log("📦 Order ID from metadata:", orderId);
            if (orderId) {
                const order = await Orders_1.default.findByIdAndUpdate(orderId, { paymentStatus: "PAID", paymentDetails: paymentIntent });
                console.log("✅ Updated Order:", order);
            }
        }
        res.status(200).json({ received: true });
    }
    catch (err) {
        console.error("Webhook error:", err);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
    next();
};
exports.stripeWebhook = stripeWebhook;
//# sourceMappingURL=payment.js.map