import {connectDB} from './src/infrastructure/db/index.js';
import express from 'express';
import productRouter from './src/api/product.js';
import categoryRouter from './src/api/categories.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;
app.use(express.json());

app.use("/api/products",productRouter);
app.use("/api/categories",categoryRouter);

connectDB();


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})