import { RoomInterface } from "../../interfaces/roomInterface";

const urlApi = import.meta.env.VITE_URL_API;

interface FetchFunctionOptions {
    url?: string;
    method?: string;
    bodyData?: RoomInterface | undefined;
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

        if(response.ok) {
            if(returnData) {
                const data = await response.json();
                return data.result;
            } else {
                return id;
            }
        } else {
            throw new Error("Error fetching the rooms");
        }
  
    } catch (error) {
      throw new Error(`Failed to connect: ${error}`);
    }
}


