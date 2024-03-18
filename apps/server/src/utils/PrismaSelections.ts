import { Prisma } from "@prisma/client";

export const profileSelect = {
  id: true,
  bio: true,
  image: true,
  userId: true,
} satisfies Prisma.ProfileSelect;

export type MyProfilePayload = Prisma.ProfileGetPayload<{
  select: typeof profileSelect;
}>;

export const contactSelect = {
  id: true,
  name: true,
  username: true,
  profile: {
    select: profileSelect,
  },
} satisfies Prisma.UserSelect;

export type MyContactPayload = Prisma.UserGetPayload<{
  select: typeof contactSelect;
}>;

export const reactionSelect = {
  id: true,
  createdAt: true,
  user: {
    select: {
      name: true,
      id: true,
      profile: {
        select: {
          image: true,
        },
      },
    },
  },
} satisfies Prisma.ReactionSelect;

export type MyReactionPayload = Prisma.ReactionGetPayload<{
  select: typeof reactionSelect;
}>;

export const messageSelect = {
  id: true,
  createdAt: true,
  content: true,
  author: true,
  roomId: true,
  reactions: {
    select: reactionSelect,
  },
} satisfies Prisma.MessageSelect;

export type MyMessagePayload = Prisma.MessageGetPayload<{
  select: typeof messageSelect;
}>;

export const roomSelect = {
  id: true,
  name: true,
  code: true,
  updatedAt: true,
  messages: {
    select: messageSelect,
    orderBy: {
      createdAt: "desc",
    },
  },
  participants: {
    select: contactSelect,
    orderBy: {
      name: "asc",
    },
  },
  admin: true,
  adminId: true,
  isPeer2Peer: true,
} satisfies Prisma.RoomSelect;

export type MyRoomPayload = Prisma.RoomGetPayload<{
  select: typeof roomSelect;
}>;

export const userSelect = {
  id: true,
  name: true,
  username: true,
  profile: {
    select: profileSelect,
  },
  contacts: {
    select: contactSelect,
    orderBy: {
      name: "asc",
    },
  },
  rooms: {
    select: roomSelect,
    orderBy: {
      updatedAt: "desc",
    },
  },
} satisfies Prisma.UserSelect;

export type MyUserPayload = Prisma.UserGetPayload<{
  select: typeof userSelect;
}>;

///////////////////////////////////////////////////////
//      HISTORICAL DATA SELECTIONS
//////////////////////////////////////////////////////

const roomHSelect = {
  ...roomSelect,
  messages: {
    take: 5,
  },
} satisfies Prisma.RoomSelect;

export const HistoricalDataSelect = {
  ...userSelect,
  rooms: {
    select: roomHSelect,
    orderBy: {
      updatedAt: "desc",
    },
  },
} satisfies Prisma.UserSelect;
