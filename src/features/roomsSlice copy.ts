import { PayloadAction, createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

export const getRoom = createAsyncThunk("rooms/getRoom", async (id: string) => {
    return await delay(id);
});

export const deleteRoom = createAsyncThunk("rooms/deleteRoom", async (id: string) => {
    return await delay(id, 600);
});

export const updateRoom = createAsyncThunk("rooms/updateRoom", async (dataUpdate: Room) => {
    return await delay(dataUpdate);
});

export const createRoom = createAsyncThunk("users/createRoom", async (data: Room) => {
    return await delay(data);
});

interface Room {
    id: string,
    room_photo: string,
    room_type: string,
    amenities: string[],
    description: string,
    discount: number,
    offer_price: boolean,
    price: number,
    room_number: string | number,
    status: string
}

interface StateInterface {
    data: Room[],
    updatedDataRoom: Room[],
    dataRoom: Room[],
    singleData: null,
    status: string,
    statusDelete: string,
    error: string | undefined
}

const initialState: StateInterface = {
    data: [],
    updatedDataRoom: [],
    dataRoom: [],
    singleData: null,
    status: 'idle',
    statusDelete: 'idle',
    error: 'error'
}


const actions = {
    getAll: createAction<{ params: Room }>('rooms/getAllRooms'),
    updateParams: createAction<{ params: Room }>('rooms/updateRoom'),
  } as const;

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {},
    extraReducers: (builder) => { 
        builder.addCase(getAllRooms.fulfilled, (state, action: PayloadAction<any>) => {
            state.status = "fulfilled";
            state.data = action.payload;
        })
            .addCase(getAllRooms.pending, (state) => { state.status = "pending" })
            .addCase(getAllRooms.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message;
            })
            .addCase(getRoom.fulfilled, (state, action) => {
                state.status = "fulfilled";
                if (state.updatedDataRoom.length !== 0) {
                    state.dataRoom = state.updatedDataRoom.filter(data => { return data.id === action.payload });
                } else {
                    state.dataRoom = state.data.filter(data => { return data.id === action.payload });
                }
            })
            .addCase(getRoom.pending, (state) => { state.status = "pending" })
            .addCase(getRoom.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message;
            })
            .addCase(deleteRoom.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.statusDelete = "fulfilled";

                if (state.updatedDataRoom.length !== 0) {
                    state.updatedDataRoom = state.updatedDataRoom.filter(data => { return data.id !== action.payload });
                } else {
                    state.data = state.data.filter(data => { return data.id !== action.payload });
                }
            })
            .addCase(deleteRoom.pending, (state) => { state.statusDelete = "pending" })
            .addCase(deleteRoom.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message;
            })
            .addCase(updateRoom.fulfilled, (state, action) => {
                state.status = "fulfilled";
                if (state.updatedDataRoom.length === 0) {
                    state.updatedDataRoom = [...state.data];
                }

                const {id, room_photo, room_number, discount, room_type, offer_price, price, amenities, description, status}: any = action.payload;

                state.updatedDataRoom = state.updatedDataRoom.map(data => {
                    if (data.id === id) {
                        return {
                            ...data,
                            id: id,
                            room_photo: room_photo,
                            room_number: room_number,
                            discount: discount,
                            room_type: room_type,
                            offer_price:offer_price,
                            price: price,
                            amenities: amenities,
                            description: description,
                            status: status
                        };
                    }

                    return data;
                })

            })
            .addCase(updateRoom.pending, (state) => { state.status = "pending" })
            .addCase(updateRoom.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message;
            })
            .addCase(createRoom.fulfilled, (state, action) => {
                state.status = "fulfilled";

                const {id, room_photo, room_number, discount, room_type, offer_price, price, amenities, description, status}: any = action.payload;

                const updateData: Room = {
                    id: id,
                    room_photo: room_photo,
                    room_number: room_number,
                    discount: discount,
                    room_type: room_type,
                    offer_price: offer_price,
                    price: price,
                    amenities: amenities,
                    description: description,
                    status: status
                }

                if (state.updatedDataRoom.length === 0) {
                    state.updatedDataRoom = [...state.data];
                }

                state.updatedDataRoom.push(updateData)
            })
            .addCase(createRoom.pending, (state) => { state.status = "pending" })
            .addCase(createRoom.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message;
            })
    }
})