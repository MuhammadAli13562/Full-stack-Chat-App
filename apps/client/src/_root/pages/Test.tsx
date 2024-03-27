import { useEffect, useState } from "react"
import { useGetUserDataQuery } from "src/redux/api/user/getUser"
import { SelectProfile } from "src/redux/selectors"
import { useTypedSelector } from "src/redux/store"
import Test1 from "./test/Test1"
import Test2 from "./test/Test2"

const Test = () => {
  const [remount, setRemount] = useState(false)
  const { data, isLoading, isError, isSuccess } = useGetUserDataQuery(
    import.meta.env.VITE_FIXED_CACHE_KEY,
  )

  if (isSuccess) console.log("HOME DATA : ", data)
  return (
    <div>
      <Test1 key={remount ? "abc" : "def"} />
      <Test2 key={remount ? "asbc" : "desf"} />
      <button onClick={() => setRemount(prev => !prev)}>
        REMOUNT CHILDREN
      </button>
    </div>
  )
}

export default Test
