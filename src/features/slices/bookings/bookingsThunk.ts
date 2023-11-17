import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookingsInterface } from '../../../interfaces/bookingsInterface.js';
import { fetchFunction } from '../fetchFunction.js';

const endPoint = '/bookings';

export const getAllBookings = createAsyncThunk<BookingsInterface[]>("bookings/getAllBookings", async () => {
  const response = await fetchFunction({url: `${endPoint}`, method: 'GET', returnData: true});
  return response;
});

export const getBookingDetail = createAsyncThunk("bookings/getBookingDetail", async (id: string | number) => {
  const bookingResult = await fetchFunction({url: `${endPoint}/${id}`, method: 'GET', returnData: true});
  const roomResult = await fetchFunction({url: `/rooms/${bookingResult.roomID}`, method: 'GET', returnData: true});
  
  const bookingDetail = {
    id: bookingResult._id,
    guest: bookingResult.guest,
    phone_number: bookingResult.phone_number,
    order_date: bookingResult.order_date,
    check_in: bookingResult.check_in,
    check_out: bookingResult.check_out,
    special_request: bookingResult.special_request,
    room_type: bookingResult.room_type,
    room_number: bookingResult.room_number,
    price: bookingResult.price,
    description: roomResult.description,
    facilities: roomResult.amenities,
    room_photo: roomResult.room_photo,
    status: bookingResult.status
  }

  return bookingDetail;
});

export const deleteBooking = createAsyncThunk("bookings/deleteBooking", async (id: string) => {
  const response = await fetchFunction({url: `${endPoint}/${id}`, method: 'DELETE', returnData: false, id: id});
  return response;
});

export const updateBooking = createAsyncThunk("bookings/updateBooking", async (dataUpdate: BookingsInterface) => {
  await fetchFunction({url: `${endPoint}/${dataUpdate._id}`, method: 'PUT', returnData: false, bodyData: dataUpdate});
});
