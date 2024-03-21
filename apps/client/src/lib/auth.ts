import { useEffect } from "react"
import { VerifyLogIn } from "../api/auth"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export function useVerificationOnMount() {
  const navigate = useNavigate()
  const path = useLocation().pathname

  useEffect(() => {
    async function Verify() {
      const verified = await VerifyLogIn()
      if (verified) {
        if (path !== "/")
          toast.info("Already Signed In", { position: "top-center" })
        navigate("/")
      } else navigate("/sign-in")
    }

    Verify()
  }, [])
}
