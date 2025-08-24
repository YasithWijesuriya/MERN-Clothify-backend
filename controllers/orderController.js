const Order = require('../models/Order');
const Product = require('../models/Product');  // Add this line

const getMyOrders = async (req, res, next) => {
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