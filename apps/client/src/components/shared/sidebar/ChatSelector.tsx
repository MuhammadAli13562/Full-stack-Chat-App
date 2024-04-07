import { RoomMetaType } from "src/lib/types"
import ProfilePlaceholder from "../../svg/ProfilePlaceholder"
import GroupPlaceholder from "../../svg/GroupPlaceholder"
import { formatDate } from "src/lib/functions/DateFormatter"
import { useTypedSelector } from "src/redux/store"
import { SelectUnReadData } from "src/redux/api/selector"
import isSelf from "src/lib/functions/isSelf"
import getCurrUsername from "src/lib/functions/getCurrUsername"
import { useEffect } from "react"
import useSound from "use-sound"
import alert from "public/tones/mixkit-bike-notification-bell-590.wav"

const ChatSelector = ({ RoomMetaInfo }: { RoomMetaInfo: RoomMetaType }) => {
  let lastMessage = RoomMetaInfo.lastMessage
    ? `${isSelf(RoomMetaInfo.lastMessage.author.username) ? "You :" : RoomMetaInfo.isPeer2Peer ? "" : RoomMetaInfo.lastMessage.author.name + ": "} ${RoomMetaInfo.lastMessage.content}`
    : ""

  if (lastMessage.length > 40)
    lastMessage = lastMessage.substring(0, 40) + "....."

  let lastMessageDate = RoomMetaInfo.lastMessage
    ? formatDate(RoomMetaInfo.lastMessage.createdAt)
    : ""

  const RoomUnreadInfo = useTypedSelector(state =>
    SelectUnReadData(state, RoomMetaInfo.id),
  )
  const [playAlert] = useSound(alert)
  const hasUnreadMsgs = RoomUnreadInfo && RoomUnreadInfo.count > 0

  useEffect(() => {
    if (RoomUnreadInfo && RoomUnreadInfo.count > 0) playAlert()
  }, [RoomUnreadInfo])

  return (
    <div className="w-full  h-[85px] border-y-[1px] border-gray-800 flex flex-col justify-center border-solid px-4  ">
      <div className="flex gap-2 ">
        {/*Profile Picture*/}
        <div className=" scale-[0.8] opacity-80">
          {RoomMetaInfo.isPeer2Peer ? (
            <ProfilePlaceholder />
          ) : (
            <GroupPlaceholder />
          )}
        </div>
        <div className=" w-full  flex flex-col  ">
          <div className="flex-between -mb-3">
            {/*Room Name*/}
            <div className="text-[17px] text-white">
              {RoomMetaInfo.isPeer2Peer
                ? RoomMetaInfo.participants.find(
                    part => part.username != getCurrUsername(),
                  )?.name
                : RoomMetaInfo.name}
            </div>
            {/*Date*/}
            <div
              className={
                hasUnreadMsgs
                  ? "text-[.8rem] text-green-500 font-bold"
                  : "text-sm"
              }
            >
              {lastMessageDate}
            </div>
          </div>
          {/*Last Message */}
          <div className="flex-between">
            <span
              className={
                hasUnreadMsgs
                  ? "text-[15px]  font-bold text-green-500"
                  : "text-[15px]  font-light"
              }
            >
              {lastMessage}
            </span>
            <span
              className={
                hasUnreadMsgs
                  ? "bg-green-500 text-black font-bold scale-[0.65] text-[1rem] px-[0.8rem] rounded-full"
                  : "hidden"
              }
            >
              {RoomUnreadInfo && RoomUnreadInfo.count}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatSelector
