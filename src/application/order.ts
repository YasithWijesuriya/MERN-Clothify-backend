import { NextFunction, Request, Response } from "express";
import Address from "../infrastructure/db/entities/Address";
import Order from "../infrastructure/db/entities/Orders";
import NotFoundError from "../domain/errors/not-found-error";
import UnauthorizedError from "../domain/errors/unauthorized-error";
import { getAuth } from "@clerk/express";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, items, address, paymentMethod, paymentDetails, totalPrice } = req.body;

    // create Address doc
    const addressDoc = await Address.create(address);
    //addressDoc කියන්නේ DB එකෙන් return වෙන saved document (උදා: _id තියෙන object).

    // create order
    const deliveryEta = new Date(Date.now() + 48 * 60 * 60 * 1000); // දැන් සිට 48 පැය (48 * 60 * 60 * 1000 ms) ගණනය කරනවා
    const order = await Order.create({
      userId,
      items,
      addressId: addressDoc._id,
      totalPrice,
      paymentMethod,
      paymentDetails,
      paymentStatus: paymentMethod === 'CREDIT_CARD' ? 'PAID' : 'PENDING',
      deliveryEta,
    });

    res.status(201).json({ orderId: order._id, eta: deliveryEta.toISOString() });
  } catch (error) {
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


