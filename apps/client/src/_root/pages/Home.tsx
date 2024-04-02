import useGetUserDataFixedCache from "src/redux/hooks/useGetUserDataFixedCache"
import LeftBar from "src/components/shared/LeftBar"
import ChatBoxContainer from "src/components/shared/ChatBox.Container"

const Home = () => {
  const { data, isLoading, isError, isSuccess } = useGetUserDataFixedCache()

  if (isSuccess) console.log("HOME DATA : ", data)

  return (
    <div className="flex text-white text-3xl w-full p-6 justify-center">
      <LeftBar />
      <ChatBoxContainer />
    </div>
  )
}

export default Home
