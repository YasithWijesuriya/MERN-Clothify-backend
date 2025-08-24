import { NextFunction, Request, Response } from "express";
import Address from "../infrastructure/db/entities/Address";
import Order from "../infrastructure/db/entities/Orders";
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
const getMyOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = getAuth(req);
    if (!auth || !auth.userId) {
      return res.status(401).json({ 
        status: 'error',
        message: 'Authentication required' 
      });
    }

    const orders = await Order.find({ userId: auth.userId })
      .populate('addressId')
      .populate({
        path: 'items.productId',
        model: 'Product'
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      data: orders
    });
  } catch (error) {
    next(error);
  }
};
const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const orders = await Order.find()
      .populate("addressId") 
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  }catch(error){
    next(error);
  }
};

const getDailySales = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const daysRaw = req.query.days;
    let daysStr: string;

    if (Array.isArray(daysRaw)) {
      daysStr = String(daysRaw[0]);
    } else if (typeof daysRaw === "string") {
      daysStr = daysRaw;
    } else {
      daysStr = "7"; // default
    }

    const days = Math.min(Math.max(parseInt(daysStr, 10), 1), 90);
    const tz = "Asia/Colombo";
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(today);
    start.setDate(today.getDate() - (days - 1));

    const rows = await Order.aggregate([
      { 
        $match: { 
          paymentStatus: "PAID", 
          createdAt: { $gte: start } 
        } 
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
              timezone: tz,
            },
          },
          total: { $sum: "$totalPrice" },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          total: { $round: ["$total", 2] },
        },
      },
      { $sort: { date: 1 } },
    ]);

    const map = new Map(rows.map((r) => [r.date, r.total]));
    const fill = [];
    for (let i = 0; i < days; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      fill.push({ date: key, total: map.get(key) ?? 0 });
    }

    res.json(fill);
  } catch (error) {
    next(error);
  }
};

export {createOrder, getAllOrders, getMyOrders, getDailySales};   