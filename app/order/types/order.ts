import { TinhTrangPhongThang } from '@/common/enums/monthly-room.enum'

export interface PhongThang {
    MaPhong: number
    Nam: number
    Thang: number
    TinhTrang?: TinhTrangPhongThang
    GiaDien?: number
    GiaNuoc?: number
    GiaRac?: number
    GiaWifi?: number
}

export interface PhongThangKey {
    maPhong: number
    nam: number
    thang: number
}

export interface CreateOrderData {
    soDienThoaiLienLac: string
    soLuongNguoiO: number
    phongThangKeys: PhongThangKey[]
}

export interface Order {
    SoDienThoaiLienLac: number
    SoLuongNguoiO: number
    MaDon: number
    ThoiGianTaoDon: string
}

export interface OrderDetails extends Order {
    HoaDons: {
        SoThuTu: number
        TongTien: number
    }[]
}
