import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Room } from '../types/room'

interface RoomCardProps {
    room: Room
}

export default function RoomCard({ room }: RoomCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{room.TenPhong}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>
                    <strong>Mã phòng:</strong> {room.MaPhong}
                </p>
                <p>
                    <strong>Số người tối đa:</strong> {room.SoNguoiToiDa}
                </p>
                <p>
                    <strong>Diện tích:</strong> {room.DienTich} m²
                </p>
                <p>
                    <strong>Số Tầng:</strong> {room.SoTang}
                </p>
                <p>
                    <strong>Mô tả:</strong> {room.MoTa}
                </p>
            </CardContent>
        </Card>
    )
}
