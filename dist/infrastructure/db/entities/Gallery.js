"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const gallerySchema = new mongoose_1.default.Schema({
    description: {
        type: String,
        required: true
    },
    images: [{
            type: String,
            required: true
        }],
    createdAt: {
        type: Date,
        default: Date.now
    },
});
const Gallery = mongoose_1.default.model("Gallery", gallerySchema);
exports.default = Gallery;
//# sourceMappingURL=Gallery.js.map