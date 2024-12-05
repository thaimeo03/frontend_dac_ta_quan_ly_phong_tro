export interface Room {
    MaPhong: number
    TenPhong: string
    SoNguoiToiDa: number
    DienTich: number
    MoTa: string
    SoTang: number
}

export interface CreateRoomData {
    tenPhong: string
    soNguoiToiDa: number
    dienTich: number
    moTa: string
    soTang: number
    maLoaiPhong: number
    maViTri: number
}

export interface RoomType {
    MaLoaiPhong: number
    TenLoaiPhong: string
    DienTichMin: number
    DienTichMax: number
    MoTa: string
    GiaThue: number
}

export interface Location {
    MaDiaChi: number
    Tinh: string
    Quan: string
    Phuong: string
    SoNha: string
}
