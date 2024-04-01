import { Outlet } from "react-router-dom"
import { useVerificationOnMount } from "src/lib/hooks"

const RootLayout = () => {
  useVerificationOnMount()
  return (
    <div className="w-full md:flex">
      <section className="flex flex-1 h-full ">
        <Outlet />
      </section>
    </div>
  )
}

export default RootLayout
