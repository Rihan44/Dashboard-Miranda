import { createAsyncThunk} from "@reduxjs/toolkit";
import { usersData } from "../../data/usersData";
import { UsersInterface} from "../../interfaces/usersInterface";


const delay = (data: UsersInterface[] | string | number | UsersInterface, timeWait = 600) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, timeWait)
    });
}

const {token} = JSON.parse(localStorage.getItem('auth') || '');
const apiUrlLocal = 'http://localhost:3000/users';

export const getAllUsers = createAsyncThunk<UsersInterface[]>("users/getAllUsers", async () => {
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
        
        return data.result; 
        
      } catch (error) {
        throw new Error(`Failed to fetch users: ${error}`);
      }

    }
);
 
export const getUser = createAsyncThunk("users/getUser", async (id: string | number) => {
    try {
        const response = await fetch(`${apiUrlLocal}/${id}`, {
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
        throw new Error(`Failed to fetch user: ${error}`);
      }
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id: string | number) => {
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
        throw new Error(`Failed to delete user: ${error}`);
      }
});

export const updateUser = createAsyncThunk("users/updateUser", async (data: UsersInterface) => {
    try {
        await fetch(`${apiUrlLocal}/${data._id}`, {
            mode: 'cors',
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              token: token
            },
  
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                photo: data.photo,
                employee_position: data.employee_position,
                phone_number: data.phone_number,
                hire_date: data.hire_date,
                job_description: data.job_description,
                status: data.status,
                password_hash: data.password_hash
            }),
        });
        
      } catch (error) {
        throw new Error(`Failed to update user: ${error}`);
      }
});

export const createUser = createAsyncThunk("users/createUser", async (data: UsersInterface) => {
    try {
        await fetch(`${apiUrlLocal}`, {
            mode: 'cors',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              token: token
            },
  
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                photo: data.photo,
                employee_position: data.employee_position,
                phone_number: data.phone_number,
                hire_date: data.hire_date,
                job_description: data.job_description,
                status: data.status,
                password_hash: data.password_hash
            }),
        });
        
      } catch (error) {
        throw new Error(`Failed to create user: ${error}`);
      }
});