// Adding New Messages In Rooms

import prisma from "../prisma/prismaClient";

// Returns a Message
const StoreMessageInDB = async (
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
    });

    return msg;
  } catch (error) {
    console.error("Error storing message:", error);
    return null;
  }
};

// Returns a Reaction to Message
const ReactToMessages = async (
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
  });

  return Reaction;
};

export { StoreMessageInDB, ReactToMessages };
