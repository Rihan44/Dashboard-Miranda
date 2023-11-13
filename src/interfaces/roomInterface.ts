
export interface RoomInterface {
    _id?: string | number,
    room_type: string,
    room_number: number | string,
    amenities: string[],
    price: number | string,
    discount: number,
    status: string
    description: string,
    image?: string
}

export interface RoomsInterfaceState {
    data: RoomInterface[],
    updatedDataRoom: RoomInterface[],
    dataRoom: RoomInterface,
    status: string,
    statusDelete: string,
    error: string | null | undefined
}