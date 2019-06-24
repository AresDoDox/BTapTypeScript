"use strict";
exports.__esModule = true;
var NhanVien_1 = require("./NhanVien");
var DanhSachNhanVien_1 = require("./DanhSachNhanVien");
var dsnv = new DanhSachNhanVien_1.DanhSachNhanVien();
function ThemNhanVien() {
    var manv = parseInt(document.getElementById("manv").value);
    var hoten = document.getElementById("hoten").value;
    var tuoi = parseInt(document.getElementById("tuoi").value);
    var diachi = document.getElementById("diachi").value;
    var loainv = "nvsx";
    var cacLoainv = document.getElementsByName("loainv");
    for (var i = 0; i < cacLoainv.length; i++) {
        if (cacLoainv[i].checked === true) {
            loainv = cacLoainv[i].value;
        }
    }
    var nhanvien;
    var luong = 0;
    switch (loainv) {
        case 'nvsx':
            {
                luong = parseInt(document.getElementById("slsp").value) * 20000;
            }
            break;
        case 'nvcn':
            {
                luong = parseInt(document.getElementById("snc").value) * 50000;
            }
            break;
        case 'nvql':
            {
                var lcb = parseInt(document.getElementById("lcb").value);
                var hsl = parseFloat(document.getElementById("hsl").value);
                luong = lcb * hsl;
            }
            break;
    }
    nhanvien = new NhanVien_1.NhanVien(manv, hoten, tuoi, diachi, loainv, luong);
    dsnv.ThemNhanVien(nhanvien);
    HienThiDanhSachNhanVien();
    document.getElementById("tbDanhSachNhanVien").style.display = 'block';
}
function HienThiDanhSachNhanVien() {
    var tblDanhSachNhanVien = document.getElementById("tbDanhSachNhanVien");
    if (tblDanhSachNhanVien.style.display == '') {
        tblDanhSachNhanVien.style.display = 'block';
    }
    else if (tblDanhSachNhanVien.style.display == 'block') {
        tblDanhSachNhanVien.style.display = 'none';
    }
    else {
        tblDanhSachNhanVien.style.display = 'block';
    }
    if (dsnv.DanhSachNV.length > 0) {
        tblDanhSachNhanVien.innerHTML = "\n        <tr>\n            <th>M\u00E3 NV</th>\n            <th>H\u1ECD T\u00EAn</th>\n            <th>Tu\u1ED5i</th>\n            <th>\u0110\u1ECBa Ch\u1EC9</th>\n            <th>Lo\u1EA1i NV</th>\n            <th>L\u01B0\u01A1ng</th>\n        </tr>\n        ";
        for (var _i = 0, _a = dsnv.DanhSachNV; _i < _a.length; _i++) {
            var nv = _a[_i];
            var tdMaNV = TaoTD('MaNV', nv.manv);
            var tdHoTen = TaoTD('HoTen', nv.hoten);
            var tdTuoi = TaoTD('Tuoi', nv.tuoi);
            var tdDiaChi = TaoTD('DiaChi', nv.diachi);
            var tdLoaiNV = TaoTD('LoaiNV', nv.loainv);
            var tdLuong = TaoTD('LuongNV', nv.luong);
            //tạo tr
            var trNhanVien = document.createElement('tr');
            trNhanVien.append(tdMaNV);
            trNhanVien.append(tdHoTen);
            trNhanVien.append(tdTuoi);
            trNhanVien.append(tdDiaChi);
            trNhanVien.append(tdLoaiNV);
            trNhanVien.append(tdLuong);
            tblDanhSachNhanVien.append(trNhanVien);
        }
    }
    else {
        tblDanhSachNhanVien.innerHTML = "Kh\u00F4ng c\u00F3 nh\u00E2n vi\u00EAn n\u00E0o!!!!";
    }
}
function TaoTD(className, value) {
    var td = document.createElement('td');
    td.className = className;
    td.innerHTML = value;
    return td;
}
// Button
var themnv = document.getElementById('themnv');
var hienthidsnv = document.getElementById('hienthidsnv');
var xemTongLuong = document.getElementById('xemTongLuong');
var luongmax = document.getElementById('luongmax');
var luongmin = document.getElementById('luongmin');
var searchNV = document.getElementById('searchNV');
themnv.addEventListener('click', ThemNhanVien);
hienthidsnv.addEventListener('click', HienThiDanhSachNhanVien);
xemTongLuong.addEventListener('click', XemTongLuong);
luongmax.addEventListener('click', XemNVLuongMax);
luongmin.addEventListener('click', XemNVLuongMin);
searchNV.addEventListener('click', searchNhanVien);
//Radio Box
var loainv = document.getElementsByName("loainv");
var formThem = document.getElementById('form-them');
for (var _i = 0, loainv_1 = loainv; _i < loainv_1.length; _i++) {
    var checkloai = loainv_1[_i];
    checkloai.addEventListener('change', showForm);
}
function showForm() {
    for (var _i = 0, loainv_2 = loainv; _i < loainv_2.length; _i++) {
        var loai = loainv_2[_i];
        if (loai.checked == true) {
            switch (loai.value) {
                case 'nvsx':
                    {
                        formThem.innerHTML = "<label for=\"\">so san pham</label>\n                    <input type=\"number\" name=\"slsp\" id=\"slsp\" value=\"0\"/>";
                    }
                    break;
                case 'nvcn':
                    {
                        formThem.innerHTML = "<label for=\"\">so ngay cong</label>\n                    <input type=\"number\" name=\"snc\" id=\"snc\" value=\"0\"/>";
                    }
                    break;
                case 'nvql':
                    {
                        formThem.innerHTML = "<label for=\"\">luong co ban</label>\n                    <input type=\"number\" name=\"lcb\" id=\"lcb\" value=\"0\"/>\n                    <label for=\"\">he so luong</label>\n                    <input type=\"number\" name=\"hsl\" id=\"hsl\" value=\"0\"/>";
                    }
                    break;
            }
        }
    }
}
//Xem tông lương
function XemTongLuong() {
    var tongluong = 0;
    for (var _i = 0, _a = dsnv.DanhSachNV; _i < _a.length; _i++) {
        var nv = _a[_i];
        tongluong += nv.luong;
    }
    document.getElementById('nvLuongMinMax').innerHTML = "";
    document.getElementById('tongluong').innerHTML = "T\u1ED5ng l\u01B0\u01A1ng: " + tongluong;
}
// //NVLuongMax
function XemNVLuongMax() {
    document.getElementById('tongluong').innerHTML = "";
    var danhsachNV = dsnv.DanhSachNV;
    var luongMax = danhsachNV.sort(function (a, b) { return b.luong - a.luong; });
    var nvLuongMax = danhsachNV.filter(function (nhanvien) { return nhanvien.luong == luongMax[0].luong; });
    var listNV = document.getElementById('nvLuongMinMax');
    var listNVul = document.createElement('ul');
    if (danhsachNV.length == 0) {
        listNV.innerHTML = 'Không có nhân viên nào trong danh sách';
    }
    if (danhsachNV.length == 1) {
        listNV.innerHTML = '';
        var elemNV = document.createElement('li');
        elemNV.innerHTML = danhsachNV[0].hoten;
        listNVul.append(elemNV);
        listNV.append('Danh sách nhân viên có lương cao nhất');
        listNV.append(listNVul);
    }
    if (danhsachNV.length > 1) {
        for (var _i = 0, nvLuongMax_1 = nvLuongMax; _i < nvLuongMax_1.length; _i++) {
            var nv = nvLuongMax_1[_i];
            var elemNV = document.createElement('li');
            elemNV.innerHTML = nv.hoten;
            listNVul.append(elemNV);
        }
        listNV.innerHTML = '';
        listNV.append('Danh sách nhân viên có lương cao nhất');
        listNV.append(listNVul);
    }
}
// //NVLuongMin
function XemNVLuongMin() {
    document.getElementById('tongluong').innerHTML = "";
    var danhsachNV = dsnv.DanhSachNV;
    var luongMin = danhsachNV.sort(function (a, b) { return a.luong - b.luong; });
    var nvLuongMin = danhsachNV.filter(function (nhanvien) { return nhanvien.luong == luongMin[0].luong; });
    var listNV = document.getElementById('nvLuongMinMax');
    var listNVul = document.createElement('ul');
    if (danhsachNV.length == 0) {
        listNV.innerHTML = 'Không có nhân viên nào trong danh sách';
    }
    if (danhsachNV.length == 1) {
        listNV.innerHTML = '';
        var elemNV = document.createElement('li');
        elemNV.innerHTML = danhsachNV[0].hoten;
        listNVul.append(elemNV);
        listNV.append('Danh sách nhân viên có lương thấp nhất');
        listNV.append(listNVul);
    }
    if (danhsachNV.length > 1) {
        for (var _i = 0, nvLuongMin_1 = nvLuongMin; _i < nvLuongMin_1.length; _i++) {
            var nv = nvLuongMin_1[_i];
            var elemNV = document.createElement('li');
            elemNV.innerHTML = nv.hoten;
            listNVul.append(elemNV);
        }
        listNV.innerHTML = '';
        listNV.append('Danh sách nhân viên có lương thấp nhất');
        listNV.append(listNVul);
    }
}
// Tim nhân viên
function searchNhanVien() {
    var keymanv = document.getElementById("keymanv").value;
    var infoNV = document.getElementById('infoNV');
    if (keymanv == '') {
        infoNV.innerHTML = 'Vui lòng nhập mã nhân viên';
    }
    for (var _i = 0, _a = dsnv.DanhSachNV; _i < _a.length; _i++) {
        var nv = _a[_i];
        if (nv.manv == keymanv) {
            infoNV.innerHTML = "\n            <p>M\u00E3 NV: " + nv.manv + "</p>\n            <p>H\u1ECD t\u00EAn: " + nv.hoten + "</p>\n            <p>Tu\u1ED5i: " + nv.tuoi + "</p>\n            <p>\u0110\u1ECBa ch\u1EC9: " + nv.diachi + "</p>\n            <p>Lo\u1EA1i nh\u00E2n vi\u00EAn: " + nv.loainv + "</p>\n            <p>L\u01B0\u01A1ng: " + nv.luong + "</p>\n            ";
        }
    }
}
