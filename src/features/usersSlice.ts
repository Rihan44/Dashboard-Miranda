import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersData } from "../data/usersData";
import { UsersInterface, UsersInterfaceState } from "../interfaces/usersInterface";

const delay = (data: UsersInterface[] | string | number | UsersInterface, timeWait = 600) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, timeWait)
    });
}

export const getAllUsers = createAsyncThunk<UsersInterface[]>("users/getAllUsers", async () => {
    return (await delay(usersData) as UsersInterface[]);
 });
 
 export const getUser = createAsyncThunk("users/getUser", async (_id: string | number) => {
    return (await delay(_id) as string | number);
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (_id: string | number) => {
    return (await delay(_id, 300) as string | number);
});

export const updateUser = createAsyncThunk("users/updateUser", async (data: UsersInterface) => {
    return (await delay(data) as UsersInterface);
});

export const createUser = createAsyncThunk("users/createUser", async (data: UsersInterface) => {
    return (await delay(data) as UsersInterface);
});

const initialState: UsersInterfaceState = {
    data: [],
    updatedUsers:[],
    dataUser: [],
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
            
            if(state.updatedUsers.length !== 0){
                state.dataUser = state.updatedUsers.filter(data => {return data._id === action.payload});
            } else {
                state.dataUser = state.data.filter(data => {return data._id === action.payload});
            }
        })
        .addCase(getUser.pending, (state) => {state.status = "pending"})
        .addCase(getUser.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.statusDelete = "fulfilled";

            if(state.updatedUsers.length !== 0){
                state.updatedUsers = state.updatedUsers.filter(data => {return data._id !== action.payload});
            } else {
                state.data = state.data.filter(data => {return data._id !== action.payload})
            }
            
        })
        .addCase(deleteUser.pending, (state) => {state.statusDelete = "pending"})
        .addCase(deleteUser.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.status = "fulfilled";

            if(state.updatedUsers.length === 0) {
                state.updatedUsers = [...state.data];
            }

            state.updatedUsers = state.updatedUsers.map(data => {
                if (data._id === action.payload._id) {
                    return {
                        ...data, 
                        name: action.payload.name,
                        email: action.payload.email,
                        employee_position: action.payload.employee_position,
                        phone_number: action.payload.phone_number,
                        hire_date: action.payload.hire_date,
                        job_description: action.payload.job_description,
                        status: action.payload.status,
                        password_hash: action.payload.password_hash
                    };
                } 

                return data;
            })

        })
        .addCase(updateUser.pending, (state) => {state.status = "pending"})
        .addCase(updateUser.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
        .addCase(createUser.fulfilled, (state, action) => {
            state.status = "fulfilled";

            if(state.updatedUsers.length === 0) {
                state.updatedUsers = [...state.data];
            } 
            
            state.updatedUsers.push(action.payload)
        })
        .addCase(createUser.pending, (state) => {state.status = "pending"})
        .addCase(createUser.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
        })
    }
})