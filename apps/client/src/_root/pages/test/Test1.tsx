import { fixedCacheKey } from "src/constants"
import { useGetUserDataQuery } from "src/redux/api/user/getUser"
import { SelectProfile } from "src/redux/selectors"
import { useTypedSelector } from "src/redux/store"

const Test1 = () => {
  const { data, isLoading, isSuccess } = useGetUserDataQuery(fixedCacheKey)
  const profile = useTypedSelector(SelectProfile)

  if (isLoading) return <div>Loading....</div>

  return <div>TEST1</div>
}

export default Test1
