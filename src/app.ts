const express:any = require('express');
const app:any = express();
const PORT:number = 8080;
import authRoutes from "./routes/auth.routes";

app.use(express.json());

app.use("/auth", authRoutes);


export {app, PORT};

