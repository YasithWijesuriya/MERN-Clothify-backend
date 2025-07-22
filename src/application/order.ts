import { NextFunction, Request, Response } from "express";
import Address from "../infrastructure/db/entities/Address";
import Order from "../infrastructure/db/entities/Orders";
import NotFoundError from "../domain/errors/not-found-error";
import UnauthorizedError from "../domain/errors/unauthorized-error";
import { getAuth } from "@clerk/express";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    console.log(data); 
    const { userId } = getAuth(req);
     
    

    const address = await Address.create(data.shippingAddress);
    await Order.create({
      addressId: address._id,
      items: data.orderItems,
      userId: userId,
    });

    res.status(201).send();
  } catch (error) {
    console.error("Order create error:", error);
    next(error);
  }
};

const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    const orderId = req.params.id;

    const order = await Order.findById(orderId);
    if (!order) {
      throw new NotFoundError("Order not found");
    }

    if (order.userId !== userId) {
      throw new UnauthorizedError("Unauthorized");
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error in getAllProduct:", error);
    next(error);
  }
};

export {createOrder, getOrder};