import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { contactMessage } from "../data/contactMessage";
import {ContactInterface, ContactInterfaceState} from '../interfaces/contactInterface.js';

const delay = (data: ContactInterface[] | string | ContactInterface, timeWait: number = 600) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, timeWait)
    });
}

export const getAllMessages = createAsyncThunk<ContactInterface[]>("contact/getAllRooms", async () => {
    return (await delay(contactMessage) as ContactInterface[]);
});

export const deleteMessage = createAsyncThunk("contact/deleteMessage", async (id: string) => {
    return (await delay(id) as string);
});

export const archiveMessage = createAsyncThunk("contact/archiveMessage", async (id: string) => {
    return (await delay(id, 300) as string);
});

export const unArchiveMessage = createAsyncThunk("contact/unArchiveMessage", async (id: string) => {
    return (await delay(id, 300) as string);
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
                if (data.id === action.payload) {
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
                if (data.id === action.payload) {
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
            state.data = state.data.filter(data => data.id !== action.payload);
        })
        .addCase(deleteMessage.pending, (state) => {state.statusArchive = "pending"})
        .addCase(deleteMessage.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
    }
})