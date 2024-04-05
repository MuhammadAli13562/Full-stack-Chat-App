import {
  MyMessagePayload,
  MyRoomPayload,
} from "@backend/functions/PrismaSelections"
import _ from "lodash"
import getCurrUsername from "./getCurrUsername"

// return true for seen | false for delivered

const getMessageStatus = (msg: MyMessagePayload, Room: MyRoomPayload) => {
  const curr = getCurrUsername()
  const part = Room.participants.map(p => p.username)
  const readBy = msg.readBy.map(p => p.username)
  const userUnRead = _.difference(part, readBy)

  return userUnRead.length === 1 && userUnRead[0] === curr
}

export default getMessageStatus
