import useGetUserDataFixedCache from "src/redux/hooks/useGetUserDataFixedCache"
import LeftBar from "src/components/shared/sidebar/LeftBar"
import ChatBoxContainer from "src/components/shared/chat/ChatBox.Container"

const Home = () => {
  const { data, isLoading, isError, isSuccess } = useGetUserDataFixedCache()

  //if (isSuccess) console.log("HOME DATA : ", data)

  return (
    <div className="flex text-white text-3xl w-full py-0 2xl:py-6 2xl:px-[5vw] justify-center ">
      <LeftBar />
      <ChatBoxContainer />
    </div>
  )
}

export default Home
