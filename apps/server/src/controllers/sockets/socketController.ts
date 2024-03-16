import { Server } from "socket.io";
import http from "http";
import { StoreMessageInDB } from "../../services/messageService";
import {
  CreateNewGroupAsAdmin,
  CreateP2PRoom,
  GroupInfoType,
  fetchRoomData,
} from "../../services/roomService";
import prisma from "../../prisma/prismaClient";
import { addtoContacts } from "../../services/userService";
import { verifyJwtToken } from "../../services/authService";

export const SocketServerInit = (server: http.Server) => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", async (socket) => {
    const token = socket.handshake.auth.token;
    const id = await verifyJwtToken(token);
    const userId = id?.id || 0;
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                      DEFAULT ROOM JOINING

    console.log("in sockets server : ", userId);

    const loadDefaults = async () => {
      const rooms = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          rooms: {
            select: {
              id: true,
            },
          },
        },
      });

      const roomsArray = rooms?.rooms.map((room) => "room" + room.id);

      // Join room previously saved in database
      if (roomsArray) {
        socket.join(roomsArray);
        socket.emit("default-rooms", rooms);
      }

      // Also join a room referring to the user's own id
      socket.join("user" + userId);
    };

    loadDefaults();

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                             EVENTS

    socket.on(
      "message-from-client",
      async (roomId: number, message: string) => {
        const msg = await StoreMessageInDB(userId, roomId, message);
        if (msg) io.in("room" + roomId).emit("message-from-server", msg);
      }
    );

    socket.on("create-new-group", async (GroupInfo: GroupInfoType) => {
      const room = await CreateNewGroupAsAdmin(userId, GroupInfo);
      const Ids = GroupInfo.contactIds.map((contactId) => "user" + contactId);
      Ids.push("user" + userId);

      if (room) io.in(Ids).emit("new-room-from-server", room);
    });

    socket.on("add-new-contact", async (contactId: number) => {
      const contact = await addtoContacts(userId, contactId);
      const room = await CreateP2PRoom(userId, contactId);
      if (contact) io.in("user" + userId).emit("new-contact", contact);
      if (room)
        io.in(["user" + userId, "user" + contactId]).emit("new-room", room);
    });

    socket.on("fetch-room-data", async (roomId: number) => {
      const room = await fetchRoomData(roomId);
      if (room) io.in("user" + userId).emit("room-data", room);
    });
  });
};
