import { MyHistoricalDataPayload } from "packages/types"
import { api } from "."

export const UserApi = api.injectEndpoints({
  endpoints: builder => ({
    getHistoricalData: builder.query<MyHistoricalDataPayload, void>({
      query: () => ({
        url: `/user/default`,
        method: "GET",
      }),
      transformResponse: (response: { user_data: MyHistoricalDataPayload }) =>
        response.user_data,
      transformErrorResponse: (response: { status: number | string }) =>
        response.status,
    }),
  }),
})
export const { useGetHistoricalDataQuery } = UserApi
