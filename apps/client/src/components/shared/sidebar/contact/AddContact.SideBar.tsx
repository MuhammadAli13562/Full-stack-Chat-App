import { Button } from "src/components/ui/button"
import backLogo from "public/back.png"
import { Input } from "src/components/ui/input"
import { useEffect, useState } from "react"
import { useAddNewContactMutation } from "src/redux/api/user/sendUser"
import { z } from "zod"
import { motion, useAnimate } from "framer-motion"
import getCurrUsername from "src/lib/functions/getCurrUsername"
import { SideAnimationExit, SideAnimationOpen } from "src/constants"
import { addContactSchema } from "src/lib/validation"

const AddContact = ({
  toggle,
  visibility,
}: {
  toggle: () => void
  visibility: boolean
}) => {
  const [username, setUsername] = useState("")
  const [validationError, setValidationError] = useState("")
  const [AddContact, { isLoading, isSuccess }] = useAddNewContactMutation()
  const [message, setMessage] = useState("")
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (!visibility) {
      setValidationError("")
      setUsername("")
      setMessage("")
      animate(scope.current, ...SideAnimationExit)
    }

    if (visibility) animate(scope.current, ...SideAnimationOpen)
  }, [visibility])

  const handleAddContact = async () => {
    try {
      setMessage("")
      setValidationError("")
      addContactSchema.parse(username)
      const resp: any = await AddContact(username)
      console.log("RESP ADDCONTACT : ", resp)
      if (resp.data.split(" ")[0]) setMessage(resp.data)

      setValidationError("")
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        console.log(error.issues[0].message)
        setValidationError(`Invalid Username : ${error.issues[0].message}`)
      }
    }
  }

  return (
    <motion.div
      initial={{ x: -500 }}
      ref={scope}
      className={"absolute bg-[#10171b] top-0 0 h-full w-full flex flex-col"}
    >
      <div className="h-28 bg-secondary-500">
        <div className="flex  items-end gap-4 h-full p-4">
          <button onClick={toggle} className="px-4">
            <img
              className=" scale-75 opacity-[0.8]"
              src={backLogo}
              width={30}
            />
          </button>
          <span className="text-lg font-bold">Add New Contact</span>
        </div>
      </div>
      <div className="flex-1 col-center">
        <div className="col-center gap-6 bg-black  border-2 p-12 mb-[22rem] rounded-xl border-secondary-500">
          <div className="col-center gap-4 flex-1 min-w-[20rem]">
            <Input
              className="w-auto h-12 border-secondary-600 "
              type="text"
              placeholder="username"
              onChange={e => setUsername(e.target.value)}
              value={username}
            />
            <span className="text-sm text-red max-w-[20rem]">
              {validationError}
            </span>
            <span className="text-sm text-yellow-400 max-w-[20rem]">
              {message}
            </span>
          </div>

          <Button
            disabled={isLoading}
            onClick={handleAddContact}
            className="shadcn-btn border-2 border-secondary-500"
          >
            Add Contact
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default AddContact
