import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    //child referance
    categoryID:{
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
    // parent referance
    reviews: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Review",
    default: [],
  },
});

const product =mongoose.model('product',productSchema);

export default product;