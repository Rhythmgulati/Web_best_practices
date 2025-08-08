import mongoose from 'mongoose';
import AsyncHandler from '../services/AsyncHandler.js';

const connectDB = AsyncHandler(async ()=>{
    try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})

export default connectDB;