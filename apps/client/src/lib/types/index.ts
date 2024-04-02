import {
  MyContactPayload,
  MyUserPayload,
} from "@backend/functions/PrismaSelections"

export type RoomMetaType = {
  name: string
  id: number
  isp2p: boolean
  participants: MyContactPayload[]
  image: string | null
  bio: string | null
  lastMessage: { author: string; content: string } | null
}
