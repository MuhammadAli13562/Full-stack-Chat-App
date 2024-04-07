import { formatDateByDay } from "src/lib/functions/DateFormatter"

const DateSticker = ({ dateString }: { dateString: Date }) => {
  const stickerDate = formatDateByDay(dateString)
  return (
    <div className="w-full  flex-center my-4">
      <div className="bg-gray-800 text-[13px]/[15px] py-2 px-3 text-gray-400 rounded-lg">
        {stickerDate}
      </div>
    </div>
  )
}

export default DateSticker
