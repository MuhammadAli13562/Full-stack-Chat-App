import { useState } from "react"
import { Input } from "@/components/ui/input"
import { useSendMessageMutation } from "src/redux/api/user/sendUser"
import sendLogo from "public/send.png"
import emojiLogo from "public/emoji.png"
import addLogo from "public/add.png"

const MessageEditor = ({ roomId }: { roomId: number }) => {
  const [SendMessage, { isLoading: isSendingMessage }] =
    useSendMessageMutation()

  const [msg, setmsg] = useState("")

  const handleSendMessage = () => {
    SendMessage({ content: msg, roomId })
    setmsg("")
  }

  return (
    <div className="w-full  bg-gray-800 h-[70px] flex flex-col justify-center ">
      <div className="flex-center px-4">
        {/** Insert Buttons*/}
        <div className="">
          <button className="p-2">
            <img src={emojiLogo} width={30} />
          </button>
          <button className="p-2">
            <img src={addLogo} width={30} />
          </button>
        </div>
        {/** Message TextArea */}
        <div className="flex-1 px-2">
          <Input
            onKeyDown={e => {
              if (e.key === "Enter") handleSendMessage()
            }}
            className="bg-gray-700 text-gray-200 border-none text-[17px] h-[45px]"
            type="text"
            placeholder="Type a message"
            value={msg}
            onChange={e => setmsg(e.target.value)}
          />
        </div>
        {/** Send Button */}
        <div>
          <button
            className="p-2"
            disabled={isSendingMessage}
            onClick={handleSendMessage}
          >
            <img src={sendLogo} width={30} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MessageEditor
