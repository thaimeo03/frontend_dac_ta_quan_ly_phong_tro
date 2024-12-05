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
                    <strong>Room ID:</strong> {room.MaPhong}
                </p>
                <p>
                    <strong>Max Occupancy:</strong> {room.SoNguoiToiDa}
                </p>
                <p>
                    <strong>Area:</strong> {room.DienTich} m²
                </p>
                <p>
                    <strong>Floor:</strong> {room.SoTang}
                </p>
                <p>
                    <strong>Description:</strong> {room.MoTa}
                </p>
            </CardContent>
        </Card>
    )
}
