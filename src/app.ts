const express:any = require('express');
const app:any = express();
const PORT:number = 8080;
import authRoutes from "./routes/auth.routes";
import cors from 'cors';

app.use(express.json());
app.use(cors());

app.get("/", ({req, res}:any)=>{
    res.send("ta funfano")
})
app.use("/auth", authRoutes);


export {app, PORT};

