import { User } from "@prisma/client";
import { prisma } from "../lib/prisma";
/*

Criar funções

finds...

newUser()


*/

async function newUser(name:string, email:string, password:string) {
  const newUser:User = await prisma.user.create({
    data:{name, email, password}
  });
  return newUser;
}

// função para buscar vários usuários com um determinado nome.
// não busca um único pois pode haver vários usuários com o mesmo nome
async function getUserByName(name:string){
    const users:(User|null)[] = await prisma.user.findMany({
        where: {
            name,
        },
    })
}

// busca um único usuário com o email passado no parametro
async function getUserByEmail(email:string){
    const user:User|null = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    return user;
}

// busca todos os usuários. retorna uma lista com eles
async function getAllUsers(){
    const users:User[] = await prisma.user.findMany();
    return users;
}

export {getAllUsers, getUserByName, getUserByEmail, newUser};