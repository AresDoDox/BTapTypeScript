// import {NhanVien} from './NhanVien';

export class DanhSachNhanVien{
    public DanhSachNV: Array<any> = [];
    constructor(){

    }
    public ThemNhanVien(NhanVienThem: any){
        this.DanhSachNV.push(NhanVienThem);
    }
}