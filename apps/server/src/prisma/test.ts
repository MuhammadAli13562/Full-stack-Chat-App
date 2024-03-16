import prisma from "./prismaClient";

async function CleanUsers() {
  const clearall = await prisma.user.deleteMany({});
}

async function FetchUsers() {
  try {
    const data = await prisma.user.findMany({});
    console.log(data);
    return data;
  } catch (error: any) {
    console.log("Error : ", error.message);
  }
}

async function CreateUser() {
  const user = await prisma.user.create({
    data: {
      email: "a@assd",
      passwordHash: "123",
      name: "Ali",
      username: "asdef",
    },
  });
  console.log(user);
}

//CleanUsers();
FetchUsers();
//CreateUser();
