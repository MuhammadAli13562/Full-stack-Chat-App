import { Button } from "src/components/ui/button"
import backLogo from "public/back.png"
import { Input } from "src/components/ui/input"
import { useEffect, useState } from "react"
import { useAddNewContactMutation } from "src/redux/api/user/sendUser"
import { z } from "zod"
import {
  animationControls,
  motion,
  useAnimate,
  useAnimationControls,
} from "framer-motion"
import getCurrUsername from "src/lib/functions/getCurrUsername"

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

  const addContactSchema = z
    .string()
    .min(6, { message: " " })
    .max(20, { message: " " })
    .regex(/^\S+$/, { message: " " })
    .refine(usnm => usnm != getCurrUsername(), {
      message: "Cant add themselves as contact",
    })

  useEffect(() => {
    if (!visibility) {
      setValidationError("")
      setUsername("")
      setMessage("")
      animate(scope.current, { x: -550 }, { duration: 0.2 })
    }

    if (visibility) animate(scope.current, { x: 0 }, { duration: 0.2 })
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
    <div
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
    </div>
  )
}

export default AddContact
