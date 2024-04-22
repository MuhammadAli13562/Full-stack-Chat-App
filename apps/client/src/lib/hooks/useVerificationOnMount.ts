import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useVerifyUserLoginMutation } from "src/redux/api/auth/auth"

export const useVerificationOnMount = () => {
  const navigate = useNavigate()
  const path = useLocation().pathname
  const [VerifyUser] = useVerifyUserLoginMutation()

  useEffect(() => {
    async function Verify() {
      try {
        if (localStorage.getItem("token") === null) throw Error("not signed in")

        const resp: any = await VerifyUser()
        if (resp.error) throw Error(resp.error.data.status)

        if (path === "/sign-in") {
          toast.info("Already Signed In", { position: "top-center" })
          navigate("/")
        }
      } catch (error: any) {
        path === "/sign-up" ? navigate(path) : navigate("/sign-in")
      }
    }

    Verify()
  }, [])
}
