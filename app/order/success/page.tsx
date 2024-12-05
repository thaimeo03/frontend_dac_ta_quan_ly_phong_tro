'use client'

import { useSearchParams } from 'next/navigation'
import OrderSuccessCard from './components/order-success-card'
import { OrderDetails } from '../types/order'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getOrderDetails } from '@/apis/oder.api'

export default function OrderSuccessPage() {
    // Hooks
    const searchParams = useSearchParams()
    const orderId = searchParams.get('orderId')

    const { data: orderDetails } = useQuery<OrderDetails>({
        queryKey: ['orderDetails'],
        queryFn: () => getOrderDetails(orderId || '')
    })

    if (!orderDetails) {
        return <div className='flex justify-center items-center h-screen'>Không tìm thấy đơn</div>
    }

    return (
        <div className='container mx-auto p-4 h-screen grid place-items-center'>
            <div>
                <h1 className='text-2xl font-bold mb-6 text-center'>Đặt phòng thành công</h1>
                <OrderSuccessCard orderDetails={orderDetails} />
                <Link href='/' className='text-center block underline mt-2'>
                    Quay về
                </Link>
            </div>
        </div>
    )
}
