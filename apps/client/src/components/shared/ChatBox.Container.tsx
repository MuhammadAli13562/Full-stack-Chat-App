import ChatBox from "./ChatBox"
import MessageEditor from "./MessageEditor"
import useGetUserDataFixedCache from "src/redux/hooks/useGetUserDataFixedCache"
import { selectedRoom } from "src/redux/selector"
import { SelectRoomById } from "src/redux/selectors"
import { useTypedSelector } from "src/redux/store"
import RoomTopBar from "./RoomTopBar"

const ChatBoxContainer = () => {
  const { isLoading, isSuccess } = useGetUserDataFixedCache()
  const selected_Room = useTypedSelector(selectedRoom)
  const Room = useTypedSelector(state => SelectRoomById(state, selected_Room))

  if (isLoading) return <div>Loading ...</div>
  if (isSuccess) console.log("Selected Room : ", Room?.messages)

  return (
    <div className="window-border w-[1200px] bg-dark-3 relative flex flex-col ">
      {Room && <RoomTopBar Room={Room} />}
      <div className=" flex flex-1 flex-col justify-end h-[800px]">
        {Room && <ChatBox Room={Room} />}
      </div>
      {Room && <MessageEditor roomId={Room?.id} />}
    </div>
  )
}

export default ChatBoxContainer
