import { Room } from "./room.model";

export interface Reservation {
    id: number;
    customerName: string;
    checkInDate: Date;
    checkOutDate: Date;
    room: Room;
}