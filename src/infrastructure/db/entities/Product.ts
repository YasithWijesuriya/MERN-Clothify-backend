import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    //child reference
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
        required:true,
    },
    name:{
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    description: {
        type: String,
        required: true,
    },
    // Optional color reference
    colorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'color',
        required: false, 
    },
    // parent reference
    reviews: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Review",
    default: [],
  },
  categorySlug: {
    type: String,
    required: true,
    lowercase: true, 
    trim: true
    },
    colorSlug: {
        type: String,
        required: false,
        lowercase: true,
        trim: true
    }

});

const product =mongoose.model('Product',productSchema);

export default product;