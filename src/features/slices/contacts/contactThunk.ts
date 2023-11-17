import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactInterface } from '../../../interfaces/contactInterface.js';
import { fetchFunction } from '../fetchFunction.js';

const endPoint = '/contacts';

export const getAllMessages = createAsyncThunk<ContactInterface[]>("contact/getAllRooms", async () => {
  const response = await fetchFunction({url: `${endPoint}`, method: 'GET', returnData: true});
  return response;
});

export const deleteMessage = createAsyncThunk("contact/deleteMessage", async (id: string) => {
  const response = await fetchFunction({url: `${endPoint}/${id}`, method: 'DELETE', returnData: false, id: id});
  return response;
});

export const archiveMessage = createAsyncThunk("contact/archiveMessage", async (data: any) => {
  await fetchFunction({url: `${endPoint}/${data.id}`, method: 'PUT', returnData: false, bodyData: data});
  const response = await fetchFunction({url: `${endPoint}`, method: 'GET', returnData: true});
  return response;
});

export const unArchiveMessage = createAsyncThunk("contact/unArchiveMessage", async (data: any) => {
  await fetchFunction({url: `${endPoint}/${data.id}`, method: 'PUT', returnData: false, bodyData: data});
  const response = await fetchFunction({url: `${endPoint}`, method: 'GET', returnData: true});
  return response;
});