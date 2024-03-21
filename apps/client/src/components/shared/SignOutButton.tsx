import { useNavigate } from "react-router-dom"
import { SignOut } from "../../api/auth"
import { Button } from "../ui/button"

const SignOutButton = () => {
  const navigate = useNavigate()

  return (
    <Button
      className="primary-btn"
      onClick={() => {
        SignOut()
        navigate("/sign-in")
      }}
    >
      Log Out
    </Button>
  )
}

export default SignOutButton
