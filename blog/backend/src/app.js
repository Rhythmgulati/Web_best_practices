import express from 'express';
import { UserRoutes } from './routes/Users.routes.js';
const app = express();

app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Hello from server");
})
app.use("/api/v1/users",UserRoutes);







export default app;