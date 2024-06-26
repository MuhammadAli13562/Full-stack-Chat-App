import { useEffect } from "react"
import { SelectUserInfo } from "src/redux/api/selector"
import { useTypedSelector } from "src/redux/store"
import backLogo from "public/back.png"
import ProfilePlaceholder from "src/components/svg/ProfilePlaceholder"
import { useAnimate, motion } from "framer-motion"
import { SideAnimationExit, SideAnimationOpen } from "src/constants"

const Profile = ({
  toggle,
  visibility,
}: {
  toggle: () => void
  visibility: boolean
}) => {
  const UserInfo = useTypedSelector(SelectUserInfo)
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (visibility) animate(scope.current, ...SideAnimationOpen)
    else animate(scope.current, ...SideAnimationExit)
  }, [visibility])

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
          <span className="text-lg font-bold">Profile</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-start p-8 gap-12 text-gray-300">
        <div className="col-center ">
          {UserInfo?.profile?.image ? (
            <img />
          ) : (
            <ProfilePlaceholder width={200} />
          )}
        </div>
        <div className="col-start">
          <span className="text-sm text-label-g">Your name</span>
          <span className="text-lg">{UserInfo?.name}</span>
        </div>
        <div className="col-start">
          <span className="text-sm text-label-g">bio</span>
          <span className="text-lg">{UserInfo?.profile?.bio}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default Profile
