import {configureStore} from "@reduxjs/toolkit";

import {bookingsSlice} from "../features/bookingsSlice";
import { roomsSlice } from "../features/roomsSlice";
import { contactSlice } from "../features/contactSlice";
import { usersSlice } from "../features/usersSlice";

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