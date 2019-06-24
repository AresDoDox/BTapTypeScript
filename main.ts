import {NhanVien} from './NhanVien';
import {DanhSachNhanVien} from './DanhSachNhanVien';

let dsnv = new DanhSachNhanVien();

function ThemNhanVien(){
    let manv:number = parseInt((<HTMLInputElement>document.getElementById("manv")).value);
    let hoten:string =(<HTMLInputElement>document.getElementById("hoten")).value;
    let tuoi:number = parseInt((<HTMLInputElement>document.getElementById("tuoi")).value);
    let diachi:string =(<HTMLInputElement>document.getElementById("diachi")).value;
    let loainv:string = "nvsx";
    let cacLoainv: any = document.getElementsByName("loainv");
    for (let i = 0; i < cacLoainv.length; i++){
        if (cacLoainv[i].checked === true){
            loainv = cacLoainv[i].value;
        }
    }
    let nhanvien: any;
    let luong: number = 0;
    switch(loainv){
        case 'nvsx': {        
            luong = parseInt((<HTMLInputElement>document.getElementById("slsp")).value) * 20000;
        }
        break;
        case 'nvcn': {
            luong = parseInt((<HTMLInputElement>document.getElementById("snc")).value) * 50000;
        }
        break;
        case 'nvql':{
            let lcb:number = parseInt((<HTMLInputElement>document.getElementById("lcb")).value);
            let hsl:number = parseFloat((<HTMLInputElement>document.getElementById("hsl")).value);
            luong = lcb*hsl;
        }
        break;
    }
    nhanvien = new NhanVien(manv, hoten, tuoi, diachi, loainv, luong);
    dsnv.ThemNhanVien(nhanvien);
    HienThiDanhSachNhanVien();
    document.getElementById("tbDanhSachNhanVien").style.display = 'block';
}

function HienThiDanhSachNhanVien(){
    let tblDanhSachNhanVien = document.getElementById("tbDanhSachNhanVien");
    if(tblDanhSachNhanVien.style.display == ''){
        tblDanhSachNhanVien.style.display = 'block';
    }else if(tblDanhSachNhanVien.style.display == 'block'){
        tblDanhSachNhanVien.style.display = 'none';
    }else{
        tblDanhSachNhanVien.style.display = 'block'
    }
    if(dsnv.DanhSachNV.length>0){
        tblDanhSachNhanVien.innerHTML = `
        <tr>
            <th>Mã NV</th>
            <th>Họ Tên</th>
            <th>Tuổi</th>
            <th>Địa Chỉ</th>
            <th>Loại NV</th>
            <th>Lương</th>
        </tr>
        `;
        for(let nv of  dsnv.DanhSachNV){
            let tdMaNV:any = TaoTD('MaNV', nv.manv);
            let tdHoTen:any = TaoTD('HoTen', nv.hoten);
            let tdTuoi:any = TaoTD('Tuoi', nv.tuoi);
            let tdDiaChi:any = TaoTD('DiaChi', nv.diachi);
            let tdLoaiNV:any = TaoTD('LoaiNV', nv.loainv);
            let tdLuong: any = TaoTD('LuongNV', nv.luong);
            //tạo tr
            let trNhanVien = document.createElement('tr');
            trNhanVien.append(tdMaNV);
            trNhanVien.append(tdHoTen);
            trNhanVien.append(tdTuoi);
            trNhanVien.append(tdDiaChi);
            trNhanVien.append(tdLoaiNV);
            trNhanVien.append(tdLuong);
            tblDanhSachNhanVien.append(trNhanVien);
        }
    }else{
        tblDanhSachNhanVien.innerHTML = `Không có nhân viên nào!!!!`
    }
   
}

function TaoTD(className, value){
    let td = document.createElement('td');
    td.className = className;
    td.innerHTML = value;
    return td;
}



// Button
let themnv = document.getElementById('themnv');
let hienthidsnv = document.getElementById('hienthidsnv');
let xemTongLuong = document.getElementById('xemTongLuong');
let luongmax = document.getElementById('luongmax');
let luongmin = document.getElementById('luongmin');
let searchNV = document.getElementById('searchNV');

themnv.addEventListener('click', ThemNhanVien);
hienthidsnv.addEventListener('click', HienThiDanhSachNhanVien);
xemTongLuong.addEventListener('click', XemTongLuong);
luongmax.addEventListener('click', XemNVLuongMax);
luongmin.addEventListener('click', XemNVLuongMin);
searchNV.addEventListener('click', searchNhanVien)

