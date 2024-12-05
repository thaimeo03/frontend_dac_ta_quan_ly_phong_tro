import api from './api'
import { PhongThang } from '@/app/order/types/order'

export const getAllAvailableMonthlyRooms = async () => {
    const res = await api.get<PhongThang[]>('/monthly-rooms/available')

    return res.data
}
