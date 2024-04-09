import ChatBox from "./ChatBox"
import MessageEditor from "./MessageEditor"
import useGetUserDataFixedCache from "src/redux/hooks/useGetUserDataFixedCache"
import { selectedRoom } from "src/redux/selector"
import { SelectRoomById } from "src/redux/api/selector"
import { useTypedSelector } from "src/redux/store"
import RoomTopBar from "./RoomTopBar"
import ChatBoxPlaceholder from "./ChatBox.Placeholder"

const ChatBoxContainer = () => {
  const selected_Room = useTypedSelector(selectedRoom)
  const Room = useTypedSelector(state => SelectRoomById(state, selected_Room))

  if (!Room) return <ChatBoxPlaceholder />
  return (
    <div className="window-border bg-dark-1 flex-1 bg-chatbox relative flex flex-col ">
      <RoomTopBar Room={Room} />
      <ChatBox Room={Room} />
      <MessageEditor roomId={Room?.id} />
    </div>
  )
}

export default ChatBoxContainer
