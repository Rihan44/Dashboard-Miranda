import { createSlice } from "@reduxjs/toolkit";
import { RoomsInterfaceState } from "../interfaces/roomInterface";
import { getAllRooms, getRoom, createRoom, deleteTheRoom, updateRoom } from "./thunks/roomThunk";

const initialState: RoomsInterfaceState = {
    data: [],
    updatedDataRoom: [],
    dataRoom: [],
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
            if(state.updatedDataRoom.length !== 0){
                state.dataRoom = state.updatedDataRoom.filter(data => {return data._id === action.payload});
            } else {
                state.dataRoom = state.data.filter(data => {return data._id === action.payload});
            }
        })
        .addCase(getRoom.pending, (state) => {state.status = "pending"})
        .addCase(getRoom.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(deleteTheRoom.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.statusDelete= "fulfilled";

            if(state.updatedDataRoom.length !== 0){
                state.updatedDataRoom = state.updatedDataRoom.filter(data => {return data._id !== action.payload});
            } else {
                state.data = state.data.filter(data => {return data._id !== action.payload});
            }
        })
        .addCase(deleteTheRoom.pending, (state) => {state.statusDelete = "pending"}) 
        .addCase(deleteTheRoom.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(updateRoom.fulfilled, (state, action) => {
            state.status = "fulfilled";
            if(state.updatedDataRoom.length === 0) {
                state.updatedDataRoom = [...state.data];
            }

            state.updatedDataRoom = state.updatedDataRoom.map(data => {
                if (data._id === action.payload._id) {
                    return {
                        ...data, 
                        room_number: action.payload.room_number,
                        discount: action.payload.discount,
                        room_type: action.payload.room_type,
                        offer_price: action.payload.offer_price,
                        price: action.payload.price,
                        amenities: action.payload.amenities,
                        description: action.payload.description
                    };
                } 

                return data;
            })
            
        })
        .addCase(updateRoom.pending, (state) => {state.status = "pending"})
        .addCase(updateRoom.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(createRoom.fulfilled, (state, action) => {
            state.status = "fulfilled";

            if(state.updatedDataRoom.length === 0) {
                state.updatedDataRoom = [...state.data];
            } 
            
            state.updatedDataRoom.push(action.payload)
        })
        .addCase(createRoom.pending, (state) => {state.status = "pending"})
        .addCase(createRoom.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
    }
})