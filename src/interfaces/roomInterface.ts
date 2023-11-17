
export interface RoomInterface {
    _id?: string | undefined,
    room_photo?: string,
    room_type: string,
    room_number: number | string,
    amenities: string[],
    price: number,
    discount: number,
    status?: string
    description: string
}

export interface RoomsInterfaceState {
    data: RoomInterface[],
    dataRoom: RoomInterface,
    status: string,
    statusDelete: string,
    error: string | null | undefined
}