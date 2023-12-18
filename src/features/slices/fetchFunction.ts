import { BookingsInterface } from "../../interfaces/bookingsInterface";
import { ContactInterface } from "../../interfaces/contactInterface";
import { RoomInterface } from "../../interfaces/roomInterface";
import { UsersInterface } from "../../interfaces/usersInterface";

// const urlApi = import.meta.env.VITE_URL_API;
const urlApi = 'https://rx3866rpnh.execute-api.eu-west-1.amazonaws.com';


interface FetchFunctionOptions {
    url?: string;
    method?: string;
    bodyData?: RoomInterface | UsersInterface | ContactInterface
    | BookingsInterface | undefined;
    returnData?: boolean;
    id?: string;
  }

export const fetchFunction = async({url = '', method = '', bodyData = undefined, returnData = true, id = ''}: FetchFunctionOptions )=> {
    const token  = localStorage.getItem('token') || '';

    try {
        const response = await fetch(`${urlApi}${url}`, {
            mode: 'cors',
            method: method,
            headers: {
              'Content-Type': 'application/json',
              token: token
            },
            body: JSON.stringify(bodyData)
          });
          
        if (response.status === 401) {
            localStorage.clear()
            window.location.href = '/login'
        }
        
        if(response.ok) {
            if(returnData) {
                const data = await response.json();
                return data.result;
            } else {
                return id;
            }
        } else {
            throw new Error("Error fetching");
        }
  
    } catch (error) {
      throw new Error(`Failed to connect: ${error}`);
    }
}


