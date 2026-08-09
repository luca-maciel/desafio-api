import { RegisterSchemaType } from "../schemas/auth.schema";
import bcrypt from "bcrypt";
import { newUser, getUserByEmail } from '../repositories/user.repository'

export async function register(data: RegisterSchemaType) {
  const user = await getUserByEmail(data.email);
  if (user) {
    return {
      err: "Já existe um usuário com esse email"
    };
  }
  const passwordHash = await bcrypt.hash(data.password, 10);
  return newUser(
    data.name,
    data.email,
    passwordHash
  );
}