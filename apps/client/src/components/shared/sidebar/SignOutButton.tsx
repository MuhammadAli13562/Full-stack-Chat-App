import { useNavigate } from "react-router-dom"
import { Button } from "../../ui/button"
import { toast } from "react-toastify"
import { store } from "src/redux/store"
import { api } from "src/redux/api"
import { SelectorSlice } from "src/redux/selector"

const SignOutButton = () => {
  const navigate = useNavigate()

  return (
    <Button
      className="bg-black text-white"
      onClick={() => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        store.dispatch(api.util.resetApiState())
        store.dispatch(
          SelectorSlice.actions.selection(SelectorSlice.getInitialState()),
        )
        navigate("/sign-in")
        toast.info("User logged out")
      }}
    >
      Log Out
    </Button>
  )
}

export default SignOutButton
