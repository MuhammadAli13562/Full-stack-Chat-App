import {
  MyHistoricalDataPayload,
  MyRoomPayload,
  MyMessagePayload,
  MyReactionPayload,
} from "@backend/functions/PrismaSelections"

import { api } from ".."
import { getSocket } from "src/lib/config"
import { WEBSOCKET_TAGS } from "packages/constants"

export const GetUserApi = api.injectEndpoints({
  endpoints: builder => ({
    getUserData: builder.query<MyHistoricalDataPayload, number>({
      query: () => ({
        url: `/user/default`,
        method: "GET",
        headers: {
          token: localStorage.getItem("token") || "",
          username: localStorage.getItem("username") || "",
        },
      }),
      transformResponse: (response: { user_data: MyHistoricalDataPayload }) => {
        return response.user_data
      },
      transformErrorResponse: (response: { status: number | string }) =>
        response.status,

      async onCacheEntryAdded(
        _,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData },
      ) {
        try {
          await cacheDataLoaded

          const socket = getSocket()

          socket.on(
            WEBSOCKET_TAGS.SERVER.RoomDataFromServer,
            (Room: MyRoomPayload) => {
              updateCachedData((draft: MyHistoricalDataPayload) => {
                const index = draft.rooms.findIndex(room => room.id === Room.id)
                if (index === -1) draft.rooms.push(Room)
                else draft.rooms[index] = Room
              })
            },
          )

          socket.on(
            WEBSOCKET_TAGS.SERVER.MessageFromServer,
            (msg: MyMessagePayload) => {
              updateCachedData((draft: MyHistoricalDataPayload) => {
                draft.rooms = draft.rooms.map(room => {
                  if (room.id === msg.roomId) room.messages.push(msg)
                  return room
                })
              })
            },
          )

          socket.on(
            WEBSOCKET_TAGS.SERVER.ReactionFromServer,
            (reaction: MyReactionPayload) => {
              updateCachedData((draft: MyHistoricalDataPayload) => {
                const roomToUpdate = draft.rooms.find(
                  room => room.id === reaction.message.roomId,
                )
                if (roomToUpdate) {
                  const messageToUpdate = roomToUpdate.messages.find(
                    msg => msg.id === reaction.messageId,
                  )
                  if (messageToUpdate) {
                    const existingReactionIndex =
                      messageToUpdate.reactions.findIndex(
                        react => react.id === reaction.id,
                      )
                    if (existingReactionIndex === -1) {
                      messageToUpdate.reactions.push(reaction)
                    } else {
                      messageToUpdate.reactions[existingReactionIndex] =
                        reaction
                    }
                  }
                }
              })
            },
          )

          socket.on(
            WEBSOCKET_TAGS.SERVER.NewRoomFromServer,
            (Room: MyRoomPayload) => {
              updateCachedData((draft: MyHistoricalDataPayload) => {
                const index = draft.rooms.findIndex(room => room.id === Room.id)
                if (index === -1) draft.rooms.push(Room)
              })
            },
          )

          await cacheEntryRemoved

          socket.off(WEBSOCKET_TAGS.SERVER.RoomDataFromServer)
          socket.off(WEBSOCKET_TAGS.SERVER.MessageFromServer)
          socket.off(WEBSOCKET_TAGS.SERVER.NewRoomFromServer)
          socket.off(WEBSOCKET_TAGS.SERVER.ReactionFromServer)
        } catch (error) {}
      },
    }),
  }),
})

export const { useGetUserDataQuery } = GetUserApi
