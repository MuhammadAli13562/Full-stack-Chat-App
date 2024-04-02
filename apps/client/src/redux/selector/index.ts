import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

export const SelectorSlice = createSlice({
  name: "selector",
  initialState: -1,
  reducers: {
    selection: (state, action: PayloadAction<number>) => action.payload,
  },
})

export const selectedRoom = (state: RootState) => state.selector
