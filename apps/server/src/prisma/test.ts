import prisma from "./prismaClient";

async function DeleteAllMessages() {
  try {
    await prisma.message.deleteMany({});
  } catch (error) {
    console.log("ERROR DELETING MESSAGE");
  }
}
DeleteAllMessages();
