import { createSlice } from "@reduxjs/toolkit";
import { login } from "./loginThunk";

const initialState: LoginInterfaceState = {
    data: {} as LoginInterface,
    status: 'idle',
    error: null
}

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        resetStatus: (status) => {
			status.status = 'idle'
		},
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.data = action.payload;
        })
        .addCase(login.pending, (state) => {state.status = "pending"})
        .addCase(login.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
    }
})