import {configureStore} from "@reduxjs/toolkit";
import bookingsSlice from "../features/bookingsSlice";


export const Store = configureStore({
    reducer: {
        dashboard: '',
        bookings: bookingsSlice.reducer,
        contact: '',
        rooms: '',
        users: '',
        login: ''
    }
})