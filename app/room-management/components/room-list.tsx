'use client'

import { useQuery } from '@tanstack/react-query'
import RoomCard from './room-card'
import { getAllRooms } from '@/apis/room.api'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function RoomList() {
    const { data, isSuccess } = useQuery({
        queryKey: ['rooms'],
        queryFn: getAllRooms
    })

    return (
        <div className='space-y-4'>
            <ScrollArea className='h-[750px]'>
                <div className='flex flex-col gap-4'>
                    {isSuccess && data.map((room) => <RoomCard key={room.MaPhong} room={room} />)}
                </div>
            </ScrollArea>
        </div>
    )
}
