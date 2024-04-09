import { api } from ".."
import { getSocket } from "src/lib/config"
import { WEBSOCKET_TAGS } from "packages/constants"
import {
  MessageInfotype,
  ReactionInfoType,
  ProfileDatatype,
  GroupInfoType,
  ReadMessageType,
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
    addNewContact: builder.mutation<any, string>({
      queryFn: (contact_username: string) => {
        const socket = getSocket()
        console.log("Add New Cont")

        return new Promise(resolve => {
          socket.emit(
            WEBSOCKET_TAGS.CLIENT.AddNewContact,
            contact_username,
            (resp: any) => {
              console.log("resp : ", resp)

              resolve({ data: "123" })
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
    createNewP2PRoom: builder.mutation<any, string>({
      queryFn: (contact_username: string) => {
        const socket = getSocket()
        return new Promise(resolve => {
          socket.emit(
            WEBSOCKET_TAGS.CLIENT.CreateNewP2PRoom,
            contact_username,
            (resp: any) => {
              resolve(resp)
            },
          )
        })
      },
    }),
    readMessage: builder.mutation<any, ReadMessageType>({
      queryFn: (ReadMessageInfo: ReadMessageType) => {
        const socket = getSocket()
        return new Promise(resolve => {
          socket.emit(
            WEBSOCKET_TAGS.CLIENT.ReadMessageFromClient,
            ReadMessageInfo,
            (resp: any) => {
              resolve(resp)
            },
          )
        })
      },
    }),
  }),
})

export const {
  useAddNewContactMutation,
  useAddReactionMutation,
  useCreateNewGroupMutation,
  useCreateNewP2PRoomMutation,
  useSendMessageMutation,
  useUpdateProfileMutation,
  useReadMessageMutation,
} = SendUserApi
