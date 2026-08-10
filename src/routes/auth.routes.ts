import { Router } from "express";
import { register } from '../services/user.service'
import { RegisterSchema, LoginSchema } from "../schemas/auth.schema";
import { User } from "../../generated/prisma/browser";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import { getUserByEmail, getUserById } from "../repositories/user.repository";
import { generateToken } from "../utils/jwt";
import { authMiddleware } from "../middlewares/auth.middleware";
const router = Router();

router.get('/privateTest', authMiddleware, (req: any, res: any) => {
  res.json({ message: "rota privada acessada" })
})

router.get("/register", (req: any, res: any) => {
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
    return res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await getUserByEmail(
      req.body.email
    );

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const token = generateToken(user.id);

    return res.status(200).json({
      token,
    });

  } catch (error) {

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({
      error: "User not authenticated",
    });
  }

  try {
    const user: User | null = await getUserById(req.userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error: any) {
    console.error(
      "Error on fetching authenticated user:",
      JSON.stringify(error, null, 2)
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;