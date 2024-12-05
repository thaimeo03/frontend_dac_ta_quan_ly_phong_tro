import { RoomType } from '@/app/room-management/types/room'
import api from './api'

export const getAllRoomTypes = async () => {
    const res = await api.get<RoomType[]>('/room-types')

    return res.data
}
