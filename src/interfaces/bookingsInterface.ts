export interface BookingsInterface {
    _id?: string | undefined,
    guest: string,
    phone_number: string,
    order_date?: string,
    check_in: string,
    check_out: string,
    special_request: string,
    room_type: string, 
    room_number: number | string,
    status?: string, 
    price: number
}

export interface BookingDetailInterface {
    id: string | number | undefined,
    guest: string,
    phone_number?: string,
    order_date?: string,
    check_in: string,
    check_out: string,
    special_request?: string,
    room_type: string,
    room_number?: number | string,
    price: number,
    description: string, 
    facilities: string[],
    room_photo: string,
    status: string
}

export interface BookingsInterfaceState {
    data: BookingsInterface[],
    dataBooking: BookingDetailInterface,
    status: string,
    statusDelete: string,
    error: string | null | undefined
}

