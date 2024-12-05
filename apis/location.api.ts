import { Location } from '@/app/room-management/types/room'
import api from './api'

export const getAllLocations = async () => {
    const res = await api.get<Location[]>('/locations')

    return res.data
}
