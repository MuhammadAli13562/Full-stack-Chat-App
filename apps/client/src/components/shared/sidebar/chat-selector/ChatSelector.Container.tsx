import useGetUserDataFixedCache from "src/redux/hooks/useGetUserDataFixedCache"
import { SelectRoomMeta } from "src/redux/api/selector"
import { useAppDispatch, useTypedSelector } from "src/redux/store"
import ChatSelector from "./ChatSelector"
import { SelectorSlice, selectedRoom } from "src/redux/selector"
import { useEffect } from "react"
import useSound from "use-sound"
import toy from "public/tones/mixkit-cartoon-toy-whistle-616.wav"

const ChatSelectorContainer = () => {
  const {} = useGetUserDataFixedCache()
  const RoomMetaData = useTypedSelector(SelectRoomMeta)
  const selected_Room = useTypedSelector(selectedRoom)
  const dispatch = useAppDispatch()
  const [playEsc] = useSound(toy)

  useEffect(() => {
    selected_Room === -1 && playEsc()
  }, [selected_Room])

  return (
    <div className=" ">
      {RoomMetaData.map((room, index) => {
        return (
          <div
            key={index}
            className={`select-none hover:cursor-pointer  ${
              room.id === selected_Room
                ? " bg-secondary-600 text-white "
                : "hover:bg-secondary-500 text-gray-500 "
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
