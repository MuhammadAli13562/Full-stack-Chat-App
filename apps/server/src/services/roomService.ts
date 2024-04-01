import prisma from "../prisma/prismaClient";
import { roomSelect } from "../utils/functions/PrismaSelections";
import generateP2PRoomCodes from "../utils/functions/generateP2Pcode";
import { GroupInfoType } from "../utils/types";

export const CreateP2PRoom = async (userId: number, contactId: number) => {
  // Creating New Peer to Peer Rooms   ( ON ADDING THEM AS CONTACT )
  const code = await generateP2PRoomCodes(userId, contactId);
  const prevRoom = await prisma.room.findUnique({
    where: {
      code,
    },
    select: roomSelect,
  });

  if (prevRoom) return prevRoom;

  const newRoom = await prisma.room.create({
    data: {
      isPeer2Peer: true,
      code: code,
      participants: {
        connect: [
          {
            id: userId,
          },
          {
            id: contactId,
          },
        ],
      },
      name: "p2p",
    },
    select: roomSelect,
  });

  return newRoom;
};

export const CreateNewGroupAsAdmin = async (
  // Creating New Multiple-User Room  ( ON CREATE GROUP BY ADMIN )
  userId: number,
  GroupInfo: GroupInfoType
) => {
  const contactIds = GroupInfo.contactIds;
  contactIds.push(userId);

  const room = await prisma.room.create({
    data: {
      name: GroupInfo.name,
      admin: {
        connect: {
          id: userId,
        },
      },
      participants: {
        connect: contactIds.map((contactId) => {
          return { id: contactId };
        }),
      },
    },
    select: {
      code: true,
    },
  });

  return room;
};

export const AddUserstoRoomAsAdmin = async (
  // Add Other Users to Room
  roomid: number,
  contactIds: number[]
) => {
  const room = await prisma.room.update({
    where: {
      id: roomid,
    },
    data: {
      participants: {
        connect: contactIds.map((contactId) => {
          return { id: contactId };
        }),
      },
    },
    select: roomSelect,
  });

  return room;
};

export const fetchRoomData = async (roomid: number) => {
  // Fetch all Room Data
  const room = await prisma.room.findUnique({
    where: {
      id: roomid,
    },
    select: roomSelect,
  });

  return room;
};

// Joining Rooms By Room-code

// Leaving Rooms As Admin

// Leaving Rooms

// Fetch based on pagination cursor
