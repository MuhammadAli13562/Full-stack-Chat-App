import { MyMessagePayload } from "@backend/functions/PrismaSelections"
import { useEffect, useRef, useState } from "react"
import { getTimefromDate } from "src/lib/functions/DateFormatter"
import isSelf from "src/lib/functions/isSelf"
import * as _ from "lodash"
import seenlogo from "public/seen.png"
import deliveredlogo from "public/delivered.png"

const MessageCard = ({
  msg,
  MessageStatus,
}: {
  msg: MyMessagePayload
  MessageStatus: boolean
}) => {
  const msgRef = useRef<HTMLSpanElement>(null)
  const [msgwidth, setmsgwidth] = useState(0)

  useEffect(() => {
    setmsgwidth(msgRef.current?.offsetWidth || 0)
  }, [msgRef])

  if (msg.content === "") return <></>
  return (
    <div
      className={`w-full flex ${isSelf(msg.author.username) ? "justify-end" : "justify-start"} `}
    >
      <div
        className={`message-card ${isSelf(msg.author.username) ? "bg-[#144d37]" : "bg-gray-800"}`}
      >
        <div className="col-center  w-full pb-[0.2rem]">
          <div className="flex-between w-full ">
            <span ref={msgRef} className="self-start text-[14px]/[30px]">
              {msg.content}
            </span>
            <span
              className={msgwidth >= 600 ? "hidden" : "min-w-[80px]"}
            ></span>
          </div>

          <span className="flex gap-1 self-end -mt-2 text-[13px]/[13px] text-gray-400 min-w-[30px]">
            {getTimefromDate(msg.createdAt)}
            {isSelf(msg.author.username) && (
              <img src={MessageStatus ? seenlogo : deliveredlogo} width={20} />
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

export default MessageCard
