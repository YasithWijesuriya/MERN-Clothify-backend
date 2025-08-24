"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Import all models to ensure they are registered
require("../db/entities/Product");
require("../db/entities/Categories");
require("../db/entities/Review");
require("../db/entities/Orders");
require("../db/entities/Color");
const connectDB = async () => {
    try {
        const MONGODB_URL = process.env.MONGODB_URL;
        if (!MONGODB_URL) {
            throw new Error("MongoDB URI is not defined");
        }
        await mongoose_1.default.connect(MONGODB_URL);
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        if (error instanceof Error) {
            //we call this narrowing the type of error(use for ts error handling)
            console.error("MongoDB connection failed:", error.message);
            process.exit(1);
        } // If connection fails,let's exit the process
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=index.js.map