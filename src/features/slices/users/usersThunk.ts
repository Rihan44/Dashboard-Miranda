import { createAsyncThunk } from "@reduxjs/toolkit";
import { UsersInterface } from "../../../interfaces/usersInterface";
import { fetchFunction } from '../fetchFunction';

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
  await fetchFunction({url: `${endPoint}`, method: 'POST', returnData: false, bodyData: data});
});