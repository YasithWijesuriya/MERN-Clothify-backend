import express from 'express';
import{createPayment,stripeWebhook} from '../application/payment';
import bodyParser from 'body-parser';

const PaymentRouter = express.Router();

PaymentRouter
.route("/create-payment-intent")
.post(createPayment);
PaymentRouter
.route("/webhook")
.post(bodyParser.raw({ type: "application/json" }), stripeWebhook);
export default PaymentRouter;
