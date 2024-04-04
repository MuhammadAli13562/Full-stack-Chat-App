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

function formatDateByDay(dateString: Date) {
  const currentDate = new Date()
  const providedDate = new Date(dateString)

  // Function to check if two dates have the same day
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  // Function to format date in dd/mm/yy format
  const formatDateDMY = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = String(date.getFullYear()).slice(2)
    return `${day}/${month}/${year}`
  }

  if (isSameDay(currentDate, providedDate)) {
    return "Today"
  } else {
    // Clone the currentDate and subtract 1 day to check if it's yesterday
    const yesterday = new Date(currentDate)
    yesterday.setDate(yesterday.getDate() - 1)
    if (isSameDay(yesterday, providedDate)) {
      return "Yesterday"
    } else {
      return formatDateDMY(providedDate)
    }
  }
}

function getTimefromDate(dateString: Date) {
  const date = new Date(dateString)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`
  return formattedTime
}

function SameDayDate(d1: Date, d2: Date) {
  const date1 = new Date(d1)
  const date2 = new Date(d2)

  return date1.getDate() === date2.getDate()
}

export { formatDate, getTimefromDate, SameDayDate, formatDateByDay }
