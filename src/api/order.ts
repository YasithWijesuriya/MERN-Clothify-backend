
import express from "express";
import { createOrder, getAllOrders ,getMyOrders,getDailySales } from "../application/order";
import { isAuthenticated } from '../api/middleware/authentication-middleware';
import { isAdmin } from '../api/middleware/authorization-middleware';



const orderRouter = express.Router();

orderRouter.route("/")
.get(isAuthenticated, isAdmin, getAllOrders)
.post(isAuthenticated, createOrder);

orderRouter.route("/my-orders")
.get(isAuthenticated, getMyOrders);

orderRouter.route("/daily-sales")
.get(isAuthenticated, isAdmin, getDailySales);



export default orderRouter;