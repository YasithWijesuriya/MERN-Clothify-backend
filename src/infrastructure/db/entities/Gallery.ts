import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  description: { 
    type: String, 
    required: true 
  },
  images: [{ 
    type: String, 
    required: true 
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

const Gallery = mongoose.model("Gallery", gallerySchema);

export default Gallery;
