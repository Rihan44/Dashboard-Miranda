import {configureStore} from "@reduxjs/toolkit";


export const Store = configureStore({
    reducer: {
        dashboard: '',
        bookings: '',
        contact: '',
        rooms: '',
        users: '',
        login: ''
    }
})