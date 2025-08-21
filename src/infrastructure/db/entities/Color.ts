import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: false,
    },
    colorSlug :{
        type: String,
        required: true,
        unique: true,
    }
}, {
    timestamps: true
});


const color = mongoose.model('color', colorSchema);

export default color; 