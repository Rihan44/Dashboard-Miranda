import fetch from 'cross-fetch';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UsersInterface } from "../../../interfaces/usersInterface";
import { fetchFunction } from '../../thunks/fetchFunction';

const urlApi = import.meta.env.VITE_URL_API;
const endPoint = '/users';

export const getAllUsers = createAsyncThunk<UsersInterface[]>("users/getAllUsers", async () => {
  const response = await fetchFunction({url: `${endPoint}`, method: 'GET', returnData: true});
  return response;
});

export const getUser = createAsyncThunk("users/getUser", async (id: string | number) => {
  const response = await fetchFunction({url: `${endPoint}/${id}`, method: 'GET', returnData: true});
  return response;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id: string) => {
  const response = await fetchFunction({url: `${endPoint}/${id}`, method: 'DELETE', returnData: false, id: id});
  return response;
});

export const updateUser = createAsyncThunk("users/updateUser", async (data: UsersInterface) => {
  await fetchFunction({url: `${endPoint}/${data._id}`, method: 'PUT', returnData: false, bodyData: data});
});

export const createUser = createAsyncThunk("users/createUser", async (data: UsersInterface) => {
  const token  = localStorage.getItem('token') || '';
  
  try {
    const response = await fetch(`${urlApi}/users`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: token
      },

      body: JSON.stringify({
        name: data.name,
        email: data.email,
        employee_position: data.employee_position,
        phone_number: data.phone_number,
        hire_date: data.hire_date,
        job_description: data.job_description,
        status: data.status,
        photo: data.photo,
        password_hash: data.password_hash
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
    }
  
  } catch (error) {
    throw new Error(`Failed to create user: ${error}`);
  }
  // await fetchFunction({url: `${endPoint}`, method: 'POST', returnData: false, bodyData: data});

});