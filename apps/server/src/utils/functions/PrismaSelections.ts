import { Prisma } from "@prisma/client";

export const profileSelect = {
  id: true,
  bio: true,
  image: true,
  userId: true,
  user: {
    select: {
      name: true,
    },
  },
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
  message: {
    select: {
      roomId: true,
    },
  },
  messageId: true,
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
  readBy: {
    select: {
      id: true,
      name: true,
      username: true,
    },
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
  image: true,
  bio: true,
  messages: {
    select: messageSelect,
    orderBy: {
      createdAt: "asc",
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

export const HistoricalDataSelect = {
  ...userSelect,
  rooms: {
    select: roomSelect,
    orderBy: {
      updatedAt: "desc",
    },
  },
} satisfies Prisma.UserSelect;

export type MyHistoricalDataPayload = Prisma.UserGetPayload<{
  select: typeof HistoricalDataSelect;
}>;
