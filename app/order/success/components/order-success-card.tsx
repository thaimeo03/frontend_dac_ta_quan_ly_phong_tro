import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { OrderDetails } from '../../types/order'

interface OrderSuccessCardProps {
    orderDetails: OrderDetails
}

export default function OrderSuccessCard({ orderDetails }: OrderSuccessCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
    }

    return (
        <Card className='w-full max-w-md mx-auto'>
            <CardHeader>
                <CardTitle>Chi tiết đơn</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
                <div className='flex justify-between'>
                    <span className='font-medium'>Mã đơn:</span>
                    <span>{orderDetails.MaDon}</span>
                </div>
                <div className='flex justify-between'>
                    <span className='font-medium'>Điện thoại liên lạc:</span>
                    <span>{orderDetails.SoDienThoaiLienLac}</span>
                </div>
                <div className='flex justify-between'>
                    <span className='font-medium'>Số người:</span>
                    <span>{orderDetails.SoLuongNguoiO}</span>
                </div>
                <div className='flex justify-between'>
                    <span className='font-medium'>Thời gian tạo đơn:</span>
                    <span>{formatDate(orderDetails.ThoiGianTaoDon)}</span>
                </div>
                <div className='flex justify-between'>
                    <span className='font-medium'>Tổng tiền:</span>
                    <span className='font-bold text-green-600'>
                        {formatCurrency(orderDetails.HoaDons.reduce((total, item) => total + item.TongTien, 0))}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}
