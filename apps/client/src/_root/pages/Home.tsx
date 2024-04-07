import useGetUserDataFixedCache from "src/redux/hooks/useGetUserDataFixedCache"
import LeftBar from "src/components/shared/sidebar/LeftBar"
import ChatBoxContainer from "src/components/shared/chat/ChatBox.Container"
import { useEffect } from "react"
import { useAppDispatch } from "src/redux/store"
import { SelectorSlice } from "src/redux/selector"

const Home = () => {
  const {} = useGetUserDataFixedCache()
  const dispatch = useAppDispatch()

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
    <div className="flex text-white text-3xl w-full py-0 2xl:py-6 2xl:px-[5vw] justify-center ">
      <LeftBar />
      <ChatBoxContainer />
    </div>
  )
}

export default Home
