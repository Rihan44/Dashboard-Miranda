import {configureStore} from "@reduxjs/toolkit";
import bookingsSlice from "../features/bookingsSlice";
import { roomsSlice } from "../features/roomsSlice";


export const Store = configureStore({
    reducer: {
        dashboard: '',
        bookings: bookingsSlice.reducer,
        contact: '',
        rooms: roomsSlice.reducer,
        users: '',
        login: ''
    }
})