import axios from "axios"
import { toast } from "react-toastify"
type SignInCreds = {
  username: string
  password: string
}

type SignUpCreds = {
  username: string
  password: string
  name: string
  email: string
}

export const SignIn = async (creds: SignInCreds) => {
  try {
    const resp = await axios({
      method: "post",
      url: `${import.meta.env.VITE_SERVER_ENDPOINT_AUTH}/login`,
      headers: {
        ...creds,
      },
    })
    console.log("resp :", resp)

    return resp
  } catch (err: any) {
    console.log("SignIn Error : ", err)
    return err.response
  }
}

export const SignUp = async (creds: SignUpCreds) => {
  try {
    const resp = await axios({
      method: "post",
      url: `${import.meta.env.VITE_SERVER_ENDPOINT_AUTH}/register`,
      headers: {
        ...creds,
      },
    })
    return resp
  } catch (err: any) {
    console.log("SignUp Error : ", err.response)
    return err.response
  }
}

export const VerifyLogIn = async () => {
  const token = localStorage.getItem("token")
  try {
    const resp = await axios({
      method: "post",
      url: `${import.meta.env.VITE_SERVER_ENDPOINT_AUTH}/verify`,
      headers: {
        token,
      },
    })
    return resp.status === 200
  } catch (err: any) {
    console.log("Verification Error : ", err.message)
    return false
  }
}

export const SignOut = () => {
  localStorage.removeItem("token")
  /* In future , We might wanna blacklist token on server for better security */
  toast.info("User Signed Out")
}
