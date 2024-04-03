import { MyRoomPayload } from "@backend/functions/PrismaSelections"
import { useEffect, useRef } from "react"
import { getTimefromDate } from "src/lib/functions/fromatDate"
import isSelf from "src/lib/functions/isSelf"

const ChatBox = ({ Room }: { Room: MyRoomPayload }) => {
  const chatboxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatboxRef.current)
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight
  }, [Room])

  return (
    <div
      ref={chatboxRef}
      className="overflow-y-auto px-4 py-4 flex flex-col gap-[3px] mt-16 "
    >
      {Room?.messages
        .slice()
        .reverse()
        .map(msg => {
          return (
            <div
              className={`w-full flex ${isSelf(msg.author.username) ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`message-card ${isSelf(msg.author.username) ? "bg-blue-900" : "bg-gray-800"}`}
              >
                <div className="flex-between gap-4 w-full ">
                  <span className="self-start text-[14px]/[30px]">
                    {msg.content}
                  </span>
                  <span className="self-end text-sm text-gray-400">
                    {getTimefromDate(msg.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default ChatBox
