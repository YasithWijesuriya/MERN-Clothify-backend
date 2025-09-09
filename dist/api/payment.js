"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_1 = __importDefault(require("../application/payment"));
const PaymentRouter = express_1.default.Router();
PaymentRouter
    .route("/create-payment-intent")
    .post(payment_1.default);
exports.default = PaymentRouter;
//# sourceMappingURL=payment.js.map