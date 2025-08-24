"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ItemSchema = new mongoose_1.default.Schema({
    productId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: { type: Number, required: true },
});
const OrderSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true
    },
    items: {
        type: [ItemSchema],
        required: true
    },
    addressId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["CREDIT_CARD", "COD", "ONLINE"],
        required: true
    },
    paymentDetails: {
        type: Object,
        default: {}
    },
    paymentStatus: {
        type: String,
        enum: ["PENDING", "PAID", "REFUNDED"],
        default: "PENDING"
    },
    orderStatus: {
        type: String,
        enum: ["PENDING", "SHIPPED", "FULFILLED", "CANCELLED"],
        default: "PENDING",
    },
    createdAt: { type: Date, default: Date.now },
    deliveryEta: { type: Date }, // delivery වලට + 48h
});
exports.default = mongoose_1.default.model("Order", OrderSchema);
//# sourceMappingURL=Orders.js.map