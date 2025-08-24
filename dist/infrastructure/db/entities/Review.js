"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true
    }, // Clerk user id
    user: {
        type: String,
        required: true
    }, // Display name (from Clerk)
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true, min: 1, max: 5
    },
    productId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'product', required: true
    },
}, { timestamps: true });
const Review = mongoose_1.default.model("Review", reviewSchema);
exports.default = Review;
//# sourceMappingURL=Review.js.map