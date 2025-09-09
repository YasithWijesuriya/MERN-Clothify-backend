"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_1 = require("../application/payment");
const body_parser_1 = __importDefault(require("body-parser"));
const PaymentRouter = express_1.default.Router();
PaymentRouter
    .route("/create-payment-intent")
    .post(payment_1.createPayment);
PaymentRouter
    .route("/webhook")
    .post(body_parser_1.default.raw({ type: "application/json" }), payment_1.stripeWebhook);
exports.default = PaymentRouter;
//# sourceMappingURL=payment.js.map