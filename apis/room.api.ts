import { CreateRoomData, Room } from '@/app/room-management/types/room'
import api from './api'

export const getAllRooms = async () => {
    const res = await api.get<Room[]>('/rooms')

    return res.data
}

export const createRoom = async (body: CreateRoomData) => {
    const res = await api.post<Room>('/rooms', body, { headers: { 'x-user-id': 4 } })

    return res.data
}
