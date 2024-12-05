'use client'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import CreateOrderForm from './components/create-order-form'

export default function CreateOrderPage() {
    return (
        <div className='container mx-auto p-4'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/'>Trang chủ</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className='text-2xl font-bold mb-4'>Tạo đơn</h1>
            <CreateOrderForm />
        </div>
    )
}
