"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    //child reference
    categoryId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'category',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    description: {
        type: String,
        required: true,
    },
    // Optional color reference
    colorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'color',
        required: false,
    },
    // parent reference
    reviews: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "Review",
        default: [],
    },
    categorySlug: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    colorSlug: {
        type: String,
        required: false,
        lowercase: true,
        trim: true
    }
});
const product = mongoose_1.default.model('Product', productSchema);
exports.default = product;
//# sourceMappingURL=Product.js.map