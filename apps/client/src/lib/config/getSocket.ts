import { Socket, io } from "socket.io-client"

let socket: Socket
export function getSocket() {
  if (!socket)
    socket = io("https://chatapp.ali-98-ec2-backend.click", {
      autoConnect: false,
    })

  return socket
}
