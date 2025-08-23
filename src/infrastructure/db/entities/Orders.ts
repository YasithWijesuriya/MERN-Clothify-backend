import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
});

const OrderSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true
  }, 
  items: { 
    type: [ItemSchema], 
    required: true 
  },
  addressId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Address", 
    required: true 
  },
  totalPrice: { 
    type: Number, 
    required: true 
  },
  paymentMethod: { 
    type: String, 
    enum: ["CREDIT_CARD", "COD", "ONLINE"], 
    required: true 
  },
  paymentDetails: { 
    type: Object, 
    default: {} 
  },
  paymentStatus: { 
    type: String, 
    enum: ["PENDING","PAID","REFUNDED"], 
    default: "PENDING" 
  },
  orderStatus: {
    type: String,
    enum: ["PENDING", "SHIPPED", "FULFILLED", "CANCELLED"],
    default: "PENDING",
  },
  createdAt: { type: Date, default: Date.now },
  deliveryEta: { type: Date }, // delivery වලට + 48h
});

export default mongoose.model("Order", OrderSchema);
