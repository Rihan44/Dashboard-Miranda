import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersData } from "../data/usersData";


const delay = (data, timeWait = 600) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, timeWait)
    });
}

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
    return await delay(usersData);
 });
 
 export const getUser = createAsyncThunk("users/getRoom", async (id) => {
    return await delay(id);
});

export const deleteUser = createAsyncThunk("users/deleteRoom", async (id) => {
    return await delay(id, 300);
});

export const updateUser = createAsyncThunk("users/updateRoom", async (id) => {
    return await delay(id);
});

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.data = action.payload;
        })
        .addCase(getAllUsers.pending, (state) => {state.status = "pending"})
        .addCase(getAllUsers.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.data = state.data.filter(data => {return data.id === action.payload})
        })
        .addCase(getUser.pending, (state) => {state.status = "pending"})
        .addCase(getUser.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.data = state.data.filter(data => {return data.id !== action.payload})
        })
        .addCase(deleteUser.pending, (state) => {state.status = "pending"})
        .addCase(deleteUser.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.status = "fulfilled";
            /* WIP */
        })
        .addCase(updateUser.pending, (state) => {state.status = "pending"})
        .addCase(updateUser.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
    }
})