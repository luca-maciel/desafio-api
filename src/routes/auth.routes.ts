import { Router } from "express";
import { register } from '../services/user.service'
import { RegisterSchema } from "../schemas/auth.schema";
const router = Router();

router.get("/register", (req:any, res:any) => {
  res.send("rota para form de registro");
});

router.post("/register", async (req, res) => {
  try {
    // primeiro valida os dados 
    const result = RegisterSchema.safeParse(req.body);
    // Se for inválido
    if (!result.success) {
      return res.status(400).json({
        error: "Dados inválidos",
        details: result.error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        })),
      });
    }
    // se é valido pelo Zod
    const user = await register(result.data);
    if ("err" in user) {
      return res.status(409).json({
        error: user.err,
      });
    }
    return res.status(201).json({
      message: "Usuário criado com sucesso",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
});

export default router;