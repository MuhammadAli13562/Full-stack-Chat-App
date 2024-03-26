import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import React from "react"
import { toast } from "react-toastify"

const SignOutButton = () => {
  const navigate = useNavigate()

  return (
    <Button
      className="primary-btn"
      onClick={() => {
        localStorage.removeItem("token")
        navigate("/sign-in")
        toast.info("User logged out")
      }}
    >
      Log Out
    </Button>
  )
}

export default SignOutButton
