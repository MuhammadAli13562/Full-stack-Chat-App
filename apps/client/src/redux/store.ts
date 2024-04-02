import { configureStore } from "@reduxjs/toolkit"
import { api } from "./api"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { SelectorSlice } from "./selector"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [SelectorSlice.reducerPath]: SelectorSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
