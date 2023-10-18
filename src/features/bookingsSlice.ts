import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bookingData } from "../data/bookingData";
import {BookingsInterface, BookingsInterfaceState} from '../interfaces/bookingsInterface.js';

const delay = (data: BookingsInterface[] | string | number | BookingsInterface) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 600)
    });
}

export const getAllBookings = createAsyncThunk<BookingsInterface[]>("bookings/getAllBookings", async () => {
   return (await delay(bookingData) as BookingsInterface[]);
});

export const getBookingDetail = createAsyncThunk("bookings/getBookingDetail", async (id: string | number) => {
    return (await delay(id)as string | number);
});

export const deleteBooking = createAsyncThunk("bookings/deleteBooking", async (id: string | number) => {
    return (await delay(id)as string | number);
});

export const updateBooking = createAsyncThunk("bookings/updateBooking", async (dataUpdate: BookingsInterface) => {
    return (await delay(dataUpdate) as BookingsInterface);
});

const initialState: BookingsInterfaceState = {
    data: [],
    dataBooking: [],
    bookingUpdateData: [],
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
            if(state.bookingUpdateData.length !== 0){
                state.dataBooking = state.bookingUpdateData.filter(data => {return data.id === action.payload});
            } else {
                state.dataBooking = state.data.filter(data => {return data.id === action.payload});
            }
        })
        .addCase(getBookingDetail.pending, (state) => {state.status = "pending"})
        .addCase(getBookingDetail.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(deleteBooking.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.statusDelete= "fulfilled";

            if(state.bookingUpdateData.length !== 0){
                state.bookingUpdateData = state.bookingUpdateData.filter(data => {return data.id !== action.payload});
            } else {
                state.data = state.data.filter(data => {return data.id !== action.payload})
            }
        })
        .addCase(deleteBooking.pending, (state) => {state.statusDelete = "pending"})
        .addCase(deleteBooking.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(updateBooking.fulfilled, (state, action) => {
            state.status = "fulfilled";
            if(state.bookingUpdateData.length === 0) {
                state.bookingUpdateData = [...state.data];
            }

            state.bookingUpdateData = state.bookingUpdateData.map(data => {
                if (data.id === action.payload.id) {
                    return {
                        ...data, 
                        guest: action.payload.guest,
                        phone_number: action.payload.phone_number,
                        check_in: action.payload.check_in,
                        check_out: action.payload.check_out,
                        special_request: action.payload.special_request,
                        room_number: action.payload.room_number,
                        room_type: action.payload.room_type,
                        price: action.payload.price
                    };
                } 
                return data;
            })
            
        })
        .addCase(updateBooking.pending, (state) => {state.status = "pending"})
        .addCase(updateBooking.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
    } 
});
