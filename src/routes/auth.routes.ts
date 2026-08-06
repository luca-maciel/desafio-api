import { Router } from "express";
import { register } from '../services/user.service'
const router = Router();

router.get("/register", (req:any, res:any) => {
  res.send("rota para form de registro");
});

router.post('/register/send', (req:any, res:any)=>{
  res.send("rota para post do form de registro");
});

export default router;