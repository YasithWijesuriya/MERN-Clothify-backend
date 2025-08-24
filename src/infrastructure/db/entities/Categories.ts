import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    categorySlug: {
        type: String,
        required: true,
        unique: true, 
    },


});
const category = mongoose.model('category',categorySchema);
export default category;