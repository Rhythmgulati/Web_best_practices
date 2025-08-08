import app from "./app.js";
import connectDB from "./config/db.js";
import dotenv from 'dotenv'
dotenv.config({});


connectDB();



app.listen(process.env.PORT,()=>{
    console.log(`Listening to port ${process.env.PORT}`);
    
})
