import Stripe from "stripe";
import { Request, Response,NextFunction} from "express";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20" as Stripe.LatestApiVersion,
});

const createPayment = async (req: Request, res: Response,next:NextFunction) => {

    try {
      const { amount } = req.body;
    
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd", 
        automatic_payment_methods: { enabled: true },
      });
    
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Stripe error:", error);
      next(error);
    }
    };


export default createPayment;
