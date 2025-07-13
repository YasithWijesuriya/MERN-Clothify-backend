import mongoose from 'mongoose';
const connectDB = async () => {
    try{
        const MONGODB_URL = process.env.MONGODB_URL;

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