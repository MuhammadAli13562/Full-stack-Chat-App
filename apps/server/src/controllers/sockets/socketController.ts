import { Server } from "socket.io";
import http from "http";
import {
  ReactToMessagesInDB,
  ReadMessageInDB,
  StoreMessageInDB,
} from "../../services/messageService";
import { CreateNewGroupAsAdmin, CreateP2PRoom, fetchRoomData } from "../../services/roomService";
import prisma from "../../prisma/prismaClient";

import { WEBSOCKET_TAGS } from "packages/constants";
import { verifyJwtToken, addtoContacts } from "../../services";
import {
  MessageInfotype,
  ReactionInfoType,
  GroupInfoType,
  ReadMessageType,
} from "../../utils/types";

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

    console.log("Socket Connected Server here");

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

    socket.on(WEBSOCKET_TAGS.CLIENT.CreateNewGroup, async (GroupInfo: GroupInfoType) => {
      const room = await CreateNewGroupAsAdmin(userId, GroupInfo);
      const Ids = GroupInfo.contactIds.map((contactId) => "user_" + contactId);
      Ids.push("user_" + userId);

      if (room) io.in(Ids).emit(WEBSOCKET_TAGS.SERVER.NewRoomFromServer, room);
    });

    socket.on(WEBSOCKET_TAGS.CLIENT.AddNewContact, async (contact_username: string, callback) => {
      console.log("Requested New Contact Addition");

      const contact = await addtoContacts(userId, contact_username);
      const room = await CreateP2PRoom(userId, contact_username);
      if (contact)
        io.in("user_" + userId).emit(WEBSOCKET_TAGS.SERVER.NewContactFromServer, contact);
      if (room)
        io.in(["user_" + userId, "user_" + contact?.id]).emit(
          WEBSOCKET_TAGS.SERVER.NewRoomFromServer,
          room
        );
      if (contact) {
        if (room) callback({ status: "Success - Contact & Room Created" });
        else callback({ status: "Success - Contact Created" });
        return;
      }
      callback({ status: "Error - Creating New Contact" });
    });

    socket.on(WEBSOCKET_TAGS.CLIENT.FetchRoomData, async (roomId: number) => {
      const room = await fetchRoomData(roomId);
      if (room) io.in("user" + userId).emit(WEBSOCKET_TAGS.SERVER.RoomDataFromServer, room);
    });

    socket.on(
      WEBSOCKET_TAGS.CLIENT.MessageFromClient,
      async (MessageInfo: MessageInfotype, callback) => {
        try {
          const { roomId, content } = MessageInfo;
          const msg = await StoreMessageInDB(userId, roomId, content);
          if (msg) io.in("room_" + roomId).emit(WEBSOCKET_TAGS.SERVER.MessageFromServer, [msg]);

          callback({ status: "Successful Message Delivered" });
        } catch (error) {
          callback({ status: "Error" });
        }
      }
    );

    socket.on(WEBSOCKET_TAGS.CLIENT.ReactionFromClient, async (ReactionInfo: ReactionInfoType) => {
      const { type, messageId } = ReactionInfo;
      const reaction = await ReactToMessagesInDB(userId, messageId, type);
      if (reaction)
        io.in("room_" + reaction.message.roomId).emit(
          WEBSOCKET_TAGS.SERVER.ReactionFromServer,
          reaction
        );
    });

    socket.on(WEBSOCKET_TAGS.CLIENT.CreateNewP2PRoom, async (contact_username: string) => {
      const room = await CreateP2PRoom(userId, contact_username);
      if (!room) return;
      const Ids = room.participants.map((participant) => "user_" + participant.id);
      if (room) io.in(Ids).emit(WEBSOCKET_TAGS.SERVER.NewP2PRoomFromServer, room);
    });

    socket.on(
      WEBSOCKET_TAGS.CLIENT.ReadMessageFromClient,
      async (ReadMessageInfo: ReadMessageType, callback) => {
        const { roomId, messageIds } = ReadMessageInfo;
        const new_msgs = await ReadMessageInDB(userId, messageIds, roomId);

        if (new_msgs && new_msgs?.length > 0) {
          io.in("room_" + roomId).emit(WEBSOCKET_TAGS.SERVER.MessageFromServer, new_msgs);
          callback({ status: "Message Read Update" });
          return;
        }
        callback({ status: "Error Reading Message" });
      }
    );
  });
};
