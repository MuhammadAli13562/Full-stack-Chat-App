import { Socket, io } from "socket.io-client"
import { ServerEndpoint } from "src/constants"

let socket: Socket
export function getSocket() {
  if (!socket)
    socket = io("https://chatapp.ali-98-ec2-backend.click/", {
      autoConnect: false,
    })

  return socket
}
