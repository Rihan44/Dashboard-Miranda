import { createAsyncThunk } from "@reduxjs/toolkit";

import { RoomInterface } from "../../interfaces/roomInterface";
import { fetchFunction } from './fetchFunction';

export const getAllRooms = createAsyncThunk<RoomInterface[]>("rooms/getAllRooms", async () => {
  const response = await fetchFunction({url: '/rooms', method: 'GET', returnData: true});
  return response;
});

export const getRoom = createAsyncThunk("rooms/getRoom", async (id: string | number) => {
  const response = await fetchFunction({url: `/rooms/${id}`, method: 'GET', returnData: true});
  return response;
});

export const deleteTheRoom = createAsyncThunk("rooms/deleteRoom", async (id: string) => {
  const response = await fetchFunction({url: `/rooms/${id}`, method: 'DELETE', returnData: false, id: id});
  return response;
});

export const updateRoom = createAsyncThunk("rooms/updateRoom", async (dataUpdate: RoomInterface) => {
  await fetchFunction({url: `/rooms/${dataUpdate._id}`, method: 'PUT', returnData: false, bodyData: dataUpdate});
});

export const createRoom = createAsyncThunk("users/createRoom", async (data: RoomInterface) => {
  await fetchFunction({url: `/rooms`, method: 'POST', returnData: false, bodyData: data});
});
