import { api } from ".."

type SignInCreds = {
  username: string
  password: string
}

type SignUpCreds = {
  username: string
  password: string
  name: string
  email: string
}

type SignInReturns = {
  response: Response
  token: string
  status: number
}

type SignUpReturns = SignInReturns

const AuthApi = api.injectEndpoints({
  endpoints: builder => ({
    SignInUser: builder.mutation<SignInReturns, SignInCreds>({
      query: (creds: SignInCreds) => ({
        method: "post",
        url: "/auth/login",
        headers: {
          ...creds,
        },
      }),
      transformResponse: async (response: Response, meta) => {
        const token = meta?.response?.headers.get("token") || ""
        const status = meta?.response?.status || 0
        return { response, token, status }
      },
    }),
    SignUpUser: builder.mutation<SignUpReturns, SignUpCreds>({
      query: (creds: SignUpCreds) => ({
        method: "post",
        url: "/auth/register",
        headers: {
          ...creds,
        },
      }),
      transformResponse: async (response: Response, meta) => {
        const token = meta?.response?.headers.get("token") || ""
        const status = meta?.response?.status || 0
        return { response, token, status }
      },
    }),
    VerifyUserLogin: builder.mutation<Response, void>({
      query: () => ({
        method: "post",
        url: "/auth/verify",
        headers: {
          token: localStorage.getItem("token") || "",
        },
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useSignInUserMutation,
  useSignUpUserMutation,
  useVerifyUserLoginMutation,
} = AuthApi
