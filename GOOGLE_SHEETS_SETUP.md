# Hướng dẫn Setup Google Sheets cho Wedding Website

## Bước 1: Tạo Google Sheet

1. Truy cập [Google Sheets](https://sheets.google.com)
2. Tạo một sheet mới
3. Đặt tên sheet (ví dụ: "Wedding RSVP Data")

## Bước 2: Tạo Google Apps Script

1. Trong Google Sheet, chọn **Extensions** > **Apps Script**
2. Xóa code mặc định và paste code từ file `google-apps-script.js`
3. Lưu project (Ctrl+S) và đặt tên (ví dụ: "Wedding RSVP Handler")

## Bước 3: Deploy Web App

1. Trong Apps Script editor, chọn **Deploy** > **New deployment**
2. Chọn type: **Web app**
3. Cấu hình:
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. **Copy URL** được tạo ra (dạng: `https://script.google.com/macros/s/.../exec`)

## Bước 4: Cập nhật Website

1. Mở file `main.js`
2. Tìm dòng: `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';`
3. Thay thế `YOUR_GOOGLE_APPS_SCRIPT_URL` bằng URL đã copy ở bước 3

## Bước 5: Test

1. Mở website và thử submit form
2. Kiểm tra Google Sheet để xem dữ liệu đã được lưu chưa
3. Dữ liệu sẽ có các cột: Timestamp, Side, Full Name, Wish, Status, People

## Lưu ý quan trọng:

- URL Google Apps Script có thể thay đổi khi bạn update code
- Nếu có lỗi CORS, có thể cần enable CORS trong Apps Script
- Đảm bảo Google Sheet có quyền chỉnh sửa cho script

## Troubleshooting:

- **Lỗi 403**: Kiểm tra lại quyền access của web app
- **Lỗi CORS**: Thêm `e.setMimeType(ContentService.MimeType.JSON);` vào đầu function
- **Không lưu được**: Kiểm tra URL có đúng không và script đã deploy chưa
