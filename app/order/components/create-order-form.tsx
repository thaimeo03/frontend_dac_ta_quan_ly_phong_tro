'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CreateOrderData, PhongThang } from '../types/order'
import { toast } from '@/hooks/use-toast'
import { Card, CardContent } from '@/components/ui/card'

const formSchema = z.object({
    soDienThoaiLienLac: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
    soLuongNguoiO: z.number().min(1, 'Number of occupants must be at least 1'),
    phongThangKeys: z
        .array(
            z.object({
                maPhong: z.number(),
                nam: z.number(),
                thang: z.number()
            })
        )
        .min(1, 'At least one room must be selected')
})

interface CreateOrderFormProps {
    availablePhongThang: PhongThang[]
}

export default function CreateOrderForm({ availablePhongThang }: CreateOrderFormProps) {
    // Hooks
    const [isLoading, setIsLoading] = useState(false)
    const [selectedRooms, setSelectedRooms] = useState<PhongThang[]>([])

    const form = useForm<CreateOrderData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            soDienThoaiLienLac: '',
            soLuongNguoiO: 1,
            phongThangKeys: []
        }
    })

    const toggleRoomSelection = (room: PhongThang) => {
        setSelectedRooms((prev) => {
            const isSelected = prev.some(
                (r) => r.maPhong === room.maPhong && r.nam === room.nam && r.thang === room.thang
            )
            if (isSelected) {
                return prev.filter((r) => !(r.maPhong === room.maPhong && r.nam === room.nam && r.thang === room.thang))
            } else {
                return [...prev, room]
            }
        })
    }

    useEffect(() => {
        form.setValue('phongThangKeys', selectedRooms)
    }, [form, selectedRooms])

    const onSubmit = form.handleSubmit((values) => {
        if (selectedRooms.length === 0) {
            toast({
                title: 'No rooms selected',
                description: 'Please select at least one room.',
                variant: 'destructive'
            })
            return
        }

        setIsLoading(true)
        // Here you would typically send a POST request to your API
        console.log(values)
        setIsLoading(false)
        form.reset()
        setSelectedRooms([])
        toast({
            title: 'Order created',
            description: 'Your order has been successfully created.'
        })
    })

    return (
        <Form {...form}>
            <form onSubmit={onSubmit} className='space-y-6'>
                <FormField
                    control={form.control}
                    name='soDienThoaiLienLac'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder='Enter phone number' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='soLuongNguoiO'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Number of Occupants</FormLabel>
                            <FormControl>
                                <Input
                                    type='number'
                                    {...field}
                                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <h3 className='text-lg font-medium mb-2'>Available Rooms</h3>
                    <Card>
                        <CardContent className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-4'>
                            {availablePhongThang.map((room) => {
                                const isSelected = selectedRooms.some(
                                    (r) => r.maPhong === room.maPhong && r.nam === room.nam && r.thang === room.thang
                                )
                                return (
                                    <Button
                                        key={`${room.maPhong}-${room.nam}-${room.thang}`}
                                        type='button'
                                        variant={isSelected ? 'default' : 'outline'}
                                        className={`w-full ${isSelected ? 'bg-primary text-primary-foreground' : ''}`}
                                        onClick={() => toggleRoomSelection(room)}
                                    >
                                        Room {room.maPhong}
                                        <br />
                                        {room.thang}/{room.nam}
                                    </Button>
                                )
                            })}
                        </CardContent>
                    </Card>
                </div>
                <Button type='submit' disabled={isLoading || selectedRooms.length === 0}>
                    {isLoading ? 'Creating Order...' : 'Create Order'}
                </Button>
            </form>
        </Form>
    )
}
