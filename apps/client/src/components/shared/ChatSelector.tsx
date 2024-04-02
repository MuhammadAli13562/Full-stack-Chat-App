import { RoomMetaType } from "src/lib/types"
import ProfilePlaceholder from "../svg/ProfilePlaceholder"
import GroupPlaceholder from "../svg/GroupPlaceholder"

const ChatSelector = ({ RoomMetaInfo }: { RoomMetaInfo: RoomMetaType }) => {
  let lastMessage = RoomMetaInfo.lastMessage
    ? `${RoomMetaInfo.lastMessage.author}: ${RoomMetaInfo.lastMessage.content}`
    : "Ali: Here It Comes Here It Comes Here It Comes Here It "

  if (lastMessage.length > 40)
    lastMessage = lastMessage.substring(0, 40) + "....."

  return (
    <div className="w-full  h-[90px] border-[1px] border-gray-800 flex flex-col justify-center border-solid px-4  ">
      <div className="flex gap-2 ">
        {/*Profile Picture*/}
        <div className="">
          {RoomMetaInfo.isp2p ? <ProfilePlaceholder /> : <GroupPlaceholder />}
        </div>
        <div className=" w-full px-4 flex flex-col justify-center">
          <div className="flex-between">
            {/*Room Name*/}
            <div className="text-lg">
              {RoomMetaInfo.isp2p
                ? RoomMetaInfo.participants.find(
                    part => part.username != localStorage.getItem("username"),
                  )?.name
                : RoomMetaInfo.name}
            </div>
            {/*Date*/}
            <div className="text-sm text-gray-500">12/2/23</div>
          </div>
          {/*Last Message */}

          <span className="text-[16px] text-gray-500">{lastMessage}</span>
        </div>
      </div>
    </div>
  )
}

export default ChatSelector
