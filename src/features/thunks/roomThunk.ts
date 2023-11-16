import fetch from 'cross-fetch';
import { createAsyncThunk } from "@reduxjs/toolkit";

import { RoomInterface } from "../../interfaces/roomInterface";

// const apiUrlLocal = 'http://localhost:3000/rooms';
const apiUrlLocal = 'https://rx3866rpnh.execute-api.eu-west-1.amazonaws.com/rooms';

export const getAllRooms = createAsyncThunk<RoomInterface[]>("rooms/getAllRooms", async () => {
  const token  = localStorage.getItem('token') || '';

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

});

export const getRoom = createAsyncThunk("rooms/getRoom", async (id: string | number) => {
  const token  = localStorage.getItem('token') || '';

  try {
    const response = await fetch(`${apiUrlLocal}/${id}`, {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: token
      },
    });

    const { rooms } = await response.json();
    return rooms;

  } catch (error) {
    throw new Error(`Failed to fetch room: ${error}`);
  }

});

export const deleteTheRoom = createAsyncThunk("rooms/deleteRoom", async (id: string | number) => {
  const token  = localStorage.getItem('token') || '';

  try {
    await fetch(`${apiUrlLocal}/${id}`, {
      mode: 'cors',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token: token
      },
    });

    return id;

  } catch (error) {
    throw new Error(`Failed to delete rooms: ${error}`);
  }
});

export const updateRoom = createAsyncThunk("rooms/updateRoom", async (dataUpdate: RoomInterface) => {
  const token  = localStorage.getItem('token') || '';

  try {
    await fetch(`${apiUrlLocal}/${dataUpdate._id}`, {
      mode: 'cors',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: token
      },

      body: JSON.stringify({
        room_photo: dataUpdate.room_photo,
        room_type: dataUpdate.room_type,
        room_number: dataUpdate.room_number,
        amenities: dataUpdate.amenities,
        price: dataUpdate.price,
        discount: dataUpdate.discount,
        status: dataUpdate.status,
        description: dataUpdate.description
      }),
    });

  } catch (error) {
    throw new Error(`Failed to update rooms: ${error}`);
  }
});

export const createRoom = createAsyncThunk("users/createRoom", async (data: RoomInterface) => {
  const token  = localStorage.getItem('token') || '';

  try {
    await fetch(`${apiUrlLocal}`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: token
      },

      body: JSON.stringify({
        room_photo: data.room_photo,
        room_type: data.room_type,
        room_number: data.room_number,
        amenities: data.amenities,
        price: data.price,
        discount: data.discount,
        status: data.status,
        description: data.description
      }),
    });

  } catch (error) {
    throw new Error(`Failed to create rooms: ${error}`);
  }
});
