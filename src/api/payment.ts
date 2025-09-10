import express from 'express';
import{createPayment,stripeWebhook} from '../application/payment';

const PaymentRouter = express.Router();

PaymentRouter
.route("/create-payment-intent")
.post(createPayment);
PaymentRouter
.route("/webhook")
.post(express.raw({ type: "application/json" }),
  stripeWebhook);
export default PaymentRouter;
