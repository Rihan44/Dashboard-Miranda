import { createSlice } from "@reduxjs/toolkit";
import { UsersInterface, UsersInterfaceState } from "../../interfaces/usersInterface";
import { getAllUsers, getUser, deleteUser, updateUser, createUser } from "../thunks/usersThunk";

const initialState: UsersInterfaceState = {
    data: [],
    dataUser: {} as UsersInterface,
    status: 'idle',
    statusDelete: 'idle',
    error: null
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
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
            state.dataUser = action.payload;
        })
        .addCase(getUser.pending, (state) => {state.status = "pending"})
        .addCase(getUser.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.statusDelete = "fulfilled";
            state.data = state.data.filter(data => {return data._id !== action.payload});
        })
        .addCase(deleteUser.pending, (state) => {state.statusDelete = "pending"})
        .addCase(deleteUser.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.status = "fulfilled";
        })
        .addCase(updateUser.pending, (state) => {state.status = "pending"})
        .addCase(updateUser.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(createUser.fulfilled, (state, action) => {
            state.status = "fulfilled";
        })
        .addCase(createUser.pending, (state) => {state.status = "pending"})
        .addCase(createUser.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
            console.log(state.error);
        })
    }
})