import SignOutButton from "../../components/shared/SignOutButton"
import React from "react"

const Home = () => {
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
