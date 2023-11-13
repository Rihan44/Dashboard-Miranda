import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { contactMessage } from "../data/contactMessage";
import {ContactInterface, ContactInterfaceState} from '../interfaces/contactInterface.js';

const delay = (data: ContactInterface[] | string | number | ContactInterface, timeWait: number = 600) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, timeWait)
    });
}

export const getAllMessages = createAsyncThunk<ContactInterface[]>("contact/getAllRooms", async () => {
    return (await delay(contactMessage) as ContactInterface[]);
});

export const deleteMessage = createAsyncThunk("contact/deleteMessage", async (_id: string | number) => {
    return (await delay(_id) as string | number);
});

export const archiveMessage = createAsyncThunk("contact/archiveMessage", async (_id: string | number) => {
    return (await delay(_id, 300) as string | number);
});

export const unArchiveMessage = createAsyncThunk("contact/unArchiveMessage", async (_id: string | number) => {
    return (await delay(_id, 300) as string | number);
});

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
            state.data = state.data.map(data => {
                if (data._id === action.payload) {
                  return { ...data, isArchived: true };
                }
                return data;
            });
        })
        .addCase(archiveMessage.pending, (state) => {state.statusArchive = "pending"})
        .addCase(archiveMessage.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(unArchiveMessage.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.statusArchive = "fulfilled";

            state.data = state.data.map(data => {
                if (data._id === action.payload) {
                  return { ...data, isArchived: false };
                }
                return data;
            });
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