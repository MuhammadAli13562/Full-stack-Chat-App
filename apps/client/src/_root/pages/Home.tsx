import { useVerificationOnMount } from "src/lib/hooks"
import SignOutButton from "../../components/shared/SignOutButton"
import { useEffect, useLayoutEffect } from "react"
import { useAppDispatch } from "src/redux/store"
import { GetUserApi, useGetUserDataQuery } from "src/redux/api/user/getUser"

const Home = () => {
  useVerificationOnMount()

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
