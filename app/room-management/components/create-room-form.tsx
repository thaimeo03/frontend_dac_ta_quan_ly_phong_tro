'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CreateRoomData } from '../types/room'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllRoomTypes } from '@/apis/room-type.api'
import { getAllLocations } from '@/apis/location.api'
import { createRoom } from '@/apis/room.api'

const formSchema = z.object({
    tenPhong: z.string().min(1, 'Room name is required'),
    soNguoiToiDa: z.number().min(1, 'Maximum occupancy must be at least 1'),
    dienTich: z.number().min(1, 'Area must be at least 1'),
    moTa: z.string(),
    soTang: z.number().min(1, 'Floor number must be at least 1'),
    maLoaiPhong: z.number().min(1, 'Room type is required'),
    maViTri: z.number().min(1, 'Location is required')
})

export default function CreateRoomForm() {
    // Hooks
    const queryClient = useQueryClient()
    const { data: roomTypes } = useQuery({
        queryKey: ['room-types'],
        queryFn: getAllRoomTypes
    })

    const { data: locations } = useQuery({
        queryKey: ['locations'],
        queryFn: getAllLocations
    })

    const createRoomMutation = useMutation({
        mutationFn: (body: CreateRoomData) => createRoom(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['rooms'] })
        }
    })

    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<CreateRoomData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tenPhong: '',
            soNguoiToiDa: 1,
            dienTich: 1,
            moTa: '',
            soTang: 1,
            maLoaiPhong: 1,
            maViTri: 1
        }
    })

    async function onSubmit(values: CreateRoomData) {
        setIsLoading(true)

        console.log(values)

        createRoomMutation.mutate(values)

        setIsLoading(false)

        form.reset()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='tenPhong'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Room Name</FormLabel>
                            <FormControl>
                                <Input placeholder='Enter room name' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='soNguoiToiDa'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Maximum Occupancy</FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    {...field}
                                    value={!field.value ? '' : field.value}
                                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='dienTich'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Area (m²)</FormLabel>
                            <FormControl>
                                <Input
                                    type='number'
                                    {...field}
                                    value={!field.value ? '' : field.value}
                                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='moTa'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder='Enter room description' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='soTang'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Floor Number</FormLabel>
                            <FormControl>
                                <Input
                                    type='number'
                                    {...field}
                                    value={!field.value ? '' : field.value}
                                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='maLoaiPhong'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Room Type</FormLabel>
                            <Select onValueChange={(value) => field.onChange(parseInt(value))}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select room type' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {(roomTypes || []).map((roomType) => (
                                        <SelectItem key={roomType.MaLoaiPhong} value={roomType.MaLoaiPhong.toString()}>
                                            {roomType.TenLoaiPhong}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='maViTri'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <Select onValueChange={(value) => field.onChange(parseInt(value))}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select location' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {(locations || []).map((location) => (
                                        <SelectItem key={location.MaDiaChi} value={location.MaDiaChi.toString()}>
                                            {location.SoNha}, {location.Phuong}, {location.Quan}, {location.Tinh}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit' disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create Room'}
                </Button>
            </form>
        </Form>
    )
}
