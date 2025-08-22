import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  first_name: { 
    type: String, 
    required: true 
  },
  last_name: { 
    type: String 
  },
  email: { 
    type: String, 
    required: true 
  },
  line_1: { 
    type: String, 
    required: true 
  },
  line_2: { 
    type: String 
  },
  city: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
});

export default mongoose.model("Address", addressSchema);
