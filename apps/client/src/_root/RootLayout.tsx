import { Outlet } from "react-router-dom"
import { useSocketConnectOnMount, useVerificationOnMount } from "src/lib/hooks"

const RootLayout = () => {
  useVerificationOnMount()
  useSocketConnectOnMount()
  return (
    <div className="w-full md:flex">
      <section className="flex flex-1 bg-black">
        <Outlet />
      </section>
    </div>
  )
}

export default RootLayout
