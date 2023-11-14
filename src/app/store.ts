import {configureStore} from "@reduxjs/toolkit";

import {bookingsSlice} from "../features/slices/bookingsSlice";
import { roomsSlice } from "../features/slices/roomsSlice";
import { contactSlice } from "../features/slices/contactSlice";
import { usersSlice } from "../features/slices/usersSlice";

export const Store = configureStore({
    reducer: {
        bookings: bookingsSlice.reducer,
        contact: contactSlice.reducer,
        rooms: roomsSlice.reducer,
        users: usersSlice.reducer,
    }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch