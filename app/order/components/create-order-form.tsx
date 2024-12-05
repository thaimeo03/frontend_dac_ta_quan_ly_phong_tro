'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CreateOrderData, PhongThang, PhongThangKey } from '../types/order'
import { toast } from '@/hooks/use-toast'
import { Card, CardContent } from '@/components/ui/card'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getAllAvailableMonthlyRooms } from '@/apis/monthy-room.api'
import { createOrder } from '@/apis/oder.api'
import { useRouter } from 'next/navigation'

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

export default function CreateOrderForm() {
    // Hooks
    const router = useRouter()
    const { data: availableRooms } = useQuery({
        queryKey: ['available-monthly-rooms'],
        queryFn: getAllAvailableMonthlyRooms
    })

    const createOrderMutation = useMutation({
        mutationFn: (body: CreateOrderData) => createOrder(body),
        onSuccess: (data) => {
            router.push(`/order/success?orderId=${data.MaDon}`)
        },
        onError: () => {
            toast({
                title: 'Error',
                description: 'Failed to create order'
            })
        }
    })

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
                (r) => r.MaPhong === room.MaPhong && r.Nam === room.Nam && r.Thang === room.Thang
            )
            if (isSelected) {
                return prev.filter((r) => !(r.MaPhong === room.MaPhong && r.Nam === room.Nam && r.Thang === room.Thang))
            } else {
                return [...prev, room]
            }
        })
    }

    // console.log(form.watch('phongThangKeys'))

    useEffect(() => {
        const phongThangKeys: PhongThangKey[] = selectedRooms.map((room) => ({
            maPhong: room.MaPhong,
            nam: room.Nam,
            thang: room.Thang
        }))
        form.setValue('phongThangKeys', phongThangKeys)
    }, [form, selectedRooms])

    async function onSubmit(values: CreateOrderData) {
        if (selectedRooms.length === 0) {
            toast({
                title: 'No rooms selected',
                description: 'Please select at least one room.',
                variant: 'destructive'
            })
            return
        }

        setIsLoading(true)

        console.log(values)
        createOrderMutation.mutate(values)

        setIsLoading(false)
        form.reset()
        setSelectedRooms([])
        toast({
            title: 'Order created',
            description: 'Your order has been successfully created.'
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <FormField
                    control={form.control}
                    name='soDienThoaiLienLac'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Điện thoại liên lạc</FormLabel>
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
                            <FormLabel>Số lượng người ở</FormLabel>
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
                <div>
                    <h3 className='text-lg font-medium mb-2'>Phòng tháng còn trống</h3>
                    <Card>
                        <CardContent className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-4 min-h-36'>
                            {(availableRooms || []).map((room) => {
                                const isSelected = selectedRooms.some(
                                    (r) => r.MaPhong === room.MaPhong && r.Nam === room.Nam && r.Thang === room.Thang
                                )
                                return (
                                    <Button
                                        key={`${room.MaPhong}-${room.Nam}-${room.Thang}`}
                                        type='button'
                                        variant={isSelected ? 'default' : 'outline'}
                                        className={`w-full ${isSelected ? 'bg-primary text-primary-foreground' : ''}`}
                                        onClick={() => toggleRoomSelection(room)}
                                    >
                                        Phòng {room.MaPhong}
                                        <br />
                                        {room.Thang}/{room.Nam}
                                    </Button>
                                )
                            })}
                        </CardContent>
                    </Card>
                </div>
                <Button type='submit' disabled={isLoading || selectedRooms.length === 0}>
                    {isLoading ? 'Creating Order...' : 'Tạo đơn'}
                </Button>
            </form>
        </Form>
    )
}
