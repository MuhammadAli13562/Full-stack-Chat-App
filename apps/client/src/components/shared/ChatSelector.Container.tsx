import useGetUserDataFixedCache from "src/redux/hooks/useGetUserDataFixedCache"
import { SelectRoomMeta } from "src/redux/api/selector"
import { useAppDispatch, useTypedSelector } from "src/redux/store"
import ChatSelector from "./ChatSelector"
import { SelectorSlice, selectedRoom } from "src/redux/selector"

const ChatSelectorContainer = () => {
  const {} = useGetUserDataFixedCache()
  const RoomMetaData = useTypedSelector(SelectRoomMeta)
  const selected_Room = useTypedSelector(selectedRoom)
  const dispatch = useAppDispatch()

  console.log("Room Meta Data : ", RoomMetaData)

  return (
    <div className="">
      {RoomMetaData.map((room, index) => {
        return (
          <div
            key={index}
            className={`select-none hover:cursor-pointer  ${
              room.id === selected_Room
                ? "bg-gray-700 text-white "
                : "hover:bg-gray-800 text-gray-500 "
            }`}
            onClick={() => dispatch(SelectorSlice.actions.selection(room.id))}
          >
            <ChatSelector RoomMetaInfo={room} />
          </div>
        )
      })}
    </div>
  )
}

export default ChatSelectorContainer
