import { createSelector } from "@reduxjs/toolkit"
import { GetUserApi } from "../user/getUser"
import * as _ from "lodash"
import CompareOnLastMsg from "src/lib/functions/CompareOnLastMsg"
import getUnreadData from "src/lib/functions/getUnreadData"

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

export const SelectRoomMeta = createSelector([SelectAllRooms], Rooms => {
  const rooms = Rooms.map(room => {
    const last_Message = _.last(room.messages)

    const new_room = {
      name: room.name,
      id: room.id,
      isPeer2Peer: room.isPeer2Peer,
      participants: room.participants,
      image: room.image,
      bio: room.bio,
      lastMessage: last_Message ?? null,
    }

    return new_room
  })

  rooms.sort(CompareOnLastMsg)
  return rooms
})

export const SelectUnReadData = createSelector([SelectRoomById], room => {
  return room ? getUnreadData(room) : null
})
