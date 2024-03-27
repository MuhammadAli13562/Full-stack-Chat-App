import { useEffect } from "react"
import { getSocket } from "../config"

export const useSocketConnectOnMount = () => {
  const socket = getSocket()

  useEffect(() => {
    socket.auth = { token: localStorage.getItem("token") }
    socket.connect()

    return () => {
      socket.disconnect()
    }
  }, [])
}
