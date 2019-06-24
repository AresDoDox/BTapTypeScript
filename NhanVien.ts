export class NhanVien{
    public manv: number;
    public hoten: string;
    public tuoi: number;
    public diachi: string;
    public loainv: string;
    public luong: number;

    constructor(manv, hoten, tuoi, diachi, loainv, luong){
        this.manv = manv;
        this.hoten = hoten;
        this.tuoi = tuoi;
        this.diachi = diachi;
        this.loainv = loainv;
        this.luong = luong
    }
}