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
import { clerkMiddleware } from '@clerk/express';




const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Skip Clerk middleware for OPTIONS requests
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  return clerkMiddleware()(req, res, next);
});


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
