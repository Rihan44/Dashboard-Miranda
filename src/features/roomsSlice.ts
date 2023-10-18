import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { roomsData } from "../data/roomsData";

const delay = (data, timeWait = 600) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, timeWait)
    });
}

export const getAllRooms = createAsyncThunk("rooms/getAllRooms", async () => {
   return await delay(roomsData);
});

export const getRoom = createAsyncThunk("rooms/getRoom", async (id) => {
    return await delay(id);
});

export const deleteRoom = createAsyncThunk("rooms/deleteRoom", async (id) => {
    return await delay(id, 600);
});

export const updateRoom = createAsyncThunk("rooms/updateRoom", async (dataUpdate) => {
    return await delay(dataUpdate);
});

export const createRoom = createAsyncThunk("users/createRoom", async (data) => {
    return await delay(data);
});

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState: {
        data: [],
        updatedDataRoom: [],
        dataRoom: [],
        singleData: null,
        status: 'idle',
        statusDelete: 'idle',
        error: null
    },
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
                state.dataRoom = state.updatedDataRoom.filter(data => {return data.id === action.payload});
            } else {
                state.dataRoom = state.data.filter(data => {return data.id === action.payload});
            }
        })
        .addCase(getRoom.pending, (state) => {state.status = "pending"})
        .addCase(getRoom.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(deleteRoom.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.statusDelete= "fulfilled";

            if(state.updatedDataRoom.length !== 0){
                state.updatedDataRoom = state.updatedDataRoom.filter(data => {return data.id !== action.payload});
            } else {
                state.data = state.data.filter(data => {return data.id !== action.payload});
            }
        })
        .addCase(deleteRoom.pending, (state) => {state.statusDelete = "pending"}) 
        .addCase(deleteRoom.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(updateRoom.fulfilled, (state, action) => {
            state.status = "fulfilled";
            if(state.updatedDataRoom.length === 0) {
                state.updatedDataRoom = [...state.data];
            }

            state.updatedDataRoom = state.updatedDataRoom.map(data => {
                if (data.id === action.payload.id) {
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