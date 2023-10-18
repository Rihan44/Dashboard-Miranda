export interface BookingsInterface {
    id?: string | number,
    guest: string,
    phone_number: string | number,
    order_date: Date | string,
    check_in: Date | string,
    check_out: Date | string,
    special_request: string,
    room_type: string, 
    room_number: number | string,
    status: string, 
    price: number | string
}

export interface BookingsInterfaceState {
    data: BookingsInterface[],
    dataBooking: BookingsInterface[],
    bookingUpdateData: BookingsInterface[],
    status: string,
    statusDelete: string,
    error: string | null | undefined
}

