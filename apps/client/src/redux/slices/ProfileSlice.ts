import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { MyProfilePayload } from "types"

const initialState: MyProfilePayload = {}
const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: {
      reducer: (state, action: PayloadAction<any>) => state,
      prepare: (value: any) => ({ payload: value }),
    },
  },
})

export default ProfileSlice
