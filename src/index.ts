import "dotenv/config";
import {connectDB} from './infrastructure/db/index';
import express from 'express';
import productRouter from './api/product';
import categoryRouter from './api/categories';
import reviewRouter from './api/review';
import orderRouter  from './api/order';
import colorRouter from './api/color';
import galleryRouter from "./api/gallery";
import globalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware";
import cors from 'cors';
import { clerkMiddleware, createClerkClient } from '@clerk/express';

// Extend Express Request interface to include auth
declare global {
  namespace Express {
    interface Request {
      auth?: any;
    }
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(cors({ 
  origin: process.env.NODE_ENV === "production" 
    ? [
        "https://your-frontend-domain.vercel.app", // Replace with your actual frontend domain
        "https://your-custom-domain.com"           // Replace with your custom domain if any
      ]
    : "http://localhost:5173",
  credentials: true 
}));

app.use(express.json());

// Clerk middleware setup - apply to all routes
app.use(clerkMiddleware());

app.use("/api/products",productRouter);
app.use("/api/categories",categoryRouter);
app.use("/api/reviews",reviewRouter);
app.use("/api/orders",orderRouter);
app.use("/api/colors",colorRouter);
app.use("/api/gallery", galleryRouter);

app.use(globalErrorHandlingMiddleware);

connectDB();

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
