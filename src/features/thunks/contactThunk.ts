import fetch from 'cross-fetch';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactInterface } from '../../interfaces/contactInterface.js';

const apiUrlLocal = 'http://localhost:3000/contacts';
// const apiUrlLocal = 'https://rx3866rpnh.execute-api.eu-west-1.amazonaws.com/contacts';

export const getAllMessages = createAsyncThunk<ContactInterface[]>("contact/getAllRooms", async () => {
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

    // if(response.status !== 200){
    //   localStorage.clear();
    //   window.location.href = '/login';
    // }
    
    const { result } = await response.json();

    return result;

  } catch (error) {
    throw new Error(`Failed to fetch messages: ${error}`);
  }
});

export const deleteMessage = createAsyncThunk("contact/deleteMessage", async (id: string | number) => {
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
    throw new Error(`Failed to delete message: ${error}`);
  }
});

export const archiveMessage = createAsyncThunk("contact/archiveMessage", async (data: any) => {
  const token  = localStorage.getItem('token') || '';

  try {

    await fetch(`${apiUrlLocal}/${data.id}`, {
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

    const response = await fetch(apiUrlLocal, {
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

    await fetch(`${apiUrlLocal}/${data.id}`, {
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

    const response = await fetch(apiUrlLocal, {
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