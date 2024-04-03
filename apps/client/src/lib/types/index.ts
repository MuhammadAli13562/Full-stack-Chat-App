import { MyContactPayload } from "@backend/functions/PrismaSelections"

export type RoomMetaType = {
  name: string
  id: number
  isp2p: boolean
  participants: MyContactPayload[]
  image: string | null
  bio: string | null
  lastMessage: {
    author: { username: string; name: string }
    content: string
    createdAt: Date
  } | null
}
