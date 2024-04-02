import React from "react"
import { useGetUserDataQuery } from "../api/user/getUser"
import { fixedCacheKey } from "src/constants"

const useGetUserDataFixedCache = () => {
  const resp = useGetUserDataQuery(fixedCacheKey)

  return resp
}

export default useGetUserDataFixedCache
