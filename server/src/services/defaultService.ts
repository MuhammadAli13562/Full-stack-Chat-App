import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const GetDefaultData = async (username: string) => {
  const data = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      name: true,
      rooms: {
        include: {
          messages: {
            include: {
              reactions: true,
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 5,
          },
          participants: {
            orderBy: {
              name: "asc",
            },
          },
        },
      },
      profile: {
        select: {
          bio: true,
          image: true,
        },
      },
      contacts: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  return data;
};

export { GetDefaultData };

// GetDefaultData
// >>> Fetches default data for a user <<<
// -Fetches User's Rooms with latest 5 messages and all participants ,
// -Fetches User's Contacts
// -Fetches User's Profile
