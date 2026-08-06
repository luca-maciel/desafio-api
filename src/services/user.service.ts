import { RegisterSchemaType } from "../schemas/auth.schema";
import bcrypt from "bcrypt";
import { newUser, getUserByEmail } from '../repositories/user.repository'

export async function register(data: RegisterSchemaType) {
  // verificar se email já existe, se sim, retorna um erro, se não, cria o hash de senha e cria o usuário
  getUserByEmail(data.email).then((user)=>{
    return {err: "Já existe um usuário com esse email"};
  }).catch(async()=>{
    const passwordHash = await bcrypt.hash(data.password, 10);
    
    return newUser(data.name,data.email,passwordHash);

  })

}