"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const colorSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: false,
    },
    colorSlug: {
        type: String,
        required: true,
        unique: true,
    }
});
const color = mongoose_1.default.model('color', colorSchema);
exports.default = color;
//# sourceMappingURL=Color.js.map