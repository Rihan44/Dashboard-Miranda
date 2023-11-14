import { createAsyncThunk} from "@reduxjs/toolkit";
import {BookingsInterface} from '../../interfaces/bookingsInterface.js';

const {token} = JSON.parse(localStorage.getItem('auth') || '');
const apiUrlLocal = 'http://localhost:3000/bookings';

const delay = (data: BookingsInterface[] | string | number | BookingsInterface) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 600)
    });
}

export const getAllBookings = createAsyncThunk<BookingsInterface[]>("bookings/getAllBookings", async () => {
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
        throw new Error(`Failed to fetch bookings: ${error}`);
      }
      
    }
);

export const getBookingDetail = createAsyncThunk("bookings/getBookingDetail", async (id: string | number) => {
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
        
        const getRoom = await fetch(`http://localhost:3000/rooms/${result.roomID}`, {
            mode: 'cors',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              token: token
            },
        });

        const {rooms} = await getRoom.json();
        
        const bookingDetail = {
            id: result._id,
            guest: result.guest,
            phone_number: result.phone_number,
            order_date: result.order_date,
            check_in: result.check_in,
            check_out: result.check_out,
            special_request: result.special_request,
            room_type: result.room_type,
            room_number: result.room_number,
            price: result.price,
            description: rooms.description, 
            facilities: rooms.amenities,
            room_photo: rooms.room_photo,
            status: result.status 
        }
        
        return bookingDetail; 
        
      } catch (error) {
        throw new Error(`Failed to fetch booking: ${error}`);
      }
});

export const deleteBooking = createAsyncThunk("bookings/deleteBooking", async (id: string | number) => {
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
        throw new Error(`Failed to delete booking: ${error}`);
      }
});

export const updateBooking = createAsyncThunk("bookings/updateBooking", async (dataUpdate: BookingsInterface) => {
    try {
        await fetch(`${apiUrlLocal}/${dataUpdate._id}`, {
            mode: 'cors',
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              token: token
            },
  
            body: JSON.stringify({
                guest: dataUpdate.guest,
                phone_number: dataUpdate.phone_number,
                check_in: dataUpdate.check_in,
                check_out: dataUpdate.check_out,
                special_request: dataUpdate.special_request,
                room_type: dataUpdate.room_type, 
                room_number: dataUpdate.room_number,
                status: dataUpdate.status,
                price: dataUpdate.price
            }),
        });
        
      } catch (error) {
        throw new Error(`Failed to update rooms: ${error}`);
      }
});
