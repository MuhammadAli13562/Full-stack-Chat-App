import useGetUserDataFixedCache from "src/redux/hooks/useGetUserDataFixedCache"
import { SelectRoomMeta } from "src/redux/selectors"
import { useAppDispatch, useTypedSelector } from "src/redux/store"
import ChatSelector from "./ChatSelector"
import { SelectorSlice, selectedRoom } from "src/redux/selector"

const ChatSelectorContainer = () => {
  const {} = useGetUserDataFixedCache()
  const RoomMetaData = useTypedSelector(SelectRoomMeta)
  const selected_Room = useTypedSelector(selectedRoom)
  const dispatch = useAppDispatch()

  return (
    <div className="mt-4">
      {RoomMetaData.map((room, index) => {
        return (
          <div
            key={index}
            className={
              room.id === selected_Room ? "bg-gray-700" : "hover:bg-gray-900"
            }
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
