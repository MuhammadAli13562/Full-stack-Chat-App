import { MyMessagePayload } from "@backend/functions/PrismaSelections"
import React from "react"
import { getTimefromDate } from "src/lib/functions/DateFormatter"
import isSelf from "src/lib/functions/isSelf"

const MessageCard = ({
  msg,
  sameAuthorThread,
}: {
  msg: MyMessagePayload
  sameAuthorThread: boolean
}) => {
  if (msg.content === "") return <></>

  return (
    <div
      className={`w-full flex ${isSelf(msg.author.username) ? "justify-end" : "justify-start"} ${!sameAuthorThread && " mt-7"}`}
    >
      <div
        className={`message-card ${isSelf(msg.author.username) ? "bg-blue-900" : "bg-gray-800"}`}
      >
        <div className="flex-between gap-4 w-full ">
          <span className="self-start text-[14px]/[30px]">{msg.content}</span>
          <span className="self-end text-sm text-gray-400">
            {getTimefromDate(msg.createdAt)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default MessageCard
