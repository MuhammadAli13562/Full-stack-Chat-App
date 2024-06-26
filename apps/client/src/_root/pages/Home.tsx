import useGetUserDataFixedCache from "src/redux/hooks/useGetUserDataFixedCache"
import LeftBar from "src/components/shared/sidebar/SideBar"
import ChatBoxContainer from "src/components/shared/chatBox/ChatBox.Container"
import { useEffect } from "react"
import { useAppDispatch } from "src/redux/store"
import { SelectorSlice } from "src/redux/selector"
import BackgroundFiller from "src/components/shared/BackgroundFiller"

const Home = () => {
  const dispatch = useAppDispatch()

  // unselect chats on escape press
  useEffect(() => {
    const handleGlobalKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") dispatch(SelectorSlice.actions.selection(-1))
    }

    window.addEventListener("keydown", handleGlobalKeyPress)

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyPress)
    }
  }, [])

  return (
    <div className="relative flex  border-2 border-black text-white text-3xl w-full py-0 2xl:py-6 2xl:px-[5vw] justify-center ">
      <LeftBar />
      <ChatBoxContainer />
      <BackgroundFiller />
    </div>
  )
}

export default Home
