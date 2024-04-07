import ChatBox from "./ChatBox"
import MessageEditor from "./MessageEditor"
import useGetUserDataFixedCache from "src/redux/hooks/useGetUserDataFixedCache"
import { selectedRoom } from "src/redux/selector"
import { SelectRoomById } from "src/redux/api/selector"
import { useTypedSelector } from "src/redux/store"
import RoomTopBar from "./RoomTopBar"

const ChatBoxContainer = () => {
  const {} = useGetUserDataFixedCache()
  const selected_Room = useTypedSelector(selectedRoom)
  const Room = useTypedSelector(state => SelectRoomById(state, selected_Room))

  if (!Room) return <></>
  return (
    <div className="window-border flex-1 bg-dark-3 relative flex flex-col ">
      <RoomTopBar Room={Room} />
      <div className=" flex flex-1 flex-col justify-end h-[70vh] 2xl:h-[80vh]">
        <ChatBox Room={Room} />
      </div>
      <MessageEditor roomId={Room?.id} />
    </div>
  )
}

export default ChatBoxContainer
