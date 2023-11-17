import fetch from 'cross-fetch';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactInterface } from '../../../interfaces/contactInterface.js';
import { fetchFunction } from '../../thunks/fetchFunction.js';

const urlApi = import.meta.env.VITE_URL_API;
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
  const token  = localStorage.getItem('token') || '';

  try {

    await fetch(`${urlApi}${endPoint}/${data.id}`, {
      mode: 'cors',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: token
      },

      body: JSON.stringify({
        isArchived: data.archive,
      }),
    });

    const response = await fetch(`${urlApi}${endPoint}`, {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: token
      },
    });

    const { result } = await response.json();

    return result;
  } catch (error) {
    throw new Error(`Failed to archive message: ${error}`);
  }

});

export const unArchiveMessage = createAsyncThunk("contact/unArchiveMessage", async (data: any) => {
  const token  = localStorage.getItem('token') || '';

  try {

    await fetch(`${urlApi}${endPoint}/${data.id}`, {
      mode: 'cors',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: token
      },

      body: JSON.stringify({
        isArchived: data.archive,
      }),
    });

    const response = await fetch(`${urlApi}${endPoint}`, {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: token
      },
    });

    const { result } = await response.json();

    return result;

  } catch (error) {
    throw new Error(`Failed to unarchive message: ${error}`);
  }

});