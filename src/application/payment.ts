import Stripe from "stripe";
import Order from "../infrastructure/db/entities/Orders";
import Address from "../infrastructure/db/entities/Address";
import { Request, Response, NextFunction } from "express";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20" as Stripe.LatestApiVersion,
});

const createPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { amount, orderData } = req.body;

    const savedAddress = await Address.create(orderData.address);

    const savedOrder = await Order.create({
      ...orderData,
      addressId: savedAddress._id,
      paymentStatus: "PENDING",
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "lkr",
      automatic_payment_methods: { enabled: true },
      metadata: {
        orderId: savedOrder._id.toString(),
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      orderId: savedOrder._id,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    next(error);
  }
};

const stripeWebhook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sig = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(req.body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);

    console.log("Stripe event received:", event.type);
    console.log("Event data:", event.data.object);

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("PaymentIntent metadata:", paymentIntent.metadata);

      const orderId = paymentIntent.metadata.orderId;
      console.log("Order ID from metadata:", orderId);

      if (orderId) {
        const order = await Order.findByIdAndUpdate(
          orderId,
          {paymentStatus: "PAID", paymentDetails: paymentIntent},
          { new: true }
        );
        console.log("Updated Order:", order);
      } 
    }  

    res.status(200).json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(400).send(`Webhook Error: ${(err as any).message}`);
  }  next();
};

export { createPayment, stripeWebhook };
