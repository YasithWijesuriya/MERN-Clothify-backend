import Stripe from "stripe";
import Order from "../infrastructure/db/entities/Orders";
import { Request, Response, NextFunction } from "express";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20" as Stripe.LatestApiVersion,
});

// ✅ Create Payment Intent
const createPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { amount, orderData } = req.body;

    // 1️⃣ Save order in DB before payment
    const savedOrder = await Order.create({
      ...orderData,
      paymentStatus: "PENDING",
    });

    // 2️⃣ Create payment intent with metadata
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd", // or "lkr" if you support LKR payments
      automatic_payment_methods: { enabled: true },
      metadata: {
        orderId: savedOrder._id.toString(), // attach orderId to payment
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      orderId: savedOrder._id, // send to frontend if needed
    });
  } catch (error) {
    console.error("Stripe error:", error);
    next(error);
  }
};

// ✅ Stripe Webhook
const stripeWebhook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sig = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(req.body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);

    console.log("🔔 Stripe event received:", event.type);
    console.log("📝 Event data:", event.data.object);

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("💰 PaymentIntent metadata:", paymentIntent.metadata);

      const orderId = paymentIntent.metadata.orderId;
      console.log("📦 Order ID from metadata:", orderId);

      if (orderId) {
        const order = await Order.findByIdAndUpdate(
          orderId,
          {paymentStatus: "PAID", paymentDetails: paymentIntent},
        );
        console.log("✅ Updated Order:", order);
      } 
    }  

    res.status(200).json({ received: true });
  } catch (err) {
    console.error("❌ Webhook error:", err);
    res.status(400).send(`Webhook Error: ${(err as any).message}`);
  }  next();
};

export { createPayment, stripeWebhook };
