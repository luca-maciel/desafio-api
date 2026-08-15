import { z } from "zod";

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres"),

  email: z
    .string()
    .email("E-mail inválido"),

  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .max(50, "A senha deve ter no máximo 50 caracteres")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número")
    .regex(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um caractere especial"),
});

export const ResetPasswordSchema = z.object({
  email: z
    .string()
    .email(),

  code: z
    .string()
    .length(6),

  password: z
    .string()
    .min(8)
    .max(50)
    .regex(/[A-Z]/, "Password must contain an uppercase letter.")
    .regex(/[a-z]/, "Password must contain a lowercase letter.")
    .regex(/[0-9]/, "Password must contain a number."),
});

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(6, "Password must contain at least 6 characters"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;