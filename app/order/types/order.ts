export interface PhongThang {
    maPhong: number
    nam: number
    thang: number
    orderStatus?: boolean
}

export interface CreateOrderData {
    soDienThoaiLienLac: string
    soLuongNguoiO: number
    phongThangKeys: PhongThang[]
}
