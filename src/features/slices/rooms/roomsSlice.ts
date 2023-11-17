import { createSlice } from "@reduxjs/toolkit";
import { RoomInterface, RoomsInterfaceState } from "../../../interfaces/roomInterface";
import { getAllRooms, getRoom, createRoom, deleteTheRoom, updateRoom } from "./roomThunk";

const initialState: RoomsInterfaceState = {
    data: [],
    dataRoom: {} as RoomInterface,
    status: 'idle',
    statusDelete: 'idle',
    error: null
}

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllRooms.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.data = action.payload;
        })
        .addCase(getAllRooms.pending, (state) => {state.status = "pending"})
        .addCase(getAllRooms.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(getRoom.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.dataRoom = action.payload;
        })
        .addCase(getRoom.pending, (state) => {state.status = "pending"})
        .addCase(getRoom.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(deleteTheRoom.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.statusDelete= "fulfilled";
            state.data = state.data.filter(data => {return data._id !== action.payload});
        })
        .addCase(deleteTheRoom.pending, (state) => {state.statusDelete = "pending"}) 
        .addCase(deleteTheRoom.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(updateRoom.fulfilled, (state, action) => {
            state.status = "fulfilled";
        })
        .addCase(updateRoom.pending, (state) => {state.status = "pending"})
        .addCase(updateRoom.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(createRoom.fulfilled, (state, action) => {
            state.status = "fulfilled";
        })
        .addCase(createRoom.pending, (state) => {state.status = "pending"})
        .addCase(createRoom.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
    }
})