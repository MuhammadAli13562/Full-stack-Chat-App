import { createSlice } from "@reduxjs/toolkit"
import { MyHistoricalDataPayload } from "packages/types"

const initialState = {
  isLoggedIn: false,
  user: MyHistoricalDataPayload,
  isLoading: false,
  error: null,
}

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedIn = true
      state.user = action.payload
      state.isLoading = false
      state.error = null
    },
    logoutSuccess(state) {
      state.isLoggedIn = false
      state.user = null
      state.isLoading = false
      state.error = null
    },
    startLoading(state) {
      state.isLoading = true
      state.error = null
    },
    setError(state, action) {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

export default AuthSlice
