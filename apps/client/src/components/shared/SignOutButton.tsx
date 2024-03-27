import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { toast } from "react-toastify"

const SignOutButton = () => {
  const navigate = useNavigate()

  return (
    <Button
      className="primary-btn"
      onClick={() => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")

        navigate("/sign-in")
        toast.info("User logged out")
      }}
    >
      Log Out
    </Button>
  )
}

export default SignOutButton
