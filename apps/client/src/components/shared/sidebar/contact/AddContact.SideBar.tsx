import { Button } from "src/components/ui/button"
import backLogo from "public/back.png"
import { Input } from "src/components/ui/input"
import { useEffect, useState } from "react"
import { useAddNewContactMutation } from "src/redux/api/user/sendUser"
import { ZodError, z } from "zod"
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
    }
  }, [visibility])

  const handleAddContact = async () => {
    try {
      addContactSchema.parse(username)
      const resp = await AddContact(username)
      console.log("RESP ADDCONTACT : ", resp)

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
      className={
        !visibility
          ? "hidden"
          : "absolute bg-[#10171b] top-0 0 h-full w-full flex flex-col"
      }
    >
      <div className="h-28 bg-secondary-500">
        <div className="flex  items-end gap-4 h-full p-4">
          <button onClick={toggle} className="px-4">
            <img className=" opacity-50" src={backLogo} width={30} />
          </button>
          <span className="text-lg font-inter">Add New Contact</span>
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
