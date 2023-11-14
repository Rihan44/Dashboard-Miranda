import { createSlice } from "@reduxjs/toolkit";
import {BookingDetailInterface, BookingsInterface, BookingsInterfaceState} from '../../interfaces/bookingsInterface.js';
import { getAllBookings, getBookingDetail, deleteBooking, updateBooking } from "../thunks/bookingsThunk";

const initialState: BookingsInterfaceState = {
    data: [],
    dataBooking: {} as BookingDetailInterface,
    status: 'idle',
    statusDelete: 'idle',
    error: null
}

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllBookings.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.data = action.payload;
        })
        .addCase(getAllBookings.pending, (state) => {state.status = "pending"})
        .addCase(getAllBookings.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(getBookingDetail.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.dataBooking = action.payload;
        })
        .addCase(getBookingDetail.pending, (state) => {state.status = "pending"})
        .addCase(getBookingDetail.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(deleteBooking.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.statusDelete= "fulfilled";
            state.data = state.data.filter(data => {return data._id !== action.payload})
        })
        .addCase(deleteBooking.pending, (state) => {state.statusDelete = "pending"})
        .addCase(deleteBooking.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(updateBooking.fulfilled, (state, action) => {
            state.status = "fulfilled";
        })
        .addCase(updateBooking.pending, (state) => {state.status = "pending"})
        .addCase(updateBooking.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
    } 
});
