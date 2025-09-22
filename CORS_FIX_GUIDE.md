# Hướng dẫn sửa lỗi CORS cho Google Sheets Integration

## Vấn đề

Lỗi CORS xảy ra khi website localhost (http://127.0.0.1:5500) cố gắng gửi request đến Google Apps Script.

## Giải pháp

### ✅ Giải pháp JSONP (Đã được implement)

**Đã cập nhật code để sử dụng JSONP thay vì fetch API, hoàn toàn tránh được lỗi CORS.**

### Bước 1: Cập nhật Google Apps Script

1. Mở Google Apps Script tại: https://script.google.com
2. Tìm project của bạn hoặc tạo mới
3. Thay thế code hiện tại bằng code trong file `google-apps-script.js` (đã được cập nhật để hỗ trợ JSONP)
4. **Quan trọng**: Deploy lại web app với cấu hình sau:
   - Execute as: "Me"
   - Who has access: "Anyone"

### Bước 2: Kiểm tra URL

Đảm bảo URL trong `main.js` đúng với URL từ Google Apps Script sau khi deploy.

### Bước 3: Test từ Google Apps Script

1. Mở Google Apps Script
2. Chạy function `doGet` để test
3. Kiểm tra URL test: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`

### Bước 4: Cách hoạt động của JSONP

JSONP hoạt động bằng cách:

1. Tạo một thẻ `<script>` động với URL chứa callback function
2. Google Apps Script trả về JavaScript code thay vì JSON
3. Browser thực thi code và gọi callback function
4. Hoàn toàn tránh được CORS vì không phải AJAX request

**Code đã được implement trong `main.js`:**

- Function `submitDataWithJSONP()` thay thế cho fetch API
- Tự động tạo callback function với tên ngẫu nhiên
- Xử lý response và cleanup sau khi hoàn thành

### Bước 5: Deploy lại Google Apps Script

1. Trong Google Apps Script, click "Deploy" > "New deployment"
2. Chọn type: "Web app"
3. Execute as: "Me"
4. Who has access: "Anyone"
5. Click "Deploy"
6. Copy URL mới và cập nhật vào `main.js`

## Lưu ý quan trọng

- Google Apps Script tự động xử lý CORS cho các request từ web
- Vấn đề thường xảy ra khi deploy không đúng cấu hình
- Đảm bảo "Who has access" được set là "Anyone"
- Nếu vẫn lỗi, thử deploy lại với URL mới

## Test

Sau khi hoàn thành các bước trên:

1. Mở website localhost
2. Điền form RSVP
3. Submit và kiểm tra console không còn lỗi CORS
4. Kiểm tra Google Sheet có dữ liệu mới không
