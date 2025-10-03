cat > README.md <<'MD'

QR Attendance (PWA)  
Ứng dụng điểm danh bằng QR code. Quét mã dạng `ATTEND:<MSSV>`, lưu MSSV cùng thời gian quét vào localStorage, hiển thị lịch sử điểm danh. Có thể xuất CSV và reset danh sách.

Chạy local  
npm install  
npm i
npm run dev  

Build & deploy  
npm run build  
npx serve -s build  

Ghi chú:  
- Sử dụng thư viện @zxing/library để quét QR.  
- Dữ liệu điểm danh được lưu trong localStorage.  
- PWA hỗ trợ chạy offline, nhưng cần cấp quyền truy cập camera để quét QR.  
