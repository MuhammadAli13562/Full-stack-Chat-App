import { Outlet, Navigate } from "react-router-dom"
import React from "react"

//import { useUserContext } from "@/context/AuthContext"

export const AuthLayout = () => {
  //const { isAuthenticated } = useUserContext()
  const isAuthenticated = false
  return (
    <div className="w-full h-screen flex-center auth-bkg  text-white ">
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <div className="flex">
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
        </div>
      )}
    </div>
  )
}
