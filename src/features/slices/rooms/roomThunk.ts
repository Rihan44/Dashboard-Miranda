import { createAsyncThunk } from "@reduxjs/toolkit";

import { RoomInterface } from "../../../interfaces/roomInterface";
import { fetchFunction } from '../../thunks/fetchFunction';

const endPoint = '/rooms';

export const getAllRooms = createAsyncThunk<RoomInterface[]>("rooms/getAllRooms", async () => {
  const response = await fetchFunction({url: `${endPoint}`, method: 'GET', returnData: true});
  return response;
});

export const getRoom = createAsyncThunk("rooms/getRoom", async (id: string | number) => {
  const response = await fetchFunction({url: `${endPoint}/${id}`, method: 'GET', returnData: true});
  return response;
});

export const deleteTheRoom = createAsyncThunk("rooms/deleteRoom", async (id: string) => {
  const response = await fetchFunction({url: `${endPoint}/${id}`, method: 'DELETE', returnData: false, id: id});
  return response;
});

export const updateRoom = createAsyncThunk("rooms/updateRoom", async (dataUpdate: RoomInterface) => {
  await fetchFunction({url: `${endPoint}/${dataUpdate._id}`, method: 'PUT', returnData: false, bodyData: dataUpdate});
});

export const createRoom = createAsyncThunk("users/createRoom", async (data: RoomInterface) => {
  console.log(data);
  
  await fetchFunction({url: `${endPoint}`, method: 'POST', returnData: false, bodyData: data});
});
