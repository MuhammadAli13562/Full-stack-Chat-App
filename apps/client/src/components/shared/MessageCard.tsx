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
        <div className="col-center  w-full pb-[0.2rem]">
          <div className="flex-between w-full ">
            <span className="self-start text-[14px]/[30px]">{msg.content}</span>
            <span className="min-w-[60px]"></span>
          </div>

          <span className="self-end -mt-2 text-[13px]/[13px] text-gray-400 min-w-[30px]">
            {getTimefromDate(msg.createdAt)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default MessageCard