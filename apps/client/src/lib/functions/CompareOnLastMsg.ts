import React from "react"

function CompareOnLastMsg(a: any, b: any) {
  // Compare based on timestamp of the last message
  if (a.lastMessage && b.lastMessage) {
    return (
      new Date(b.lastMessage.createdAt).getTime() -
      new Date(a.lastMessage.createdAt).getTime()
    )
  } else if (a.lastMessage) {
    return -1 // a has a last message, b doesn't
  } else if (b.lastMessage) {
    return 1 // b has a last message, a doesn't
  } else {
    return 0 // Both don't have last messages
  }
}

export default CompareOnLastMsg
