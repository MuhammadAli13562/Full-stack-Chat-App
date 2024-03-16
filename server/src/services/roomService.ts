import prisma from "../prisma/prismaClient";

// Creating New Peer to Peer Rooms   ( ON ADDING THEM AS CONTACT )
export const CreateP2PRoom = async (userId: number, contactId: number) => {
  const code = await generateP2PRoomCodes(userId, contactId);
  const prevRoom = await prisma.room.findUnique({
    where: {
      code,
    },
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
  });

  return newRoom;
};

// generate peer to peer room codes
const generateP2PRoomCodes = async (userId: number, contactId: number) => {
  const users = [userId, contactId].sort();
  const code = users.join("_");
  return code;
};

// type of GroupInfo from client
export type GroupInfoType = {
  contactIds: number[];
  name: string;
};

// Creating New Multiple User Rooms  ( ON CREATE GROUP BY ADMIN )
export const CreateNewGroupAsAdmin = async (
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
  });

  return room;
};

// Add Other Users to Room
export const AddUserstoRoomAsAdmin = async (
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
    include: {
      participants: true,
    },
  });

  return room;
};

// Fetch all Room Data
export const fetchRoomData = async (roomid: number) => {
  const room = await prisma.room.findUnique({
    where: {
      id: roomid,
    },
    include: {
      participants: true,
      messages: true,
      admin: true,
    },
  });

  return room;
};

// Joining Rooms By Room-code

// Leaving Rooms As Admin

// Leaving Rooms

// Fetch based on pagination cursor
