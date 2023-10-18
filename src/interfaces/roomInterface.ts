export interface RoomInterface {
    id?: string | number,
    room_photo: string,
    room_type: string,
    room_number: string | number,
    amenities: string[],
    price: number,
    offer_price: boolean,
    discount: number,
    status: string
    description: string,
}

export interface RoomsInterfaceState {
    data: RoomInterface[],
    updatedDataRoom: RoomInterface[],
    dataRoom: RoomInterface[],
    status: string,
    statusDelete: string,
    error: string | null | undefined
}