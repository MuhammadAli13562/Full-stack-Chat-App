import {
  MyContactPayload,
  MyMessagePayload,
} from "@backend/functions/PrismaSelections"

export type RoomMetaType = {
  name: string
  id: number
  isPeer2Peer: boolean
  participants: MyContactPayload[]
  image: string | null
  bio: string | null
  lastMessage: MyMessagePayload | null
}
