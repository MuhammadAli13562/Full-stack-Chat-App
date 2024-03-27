import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useGetUserDataQuery } from "src/redux/api/user/getUser"

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <section className="flex flex-1 h-full ">
        <Outlet />
      </section>
    </div>
  )
}

export default RootLayout
