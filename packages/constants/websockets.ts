export const WEBSOCKET_TAGS = {
  CLIENT: {
    MessageFromClient: "message-from-client",
    FetchRoomData: "fetch-room-data",
    CreateNewGroup: "create-new-group",
    CreateNewP2PRoom: "create-new-p2p",
    AddNewContact: "add-new-contact",
    ReactionFromClient: "reaction-from-client",
    UpdateProfileFromClient: "update-profile-client",
    ReadMessageFromClient: "read-msg-from-client",
  },
  SERVER: {
    DefaultRooms: "default-rooms",
    MessageFromServer: "message-from-server",
    NewRoomFromServer: "new-room-from-server",
    NewContactFromServer: "new-contact-from-server",
    NewP2PRoomFromServer: "new-room-p2p-from-server",
    RoomDataFromServer: "room-data",
    ReactionFromServer: "reaction-from-server",
    UpdateProfileFromServer: "update-profile-server",
    ReadMessageFromServer: "read-msg-from-server",
  },
};
