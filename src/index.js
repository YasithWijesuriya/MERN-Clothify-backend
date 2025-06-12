import {connectDB} from './infrastructure/db/index.js';
import express from 'express';
import productRouter from './api/product.js';
import categoryRouter from './api/categories.js';
import reviewRouter from './api/review.js';
import dotenv from 'dotenv';
import globalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware.js";


dotenv.config();

const app = express();
const PORT = 3000;
app.use(express.json());

app.use("/api/products",productRouter);
app.use("/api/categories",categoryRouter);
app.use("/api/reviews",reviewRouter);

app.use(globalErrorHandlingMiddleware);

connectDB();


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})