import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { contactMessage } from "../data/contactMessage";

const delay = (data, timeWait = 600) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, timeWait)
    });
}

export const getAllMessages = createAsyncThunk("contact/getAllRooms", async () => {
    return await delay(contactMessage);
});

export const deleteMessage = createAsyncThunk("contact/deleteMessage", async (id) => {
    return await delay(id);
});

export const archiveMessage = createAsyncThunk("contact/archiveMessage", async (id) => {
    return await delay(id);
});

export const unArchiveMessage = createAsyncThunk("contact/unArchiveMessage", async (id) => {
    return await delay(id);
});

export const contactSlice = createSlice({
    name: "contact",
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
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
            state.data = state.data.map(data => {
                if (data.id === action.payload) {
                  return { ...data, isArchived: true };
                }
                return data;
            });
        })
        .addCase(archiveMessage.pending, (state) => {state.status = "pending"})
        .addCase(archiveMessage.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(unArchiveMessage.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.data = state.data.map(data => {
                if (data.id === action.payload) {
                  return { ...data, isArchived: false };
                }
                return data;
            });
        })
        .addCase(unArchiveMessage.pending, (state) => {state.status = "pending"})
        .addCase(unArchiveMessage.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(deleteMessage.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.data = state.data.filter(data => data.id !== action.payload);
        })
        .addCase(deleteMessage.pending, (state) => {state.status = "pending"})
        .addCase(deleteMessage.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
    }
})