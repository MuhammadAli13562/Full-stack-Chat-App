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
