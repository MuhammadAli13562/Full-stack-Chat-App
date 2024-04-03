import ChatSelectorContainer from "./ChatSelector.Container"
import LeftSideTopBar from "./LeftSide.TopBar"

const LeftBar = () => {
  return (
    <div className="leftbar-border border-r-0 col-start w-[500px] bg-dark-3 relative">
      <LeftSideTopBar />
      <div className="mt-24">
        <ChatSelectorContainer />
      </div>
    </div>
  )
}

export default LeftBar
