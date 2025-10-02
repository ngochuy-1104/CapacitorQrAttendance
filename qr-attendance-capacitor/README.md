# QR Attendance (Vite + React + Capacitor + ZXing)

Ứng dụng điểm danh bằng cách quét QR có định dạng `ATTEND:<MSSV>`.
- Quét QR bằng camera (ZXing).
- Lưu lịch sử vào `localStorage` (đơn giản, chạy ổn trên WebView).
- Hiển thị lịch sử, **Xuất CSV**, **Reset** danh sách.
- Tích hợp Capacitor để build Android/iOS/Web (native chỉ cần thêm quyền CAMERA).

## 1) Cài đặt & chạy dev (Web)
```bash
npm i
npm run dev
# mở http://localhost:5173
```

> Nếu quét không được trên laptop, hãy dùng **điện thoại** mở trang dev theo IP máy bạn, ví dụ: `http://192.168.1.10:5173` (cần chung mạng LAN) và **cấp quyền camera**.

## 2) Build Web (tạo thư mục dist)
```bash
npm run build
npm run preview
```

## 3) Tích hợp Capacitor
```bash
npx cap init "QR Attendance" "com.example.qrattendance"
# đã có sẵn capacitor.config.js trong project
```

### Thêm nền tảng Android
```bash
npx cap add android
# Quan trọng: mở android/app/src/main/AndroidManifest.xml và thêm:
# <uses-permission android:name="android.permission.CAMERA" />
npm run build
npx cap copy
npx cap open android   # mở Android Studio để Run trên máy ảo/thiết bị
```

### (Tuỳ chọn) iOS
```bash
# cần máy Mac + Xcode
npx cap add ios
npm run build
npx cap copy
npx cap open ios
```

## 4) Định dạng QR
Mã hợp lệ phải có dạng: `ATTEND:<MSSV>` (chỉ chữ và số). Ví dụ nội dung QR: `ATTEND:21T1023456`.

## 5) Ghi chú
- App dùng `localStorage` để đơn giản. Nếu thích, bạn có thể thay bằng `@capacitor/preferences` dễ dàng.
- Nếu WebView/Browser không mở camera, kiểm tra quyền camera trong Settings (Android/iOS) hoặc thử Chrome/Edge.
- Khi chạy dev qua IP LAN, một số trình duyệt yêu cầu HTTPS để dùng camera. Có thể build APK để test trực tiếp.

## 6) Kiến trúc
- `src/components/Scanner.jsx`: quét QR bằng `@zxing/library`.
- `src/components/History.jsx`: hiển thị, export CSV, reset.
- `src/lib/storage.js`: lưu lịch sử (localStorage).
- `src/lib/csv.js`: xuất CSV.
- `capacitor.config.js`: cấu hình Capacitor.
```



## Khắc phục màn hình trắng
- Tuyệt đối **không** mở file `index.html` trực tiếp bằng double-click → hãy dùng:
  - Dev: `npm run dev` (`http://localhost:5173`) hoặc
  - Preview: `npm run build && npm run preview` (`http://localhost:4173`)
- Đã cấu hình `base: './'` và `./src/main.jsx` để chạy tốt trong Capacitor/Android.
- Nếu vẫn trắng, mở **Console** xem lỗi và gửi mình thông báo lỗi để hỗ trợ nhanh.
