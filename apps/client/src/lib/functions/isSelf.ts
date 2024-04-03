function isSelf(username: string) {
  return username === localStorage.getItem("username")
}

export default isSelf
