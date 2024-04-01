import { useGetUserDataQuery } from "src/redux/api/user/getUser"
import SignOutButton from "../../components/shared/SignOutButton"

const Home = () => {
  const { data, isLoading, isError, isSuccess } = useGetUserDataQuery(
    import.meta.env.VITE_FIXED_CACHE_KEY,
  )
  if (isSuccess) console.log("user data : ", data)

  return (
    <div className="w-full h-screen bg-black">
      <div className="w-full flex-end p-6">
        <SignOutButton />
      </div>
      <div className="flex-center text-white text-3xl">Home</div>
    </div>
  )
}

export default Home
