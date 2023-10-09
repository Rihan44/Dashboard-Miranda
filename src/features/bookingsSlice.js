import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bookingData } from "../data/bookingData";

const delay = (data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, 600)
    });
}

export const getAllBookings = createAsyncThunk("bookings/getAllBookings", async () => {
   return await delay(bookingData);
});

export const getBookingDetail = createAsyncThunk("bookings/getBookingDetail", async (id) => {
    return await delay(id);
});

export const deleteBooking = createAsyncThunk("bookings/deleteBooking", async (id) => {
    return await delay(id);
});

export const updateBooking = createAsyncThunk("bookings/updateBooking", async (id) => {
    return await delay(id);
});

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        data: [],
        status: 'idle',
        statusDelete: 'idle',
        error: null
    },
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
            state.data = state.data.filter(data => {return data.id === action.payload})
        })
        .addCase(getBookingDetail.pending, (state) => {state.status = "pending"})
        .addCase(getBookingDetail.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(deleteBooking.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.statusDelete= "fulfilled";
            state.data = state.data.filter(data => {return data.id !== action.payload})
        })
        .addCase(deleteBooking.pending, (state) => {state.statusDelete = "pending"})
        .addCase(deleteBooking.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
    } 
});
