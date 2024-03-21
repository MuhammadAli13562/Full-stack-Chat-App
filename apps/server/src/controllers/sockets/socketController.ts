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

import { WEBSOCKET_TAGS } from "packages/constants";
import { verifyJwtToken, addtoContacts } from "../../services";

export const SocketServerInit = (server: http.Server) => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", async (socket) => {
    const token = socket.handshake.auth.token;
    const id = await verifyJwtToken(token);
    const userId = id ? id.id : null;

    if (!userId) {
      socket.disconnect();
      return;
    }
    const loadHistoricalData = async () => {
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

      const roomsArray = rooms?.rooms.map((room) => "room_" + room.id);
      if (roomsArray) socket.join(roomsArray);
      socket.join("user_" + userId);
    };

    loadHistoricalData();

    socket.on(WEBSOCKET_TAGS.CLIENT.MessageFromClient, async (roomId: number, message: string) => {
      const msg = await StoreMessageInDB(userId, roomId, message);
      if (msg) io.in("room" + roomId).emit(WEBSOCKET_TAGS.SERVER.MessageFromServer, msg);
    });

    socket.on(WEBSOCKET_TAGS.CLIENT.CreateNewGroup, async (GroupInfo: GroupInfoType) => {
      const room = await CreateNewGroupAsAdmin(userId, GroupInfo);
      const Ids = GroupInfo.contactIds.map((contactId) => "user" + contactId);
      Ids.push("user" + userId);

      if (room) io.in(Ids).emit(WEBSOCKET_TAGS.SERVER.NewRoomFromServer, room);
    });

    socket.on(WEBSOCKET_TAGS.CLIENT.AddNewContact, async (contactId: number) => {
      const contact = await addtoContacts(userId, contactId);
      const room = await CreateP2PRoom(userId, contactId);
      if (contact) io.in("user" + userId).emit(WEBSOCKET_TAGS.SERVER.NewContactFromServer, contact);
      if (room)
        io.in(["user" + userId, "user" + contactId]).emit(
          WEBSOCKET_TAGS.SERVER.NewRoomFromServer,
          room
        );
    });

    socket.on(WEBSOCKET_TAGS.CLIENT.FetchRoomData, async (roomId: number) => {
      const room = await fetchRoomData(roomId);
      if (room) io.in("user" + userId).emit(WEBSOCKET_TAGS.SERVER.RoomDataFromServer, room);
    });
  });
};
