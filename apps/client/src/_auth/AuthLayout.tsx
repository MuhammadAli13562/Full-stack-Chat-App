import { Outlet, Navigate } from "react-router-dom"

export const AuthLayout = () => {
  return (
    <div className="w-full h-screen flex-center auth-bkg  text-white ">
      <div className="flex">
        <section className="flex flex-1 justify-center items-center flex-col py-10">
          <Outlet />
        </section>
      </div>
    </div>
  )
}
