import fetch from 'cross-fetch';
import { createAsyncThunk} from "@reduxjs/toolkit";

// const urlApi = import.meta.env.VITE_URL_API;
const urlApi = 'https://rx3866rpnh.execute-api.eu-west-1.amazonaws.com';

export const login = createAsyncThunk("login/userLogin", async (dataLogin: LoginInterface) => {

  try {

    const response = await fetch(`${urlApi}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: dataLogin.email,
          password: dataLogin.password,
        }),
    })
    
      if(response.ok) {
        const data = await response.json();

        const dataUser = {
          payload: data.payload,
          token: data.token
        }
        
        localStorage.setItem('token', data.token);
  
        return dataUser;

      } else {
        throw new Error(`Email or Password are incorrect`); 
      }
      
    } catch (error) {
      throw new Error(`Failed to login: ${error}`);
    }
});

