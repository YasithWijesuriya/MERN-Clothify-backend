import {connectDB} from './infrastructure/db/index';
import express from 'express';
import productRouter from './api/product';
import categoryRouter from './api/categories';
import reviewRouter from './api/review';
import {orderRouter} from './api/order';
import dotenv from 'dotenv';
import globalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware";
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/products",productRouter);
app.use("/api/categories",categoryRouter);
app.use("/api/reviews",reviewRouter);
app.use("/api/orders",orderRouter);

app.use(globalErrorHandlingMiddleware);

connectDB();


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})