import { useEffect } from "react"
import { getSocket } from "../config"

export const useRegisterSocketEvents = () => {
  const socket = getSocket()
  useEffect(() => {
    function onConnect() {
      console.log("socket connected now")
    }

    function onDisconnect() {
      console.log("socket disconnected now")
    }

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)

    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
    }
  }, [])
}
