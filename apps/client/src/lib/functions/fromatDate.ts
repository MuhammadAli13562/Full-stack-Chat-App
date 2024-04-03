function formatDate(dateString: Date) {
  const date = new Date(dateString)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) {
    // If the date is today, return the time
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`
    return formattedTime
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday"
  } else {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }
}

export default formatDate

function getTimefromDate(dateString: Date) {
  const date = new Date(dateString)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`
  return formattedTime
}

export { getTimefromDate }
