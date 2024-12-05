import React from 'react'
import CreateRoomForm from './components/create-room-form'
import RoomList from './components/room-list'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

export default function RoomManagement() {
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

            <h1 className='text-2xl font-bold mb-4 mt-2'>Room Management</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                    <h2 className='text-xl font-semibold mb-2'>Create Room</h2>
                    <CreateRoomForm />
                </div>
                <div>
                    <h2 className='text-xl font-semibold mb-2'>All Rooms</h2>
                    <RoomList />
                </div>
            </div>
        </div>
    )
}
