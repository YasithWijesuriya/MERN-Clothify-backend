import express from 'express';
import { createPayment} from '../application/payment';

const PaymentRouter = express.Router();

PaymentRouter
.route("/create-payment-intent")
.post(createPayment);



export default PaymentRouter;
