import prisma from "../prisma/prismaClient";
import { messageSelect, reactionSelect } from "../utils/functions/PrismaSelections";

const StoreMessageInDB = async (
  // Returns a Message
  userId: number,
  roomId: number,
  message: string
) => {
  try {
    const msg = await prisma.message.create({
      data: {
        content: message,
        authorId: userId,
        roomId,
      },
      select: messageSelect,
    });

    return msg;
  } catch (error) {
    console.error("Error storing message:", error);
    return null;
  }
};

const ReactToMessages = async (
  // Returns a Reaction to Message
  userId: number,
  messageId: number,
  type: string
) => {
  const newReaction = {
    userId,
    messageId,
    type,
  };

  const Reaction = await prisma.reaction.upsert({
    where: {
      userId_messageId: {
        userId,
        messageId,
      },
    },
    update: newReaction,
    create: newReaction,
    select: reactionSelect,
  });

  return Reaction;
};

export { StoreMessageInDB, ReactToMessages };
