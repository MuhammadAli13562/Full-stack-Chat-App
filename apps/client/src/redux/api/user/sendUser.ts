import { api } from ".."
import { getSocket } from "src/lib/config"
import { WEBSOCKET_TAGS } from "packages/constants"
import {
  MessageInfotype,
  ReactionInfoType,
  ProfileDatatype,
  GroupInfoType,
} from "@backend/types/index"

export const SendUserApi = api.injectEndpoints({
  endpoints: builder => ({
    sendMessage: builder.mutation<any, MessageInfotype>({
      queryFn: (MessaegInfo: MessageInfotype) => {
        const socket = getSocket()

        return new Promise(resolve => {
          socket.emit(
            WEBSOCKET_TAGS.CLIENT.MessageFromClient,
            MessaegInfo,
            (resp: any) => {
              resolve(resp)
            },
          )
        })
      },
    }),
    addReaction: builder.mutation<any, ReactionInfoType>({
      queryFn: (ReactionInfo: ReactionInfoType) => {
        const socket = getSocket()
        return new Promise(resolve => {
          socket.emit(
            WEBSOCKET_TAGS.CLIENT.ReactionFromClient,
            ReactionInfo,
            (resp: any) => {
              resolve(resp)
            },
          )
        })
      },
    }),
    updateProfile: builder.mutation<any, ProfileDatatype>({
      queryFn: (ProfileInfo: ProfileDatatype) => {
        const socket = getSocket()
        return new Promise(resolve => {
          socket.emit(
            WEBSOCKET_TAGS.CLIENT.UpdateProfileFromClient,
            ProfileInfo,
            (resp: any) => {
              resolve(resp)
            },
          )
        })
      },
    }),
    addNewContact: builder.mutation<any, number>({
      queryFn: (contactId: number) => {
        const socket = getSocket()
        return new Promise(resolve => {
          socket.emit(
            WEBSOCKET_TAGS.CLIENT.AddNewContact,
            contactId,
            (resp: any) => {
              resolve(resp)
            },
          )
        })
      },
    }),
    createNewGroup: builder.mutation<any, GroupInfoType>({
      queryFn: (GroupInfo: GroupInfoType) => {
        const socket = getSocket()
        return new Promise(resolve => {
          socket.emit(
            WEBSOCKET_TAGS.CLIENT.CreateNewGroup,
            GroupInfo,
            (resp: any) => {
              resolve(resp)
            },
          )
        })
      },
    }),
    createNewP2PRoom: builder.mutation<any, number>({
      queryFn: (contactId: number) => {
        const socket = getSocket()
        return new Promise(resolve => {
          socket.emit(
            WEBSOCKET_TAGS.CLIENT.CreateNewP2PRoom,
            contactId,
            (resp: any) => {
              resolve(resp)
            },
          )
        })
      },
    }),
  }),
})
