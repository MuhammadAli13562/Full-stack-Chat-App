import {
  MyMessagePayload,
  MyRoomPayload,
} from "@backend/functions/PrismaSelections"
import _ from "lodash"
import getCurrUsername from "./getCurrUsername"
import isSelf from "./isSelf"

// returns {count , messageIds , lastMessage : { content , createdAt , author.name }

const getUnreadData = (Room: MyRoomPayload) => {
  const curr = getCurrUsername()

  const unread_msgs = _.takeRightWhile(
    Room.messages,
    (msg: MyMessagePayload) => {
      if (isSelf(msg.author.username)) return false

      const user = msg.readBy.find(usr => usr.username === getCurrUsername())

      console.log("late unre : ", user)

      if (!user) return true
      return false
    },
  )

  const lastMessage = unread_msgs[0]

  const unread_msgs_ids = unread_msgs.map((msg: MyMessagePayload) => msg.id)

  return {
    count: unread_msgs.length,
    messageIds: unread_msgs_ids,
    lastMessage:
      Object.keys(lastMessage).length > 0
        ? {
            content: lastMessage.content,
            createdAt: lastMessage.createdAt,
            authorName: lastMessage.author.name,
          }
        : null,
  }
}

export default getUnreadData
