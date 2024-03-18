import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { MyRoomPayload } from "types"

const initialState: MyRoomPayload[] = []

const RoomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    addRoom: {
      reducer: (state, action: PayloadAction<number>) => state,
      prepare: (value: number) => ({ payload: value || 2 }),
    },
    addMessage: {
      reducer: (state, action: PayloadAction<number>) => state,
      prepare: (value: number) => ({ payload: value || 2 }),
    },
    addReaction: {
      reducer: (state, action: PayloadAction<number>) => state,
      prepare: (value: number) => ({ payload: value || 2 }),
    },
  },
})

export default RoomSlice
