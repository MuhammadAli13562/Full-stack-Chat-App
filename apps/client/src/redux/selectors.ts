import { createSelector } from "@reduxjs/toolkit"
import { GetUserApi } from "./api/user/getUser"

export const SelectUserResult = GetUserApi.endpoints.getUserData.select(
  import.meta.env.VITE_FIXED_CACHE_KEY,
)

export const SelectAllRooms = createSelector(
  SelectUserResult,
  userResult => userResult.data?.rooms ?? [],
)

export const SelectRoomById = createSelector(
  [SelectAllRooms, (_, roomId: number) => roomId],
  (rooms, roomId) => rooms.find(room => room.id === roomId),
)

export const SelectProfile = createSelector(
  [SelectUserResult],
  userResult => userResult.data?.profile ?? 123,
)

export const SelectRoomMeta = createSelector(
  [SelectUserResult],
  userResult =>
    userResult.data?.rooms
      .map(room => ({
        name: room.name,
        id: room.id,
        isp2p: room.isPeer2Peer,
        participants: room.participants,
        image: room.image,
        bio: room.bio,
        lastMessage:
          room.messages.length > 0
            ? {
                createdAt: room.messages[0].createdAt,
                author: room.messages[0].author.name,
                content: room.messages[0].content,
              }
            : null,
      }))
      .sort((a, b) => {
        // Compare based on timestamp of the last message
        if (a.lastMessage && b.lastMessage) {
          return (
            new Date(b.lastMessage.createdAt).getTime() -
            new Date(a.lastMessage.createdAt).getTime()
          )
        } else if (a.lastMessage) {
          return -1 // a has a last message, b doesn't
        } else if (b.lastMessage) {
          return 1 // b has a last message, a doesn't
        } else {
          return 0 // Both don't have last messages
        }
      }) ?? [],
)
