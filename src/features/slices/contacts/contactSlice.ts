import { createSlice } from "@reduxjs/toolkit";
import {ContactInterfaceState} from '../../../interfaces/contactInterface.js';
import { getAllMessages, archiveMessage, unArchiveMessage, deleteMessage } from "./contactThunk.js";

const initialState: ContactInterfaceState = {
    data: [],
    status: 'idle',
    statusArchive: 'idle',
    error: null
}

export const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllMessages.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.data = action.payload;
        })
        .addCase(getAllMessages.pending, (state) => {state.status = "pending"})
        .addCase(getAllMessages.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(archiveMessage.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.statusArchive = "fulfilled";
            state.data = action.payload;
        })
        .addCase(archiveMessage.pending, (state) => {state.statusArchive = "pending"})
        .addCase(archiveMessage.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(unArchiveMessage.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.statusArchive = "fulfilled";
            state.data = action.payload;
        })
        .addCase(unArchiveMessage.pending, (state) => {state.statusArchive = "pending"})
        .addCase(unArchiveMessage.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(deleteMessage.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.statusArchive = "fulfilled";
            state.data = state.data.filter(data => data._id !== action.payload);
        })
        .addCase(deleteMessage.pending, (state) => {state.statusArchive = "pending"})
        .addCase(deleteMessage.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
    }
})