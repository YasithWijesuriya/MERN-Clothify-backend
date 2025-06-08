import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
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
});

const product =mongoose.model('product',
productSchema);

export default product;