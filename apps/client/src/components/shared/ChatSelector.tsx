import { RoomMetaType } from "src/lib/types"
import ProfilePlaceholder from "../svg/ProfilePlaceholder"
import GroupPlaceholder from "../svg/GroupPlaceholder"
import formatDate from "src/lib/functions/fromatDate"

const ChatSelector = ({ RoomMetaInfo }: { RoomMetaInfo: RoomMetaType }) => {
  let lastMessage = RoomMetaInfo.lastMessage
    ? `${RoomMetaInfo.lastMessage.author.username === localStorage.getItem("username") ? "You :" : RoomMetaInfo.isp2p ? "" : RoomMetaInfo.lastMessage.author.name + ": "} ${RoomMetaInfo.lastMessage.content}`
    : "Ali: Here It Comes Here It Comes Here It Comes Here It "

  if (lastMessage.length > 40)
    lastMessage = lastMessage.substring(0, 40) + "....."

  let lastMessageDate = RoomMetaInfo.lastMessage
    ? formatDate(RoomMetaInfo.lastMessage.createdAt)
    : ""

  return (
    <div className="w-full  h-[70px] border-y-[1px] border-gray-800 flex flex-col justify-center border-solid px-4  ">
      <div className="flex gap-2 ">
        {/*Profile Picture*/}
        <div className=" scale-[0.8] opacity-80">
          {RoomMetaInfo.isp2p ? <ProfilePlaceholder /> : <GroupPlaceholder />}
        </div>
        <div className=" w-full px-4 flex flex-col justify-center">
          <div className="flex-between ">
            {/*Room Name*/}
            <div className="text-[17px] text-white">
              {RoomMetaInfo.isp2p
                ? RoomMetaInfo.participants.find(
                    part => part.username != localStorage.getItem("username"),
                  )?.name
                : RoomMetaInfo.name}
            </div>
            {/*Date*/}
            <div className="text-sm ">{lastMessageDate}</div>
          </div>
          {/*Last Message */}
          <span className="text-[16px] -mt-2 font-light">{lastMessage}</span>
        </div>
      </div>
    </div>
  )
}

export default ChatSelector
