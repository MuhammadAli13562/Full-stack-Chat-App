import { MyRoomPayload } from "@backend/functions/PrismaSelections"
import { useEffect, useRef } from "react"
import { SameDayDate } from "src/lib/functions/DateFormatter"
import MessageCard from "./MessageCard"
import DateSticker from "./DateSticker"
import getMessageStatus from "src/lib/functions/getMessageStatus"
import { useTypedSelector } from "src/redux/store"
import { SelectUnReadData } from "src/redux/api/selector"
import { selectedRoom } from "src/redux/selector"
import { useReadMessageMutation } from "src/redux/api/user/sendUser"

const ChatBox = ({ Room }: { Room: MyRoomPayload }) => {
  const chatboxRef = useRef<HTMLDivElement>(null)
  const [readMessagesInChat] = useReadMessageMutation()
  const Selected_Room = useTypedSelector(selectedRoom)
  const RoomUnreadInfo = useTypedSelector(state =>
    SelectUnReadData(state, Selected_Room),
  )
  useEffect(() => {
    if (chatboxRef.current)
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight
  }, [Room])

  useEffect(() => {
    if (chatboxRef.current)
      chatboxRef.current.addEventListener("scroll", callback)

    return () => {
      chatboxRef.current?.removeEventListener("scroll", callback)
    }
  }, [chatboxRef])

  const callback = () => {
    if (chatboxRef.current) {
      const scrollPosition =
        chatboxRef.current.scrollTop + chatboxRef.current.clientHeight
      const scrollHeight = chatboxRef.current.scrollHeight

      if (scrollPosition === scrollHeight) {
        if (RoomUnreadInfo && RoomUnreadInfo.count > 0) {
          readMessagesInChat({
            messageIds: RoomUnreadInfo.messageIds,
            roomId: Selected_Room,
          })
        }
      }
    }
  }

  return (
    <div
      ref={chatboxRef}
      className="overflow-y-auto px-4 py-4 flex flex-col  mt-16 "
    >
      {Room?.messages.map((msg, index, MessageArray) => {
        const sameMessageDay =
          index === 0
            ? false
            : SameDayDate(msg.createdAt, MessageArray[index - 1].createdAt)

        return (
          <div className="flex flex-col gap-4">
            {!sameMessageDay && <DateSticker dateString={msg.createdAt} />}
            <MessageCard
              msg={msg}
              MessageStatus={getMessageStatus(msg, Room)}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ChatBox
