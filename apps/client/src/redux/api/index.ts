import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://chatapp.ali-98-ec2-backend.click/",
  }),
  endpoints: () => ({}),
})
