import { createAsyncThunk} from "@reduxjs/toolkit";
import fetch from 'cross-fetch';

import { roomsData } from "../../data/roomsData";
import { RoomInterface } from "../../interfaces/roomInterface";

const delay = (data: RoomInterface[] | string | number | RoomInterface, timeWait: number = 600) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, timeWait)
    });
}

const {token} = JSON.parse(localStorage.getItem('auth') || '');

export const getAllRooms = createAsyncThunk<RoomInterface[]>("rooms/getAllRooms", async () => {
      const apiUrlLocal = 'http://localhost:3000/rooms';
      
      try {
        const response = await fetch(apiUrlLocal, {
            mode: 'cors',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              token: token
            },
        });

        const data = await response.json();

        return data.rooms; 
        
      } catch (error) {
        throw new Error(`Failed to fetch rooms: ${error}`);
      }
    }
);
  
export const getRoom = createAsyncThunk("rooms/getRoom", async (id: string | number) => {
    return (await delay(id)as string | number);
});

export const deleteTheRoom = createAsyncThunk("rooms/deleteRoom", async (id: string | number) => {
    return (await delay(id, 600) as string | number);
});

export const updateRoom = createAsyncThunk("rooms/updateRoom", async (dataUpdate: RoomInterface) => {
    return (await delay(dataUpdate) as RoomInterface);
});

export const createRoom = createAsyncThunk("users/createRoom", async (data: RoomInterface) => {
    return (await delay(data) as RoomInterface);
});
