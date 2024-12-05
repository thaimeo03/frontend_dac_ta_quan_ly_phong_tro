import api from './api'
import { CreateOrderData, Order, OrderDetails } from '@/app/order/types/order'

export const createOrder = async (body: CreateOrderData) => {
    const res = await api.post<Order>('/orders', body, { headers: { 'x-user-id': 4 } })

    return res.data
}

export const getOrderDetails = async (orderId: string) => {
    const res = await api.get<OrderDetails>(`/orders/${orderId}`)

    return res.data
}
