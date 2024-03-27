import { Socket, io } from "socket.io-client"

let socket: Socket
export function getSocket() {
  if (!socket)
    socket = io(import.meta.env.VITE_SERVER_ENDPOINT, {
      autoConnect: false,
    })

  return socket
}
