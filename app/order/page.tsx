'use client'

import { useState, useEffect } from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import CreateOrderForm from './components/create-order-form'
import { PhongThang } from './types/order'

// Mock API call to fetch available PhongThang
const fetchAvailablePhongThang = async (): Promise<PhongThang[]> => {
    // In a real application, this would be an API call
    return [
        { maPhong: 1, nam: 2023, thang: 12, orderStatus: false },
        { maPhong: 2, nam: 2024, thang: 1, orderStatus: false },
        { maPhong: 3, nam: 2024, thang: 2, orderStatus: false },
        { maPhong: 4, nam: 2024, thang: 3, orderStatus: false },
        { maPhong: 5, nam: 2024, thang: 4, orderStatus: false },
        { maPhong: 6, nam: 2024, thang: 5, orderStatus: false }
    ]
}

export default function CreateOrderPage() {
    const [availableRooms, setAvailableRooms] = useState<PhongThang[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchAvailablePhongThang()
            setAvailableRooms(data)
        }
        fetchData()
    }, [])

    return (
        <div className='container mx-auto p-4'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className='text-2xl font-bold mb-4'>Create Order</h1>
            <CreateOrderForm availablePhongThang={availableRooms} />
        </div>
    )
}
