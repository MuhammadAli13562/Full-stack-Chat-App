import { useEffect } from "react"
import ProfilePlaceholder from "src/components/svg/ProfilePlaceholder"
import { Button } from "src/components/ui/button"
import { SelectUserInfo } from "src/redux/api/selector"
import { useTypedSelector } from "src/redux/store"

const Profile = ({
  toggle,
  visibility,
}: {
  toggle: () => void
  visibility: boolean
}) => {
  const UserInfo = useTypedSelector(SelectUserInfo)

  useEffect(() => {
    console.log("RETRIGG : ", UserInfo)
  }, [UserInfo])

  return (
    <div
      className={
        !visibility ? "hidden" : "absolute top-0 h-full w-full bg-slate-500"
      }
    >
      <div className="flex">
        <Button onClick={toggle}>go back</Button>
      </div>
    </div>
  )
}

export default Profile
