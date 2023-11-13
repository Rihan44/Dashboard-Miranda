import { createAsyncThunk} from "@reduxjs/toolkit";
import fetch from 'cross-fetch';

import { RoomInterface } from "../../interfaces/roomInterface";

const {token} = JSON.parse(localStorage.getItem('auth') || '');
const apiUrlLocal = 'http://localhost:3000/rooms';

export const getAllRooms = createAsyncThunk<RoomInterface[]>("rooms/getAllRooms", async () => {
      
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
      try {
        const response = await fetch(`${apiUrlLocal}/${id}`, {
            mode: 'cors',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              token: token
            },
        });

        const {rooms} = await response.json();
        return rooms; 
        
      } catch (error) {
        throw new Error(`Failed to fetch rooms: ${error}`);
      }
});

export const deleteTheRoom = createAsyncThunk("rooms/deleteRoom", async (id: string | number) => {
    try {
      const response = await fetch(`${apiUrlLocal}/${id}`, {
          mode: 'cors',
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            token: token
          },
      });

      return id; 
      
    } catch (error) {
      throw new Error(`Failed to fetch rooms: ${error}`);
    }
});

export const updateRoom = createAsyncThunk("rooms/updateRoom", async (dataUpdate: RoomInterface) => {
    try {
      await fetch(`${apiUrlLocal}/${dataUpdate._id}`, {
          mode: 'cors',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            token: token
          },

          body: JSON.stringify({
            room_type: dataUpdate.room_type,
            room_number: dataUpdate.room_number,
            amenities: dataUpdate.amenities,
            price: dataUpdate.price,
            discount: dataUpdate.discount,
            status: dataUpdate.status,
            description: dataUpdate.description,
            image: dataUpdate.image,
          }),
      });
      
    } catch (error) {
      throw new Error(`Failed to fetch rooms: ${error}`);
    }
});

export const createRoom = createAsyncThunk("users/createRoom", async (data: RoomInterface) => {
    try {
      await fetch(`${apiUrlLocal}`, {
          mode: 'cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: token
          },

          body: JSON.stringify({
            room_type: data.room_type,
            room_number: data.room_number,
            amenities: data.amenities,
            price: data.price,
            discount: data.discount,
            status: data.status,
            description: data.description,
            image: data.image,
          }),
      });

      return data;
      
    } catch (error) {
      throw new Error(`Failed to fetch rooms: ${error}`);
    }
});
