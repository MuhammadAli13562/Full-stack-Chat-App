import ChatSelectorContainer from "./ChatSelector.Container"
import SignOutButton from "./SignOutButton"

const LeftBar = () => {
  return (
    <div className="border-test col-start w-[500px] bg-dark-3">
      <SignOutButton />
      <ChatSelectorContainer />
    </div>
  )
}

export default LeftBar
