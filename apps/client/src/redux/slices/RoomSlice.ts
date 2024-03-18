import { createSlice } from "@reduxjs/toolkit"
import { MyRoomPayload } from "types"

const initialState: MyRoomPayload[] = []

const RoomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    addRooms(state, action) {
      state.push(action.payload)
    },
  },
})

export default RoomSlice
