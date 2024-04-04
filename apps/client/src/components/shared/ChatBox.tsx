import { MyRoomPayload } from "@backend/functions/PrismaSelections"
import { useEffect, useRef } from "react"
import { SameDayDate } from "src/lib/functions/DateFormatter"
import MessageCard from "./MessageCard"
import DateSticker from "./DateSticker"

const ChatBox = ({ Room }: { Room: MyRoomPayload }) => {
  const chatboxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatboxRef.current)
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight
  }, [Room])

  return (
    <div
      ref={chatboxRef}
      className="overflow-y-auto px-4 py-4 flex flex-col  mt-16 "
    >
      {Room?.messages
        .slice()
        .reverse()
        .map((msg, index, MessageArray) => {
          const sameAuthorThread =
            index === 0
              ? false
              : MessageArray[index - 1].author.id === msg.author.id

          const sameMessageDay =
            index === 0
              ? false
              : SameDayDate(msg.createdAt, MessageArray[index - 1].createdAt)

          if (!sameMessageDay)
            return (
              <div className="flex flex-col gap-4">
                <DateSticker dateString={msg.createdAt} />
                <MessageCard msg={msg} sameAuthorThread={sameAuthorThread} />
              </div>
            )

          return <MessageCard msg={msg} sameAuthorThread={sameAuthorThread} />
        })}
    </div>
  )
}

export default ChatBox
