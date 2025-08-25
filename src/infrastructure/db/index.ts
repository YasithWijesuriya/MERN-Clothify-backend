import mongoose from 'mongoose';
// Import all models to ensure they are registered
import '../db/entities/Product';
import '../db/entities/Categories';
import '../db/entities/Review';
import '../db/entities/Orders';
import '../db/entities/Color';

const connectDB = async () => {
    try{
        const MONGODB_URL = process.env.MONGODB_URL || process.env.MONGODB_URI;

        if(!MONGODB_URL) {
            throw new Error("MongoDB URI is not defined");
        }
        await mongoose.connect(MONGODB_URL);
        console.log("MongoDB connected successfully");

    }catch (error) {
        if(error instanceof Error) {
            //we call this narrowing the type of error(use for ts error handling)
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); 
     }// If connection fails,let's exit the process
    }
};

export {connectDB};