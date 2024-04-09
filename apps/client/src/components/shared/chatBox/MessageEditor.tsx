import { useState } from "react"
import { Input } from "@/components/ui/input"
import { useSendMessageMutation } from "src/redux/api/user/sendUser"
import sendLogo from "public/send.png"
import emojiLogo from "public/emoji.png"
import addLogo from "public/add.png"
import useSound from "use-sound"
import msgPop from "public/tones/mixkit-message-pop-alert-2354.mp3"

const MessageEditor = ({ roomId }: { roomId: number }) => {
  const [SendMessage, { isLoading: isSendingMessage }] =
    useSendMessageMutation()

  const [playPop] = useSound(msgPop)
  const [msg, setmsg] = useState("")

  const handleSendMessage = () => {
    SendMessage({ content: msg, roomId })
    playPop()
    setmsg("")
  }

  return (
    <div className="w-full bg-secondary-500 h-[70px] flex flex-col justify-center ">
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
            className=" bg-[#161c1f] text-gray-200 border-none text-[17px] h-[45px]"
            type="text"
            placeholder="Type a message"
            value={msg}
            onChange={e => setmsg(e.target.value)}
          />
        </div>
        {/** Send Button */}
        <div>
          <button
            className="p-2 disabled:opacity-30"
            disabled={isSendingMessage || msg.length === 0}
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
