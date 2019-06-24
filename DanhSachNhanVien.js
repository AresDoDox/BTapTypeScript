"use strict";
// import {NhanVien} from './NhanVien';
exports.__esModule = true;
var DanhSachNhanVien = /** @class */ (function () {
    function DanhSachNhanVien() {
        this.DanhSachNV = [];
    }
    DanhSachNhanVien.prototype.ThemNhanVien = function (NhanVienThem) {
        this.DanhSachNV.push(NhanVienThem);
    };
    return DanhSachNhanVien;
}());
exports.DanhSachNhanVien = DanhSachNhanVien;
