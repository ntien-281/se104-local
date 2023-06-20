## Hướng dẫn chạy local app đồ án SE104
> Nhóm 14 Quản lý cửa hàng vàng bạc đá quý.

Danh sách thành viên:
- Lý Văn Nhật Tiến (21521525)
- Nguyễn Viết Công (21520657)
- Nguyễn Hùng Tuấn (21521633)
- Đinh Nguyên Minh Hải (21522031)
- Ma Seo Sầu (21522548)



### Hướng dẫn chạy app:
- Tiến hành các bước sau sau khi đã chạy server thành công.
- Sau khi pull code này từ github, tiến hành cài đặt cái module bằng `npm install`.
- Để app có thể kết nối với server, chắc chắn rằng đường dẫn `BASE_URL` trong file `src/api/axios.config.js` khớp với đường link của server.
- Chạy app bằng lệnh `npm run dev`.
- Copy đường dẫn của vite vào biến `FE_ORIGIN` trong file `.env` ở server.
- Truy cập vào đường dẫn của vite.

### ❗Tài khoản đăng nhập:
- Admin:
```
Tài khoản: admin
Mật khẩu: abc123
```

- Nhân viên:
```
Tài khoản: normal
Mật khẩu: abc123
```