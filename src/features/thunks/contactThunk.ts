import { createAsyncThunk} from "@reduxjs/toolkit";
import { contactMessage } from "../../data/contactMessage";
import {ContactInterface} from '../../interfaces/contactInterface.js';

const delay = (data: ContactInterface[] | string | number | ContactInterface, timeWait: number = 600) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, timeWait)
    });
}

const {token} = JSON.parse(localStorage.getItem('auth') || '');
const apiUrlLocal = 'http://localhost:3000/contacts';

export const getAllMessages = createAsyncThunk<ContactInterface[]>("contact/getAllRooms", async () => {
    try {
        const response = await fetch(apiUrlLocal, {
            mode: 'cors',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              token: token
            },
        });

        const {result} = await response.json();
        
        return result; 
        
      } catch (error) {
        throw new Error(`Failed to fetch messages: ${error}`);
      }

    }
);

export const deleteMessage = createAsyncThunk("contact/deleteMessage", async (id: string | number) => {
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

        const {result} = await response.json();
        
        return result; 
    } catch (error) {
        throw new Error(`Failed to archive message: ${error}`);
    }
});

export const unArchiveMessage = createAsyncThunk("contact/unArchiveMessage", async (data: any) => {
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

        const {result} = await response.json();
        
        return result; 

    } catch (error) {
        throw new Error(`Failed to unarchive message: ${error}`);
    }
});