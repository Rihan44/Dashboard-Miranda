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
    return await delay(id, 300);
});

export const updateRoom = createAsyncThunk("rooms/updateRoom", async (dataUpdate) => {
    return await delay(dataUpdate);
});

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState: {
        data: [],
        singleData: null,
        status: 'idle',
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
            state.data = state.data.filter(data => {return data.id === action.payload})
        })
        .addCase(getRoom.pending, (state) => {state.status = "pending"})
        .addCase(getRoom.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(deleteRoom.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.data = state.data.filter(data => {return data.id !== action.payload})
        })
        .addCase(deleteRoom.pending, (state) => {state.status = "loading"}) /* TODO CAMBIAR EL STATUS AL BORRAR PARA QUE NO CARGUE EL SPINNER */
        .addCase(deleteRoom.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(updateRoom.fulfilled, (state, action) => {
            state.status = "fulfilled";
            
            state.data = state.data.map(data => {
                if (data.id === action.payload.id) {
                  return { ...data, room_number: action.payload.room_number};
                }
                return data;
            });
        })
        .addCase(updateRoom.pending, (state) => {state.status = "pending"})
        .addCase(updateRoom.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
    }
})