import {configureStore} from "@reduxjs/toolkit";
import bookingsSlice from "../features/bookingsSlice";
import { roomsSlice } from "../features/roomsSlice";
import { contactSlice } from "../features/contactSlice";

export const Store = configureStore({
    reducer: {
        bookings: bookingsSlice.reducer,
        contact: contactSlice.reducer,
        rooms: roomsSlice.reducer,
        users: '',
        login: ''
    }
})