//Radio Box
let loainv: any = document.getElementsByName("loainv");
let formThem = document.getElementById('form-them');
for(let checkloai of loainv){
    checkloai.addEventListener('change', showForm );
}
function showForm(){
    for (let loai of loainv){
        if (loai.checked == true){
            switch(loai.value){
                case 'nvsx': {
                    formThem.innerHTML = `<label for="">so san pham</label>
                    <input type="number" name="slsp" id="slsp" value="0"/>`
                }
                break;
                case 'nvcn':{
                    formThem.innerHTML = `<label for="">so ngay cong</label>
                    <input type="number" name="snc" id="snc" value="0"/>`
                }
                break;
                case 'nvql':{
                    formThem.innerHTML = `<label for="">luong co ban</label>
                    <input type="number" name="lcb" id="lcb" value="0"/>
                    <label for="">he so luong</label>
                    <input type="number" name="hsl" id="hsl" value="0"/>`
                }
                break;
            }
        }
    }
}

//Xem tông lương
function XemTongLuong(){
    let tongluong: number = 0;
    for(let nv of  dsnv.DanhSachNV){
        tongluong += nv.luong;
    }
    document.getElementById('nvLuongMinMax').innerHTML = ``;
    document.getElementById('tongluong').innerHTML = `Tổng lương: ${tongluong}`;
}

// //NVLuongMax
function XemNVLuongMax(){
    document.getElementById('tongluong').innerHTML = ``;
    let danhsachNV = dsnv.DanhSachNV;
    let luongMax = danhsachNV.sort((a,b) => b.luong - a.luong);
    let nvLuongMax = danhsachNV.filter( nhanvien => nhanvien.luong == luongMax[0].luong);
    let listNV = document.getElementById('nvLuongMinMax');
    let listNVul = document.createElement('ul');
    
    if(danhsachNV.length == 0){
        listNV.innerHTML = 'Không có nhân viên nào trong danh sách';
    }   
    if(danhsachNV.length == 1){
        listNV.innerHTML = '';
        let elemNV = document.createElement('li');
        elemNV.innerHTML = danhsachNV[0].hoten;
        listNVul.append(elemNV);
        listNV.append('Danh sách nhân viên có lương cao nhất');
        listNV.append(listNVul);
    }
    if(danhsachNV.length > 1){
        for(let nv of  nvLuongMax){
            let elemNV = document.createElement('li');
            elemNV.innerHTML = nv.hoten;
            listNVul.append(elemNV); 
        }
        listNV.innerHTML = '';
        listNV.append('Danh sách nhân viên có lương cao nhất');
        listNV.append(listNVul);
    }
}

// //NVLuongMin
function XemNVLuongMin(){
    document.getElementById('tongluong').innerHTML = ``;
    let danhsachNV = dsnv.DanhSachNV;
    let luongMin = danhsachNV.sort((a,b) => a.luong - b.luong);
    let nvLuongMin = danhsachNV.filter( nhanvien => nhanvien.luong == luongMin[0].luong);
    let listNV = document.getElementById('nvLuongMinMax');
    let listNVul = document.createElement('ul');
    
    if(danhsachNV.length == 0){
        listNV.innerHTML = 'Không có nhân viên nào trong danh sách';
    }   
    if(danhsachNV.length == 1){
        listNV.innerHTML = '';
        let elemNV = document.createElement('li');
        elemNV.innerHTML = danhsachNV[0].hoten;
        listNVul.append(elemNV);
        listNV.append('Danh sách nhân viên có lương thấp nhất');
        listNV.append(listNVul);
    }
    if(danhsachNV.length > 1){
        for(let nv of  nvLuongMin){
            let elemNV = document.createElement('li');
            elemNV.innerHTML = nv.hoten;
            listNVul.append(elemNV); 
        }
        listNV.innerHTML = '';
        listNV.append('Danh sách nhân viên có lương thấp nhất');
        listNV.append(listNVul);
    }
}

// Tim nhân viên
function searchNhanVien(){
    let keymanv:string = (<HTMLInputElement>document.getElementById("keymanv")).value;
    let infoNV = document.getElementById('infoNV');
    if(keymanv == ''){
        infoNV.innerHTML = 'Vui lòng nhập mã nhân viên';
    }

    for(let nv of dsnv.DanhSachNV){
        if(nv.manv == keymanv){
            infoNV.innerHTML = `
            <p>Mã NV: ${nv.manv}</p>
            <p>Họ tên: ${nv.hoten}</p>
            <p>Tuổi: ${nv.tuoi}</p>
            <p>Địa chỉ: ${nv.diachi}</p>
            <p>Loại nhân viên: ${nv.loainv}</p>
            <p>Lương: ${nv.luong}</p>
            `
        }
    }
}