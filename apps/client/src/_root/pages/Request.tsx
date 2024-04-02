import { useState } from "react"
import { Button } from "src/components/ui/button"
import {
  useAddNewContactMutation,
  useSendMessageMutation,
} from "src/redux/api/user/sendUser"
import useGetUserDataFixedCache from "src/redux/hooks/useGetUserDataFixedCache"
import { SelectRoomMeta } from "src/redux/selectors"
import { useTypedSelector } from "src/redux/store"

const Request = () => {
  const [sendMessage, { data, isLoading, isSuccess, isError }] =
    useSendMessageMutation()
  const { data: wholeuserdata } = useGetUserDataFixedCache()
  const RoomMetaData = useTypedSelector(SelectRoomMeta)
  const [stateid, setstateid] = useState(0)
  const [statemsg, setstatemsg] = useState("")

  const handleRequest = async () => {
    sendMessage({ content: statemsg, roomId: stateid })
  }

  if (isLoading) console.log("Loading.... ")
  if (isSuccess) {
    console.log("as  returned data : ", data)
    console.log("whole success user data ", wholeuserdata)
  }
  if (isError) console.log("Error adding contact : ")

  return (
    <div className="flex flex-col gap-4 bg-white text-black">
      <div className="flex p-8 ">
        <div>
          <span>message :</span>
          <input
            className="bg-gray-400"
            type="text"
            onChange={e => setstatemsg(e.target.value)}
          />
        </div>
        <div>
          <span>RoomId :</span>
          <input
            className="bg-gray-400"
            type="text"
            onChange={e => setstateid(Number(e.target.value))}
          />
        </div>
        <Button onClick={handleRequest}>Request</Button>
      </div>
      <div className=" p-8">
        <div>
          {RoomMetaData.map(room => (
            <div className="col-center">
              <span>roomid :{room.id} : </span>
              <span className="flex gap-4">
                {room.participants.map(part => (
                  <span>{part.name}</span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Request
