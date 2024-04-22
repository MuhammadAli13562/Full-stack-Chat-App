import { Socket, io } from "socket.io-client"
import { ServerEndpoint } from "src/constants"

let socket: Socket
export function getSocket() {
  if (!socket)
    socket = io(ServerEndpoint, {
      autoConnect: false,
    })

  return socket
}
