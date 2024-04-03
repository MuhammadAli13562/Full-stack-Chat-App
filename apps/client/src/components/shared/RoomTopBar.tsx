import { MyRoomPayload } from "@backend/functions/PrismaSelections"
import searchLogo from "public/search.png"
import optionLogo from "public/options.png"
import ProfilePlaceholder from "../svg/ProfilePlaceholder"
import GroupPlaceholder from "../svg/GroupPlaceholder"
import { useEffect, useRef } from "react"

const RoomTopBar = ({ Room }: { Room: MyRoomPayload }) => {
  const ParticipantString = Room.participants.map(part => part.name).join(",")
  const InfoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (InfoRef.current) InfoRef.current.style.display = "none"
    }, 2000)

    return () => {
      clearTimeout(timeoutId)
      if (InfoRef.current) InfoRef.current.style.display = "flex"
    }
  }, [Room])

  return (
    <div className=" h-[60px] absolute bg-gray-800 w-full flex flex-col justify-center">
      <div className="flex-between">
        <div className="flex items-center gap-">
          {/*Profile Picture*/}
          <div className=" scale-75 opacity-75">
            {Room.isPeer2Peer ? <ProfilePlaceholder /> : <GroupPlaceholder />}
          </div>
          <div className="flex flex-col items-start">
            {/*Room Name*/}
            <div className="text-[16px] text-gray-200">
              {Room.isPeer2Peer
                ? Room.participants.find(
                    part => part.username != localStorage.getItem("username"),
                  )?.name
                : Room.name}
            </div>
            {/*Participants*/}
            <div ref={InfoRef} className="text-[12px] -mt-3 text-gray-400 ">
              {Room.isPeer2Peer ? "Click here for info" : ParticipantString}
            </div>
          </div>
        </div>
        <div className="flex gap-8 scale-[0.5]">
          <img src={searchLogo} width="50" />
          <img src={optionLogo} width="50" />
        </div>
      </div>
    </div>
  )
}

export default RoomTopBar
