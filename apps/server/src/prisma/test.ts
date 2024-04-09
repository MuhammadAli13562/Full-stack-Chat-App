import prisma from "./prismaClient";

async function DeleteAllMessages() {
  try {
    await prisma.message.deleteMany({});
  } catch (error) {
    console.log("ERROR DELETING MESSAGE");
  }
}

async function DeleteAllUsers() {
  try {
    await prisma.user.deleteMany({});
  } catch (error) {
    console.log("ERROR DELETING USERS");
  }
}
DeleteAllUsers();
