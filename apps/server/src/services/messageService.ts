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

const ReactToMessagesInDB = async (
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

const ReadMessageInDB = async (userId: number, messageIds: number[], roomId: number) => {
  try {
    const msgs_Promises = messageIds.map(async (id) => {
      try {
        const updated_msg = await prisma.message.update({
          where: {
            roomId,
            id,
          },
          data: {
            readBy: {
              connect: {
                id: userId,
              },
            },
          },
          select: messageSelect,
        });
        return updated_msg;
      } catch (error) {
        console.log("Error : Updating Message : ", error);
        return null;
      }
    });

    const msgs = await Promise.all(msgs_Promises);
    return msgs;
  } catch (error) {
    console.log("ReadMessageError");
    return null;
  }
};

export { StoreMessageInDB, ReactToMessagesInDB, ReadMessageInDB };
