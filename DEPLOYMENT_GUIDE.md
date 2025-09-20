# Hướng dẫn chọn loại Deployment trong Google Apps Script

## Khi bạn click "Deploy" > "New deployment", bạn sẽ thấy các lựa chọn:

### 1. **Web App** (Khuyến nghị cho trường hợp này)

- **Khi nào dùng**: Khi bạn muốn website gọi trực tiếp đến script
- **Cách hoạt động**: Website gửi HTTP request đến script
- **Cấu hình**:
  - Execute as: **Me (your-email@gmail.com)**
  - Who has access: **Anyone** (quan trọng!)
- **Ưu điểm**: Đơn giản, không cần authentication
- **Nhược điểm**: URL có thể thay đổi khi update

### 2. **API Executable**

- **Khi nào dùng**: Khi bạn muốn tích hợp với ứng dụng khác
- **Cách hoạt động**: Cần API key và authentication
- **Cấu hình**: Phức tạp hơn, cần setup OAuth
- **Ưu điểm**: Bảo mật cao, URL ổn định
- **Nhược điểm**: Phức tạp setup

### 3. **Library**

- **Khi nào dùng**: Khi bạn muốn tái sử dụng code trong script khác
- **Cách hoạt động**: Import vào script khác
- **Không phù hợp**: Cho trường hợp website gọi trực tiếp

## 🎯 **KHUYẾN NGHỊ CHO WEDDING WEBSITE:**

**Chọn "Web App"** với cấu hình:

- **Execute as**: Me (your-email@gmail.com)
- **Who has access**: Anyone

## 📋 **Các bước cụ thể:**

1. **Trong Apps Script Editor:**

   - Click **Deploy** > **New deployment**
   - Click icon ⚙️ (Settings) bên cạnh "Type"
   - Chọn **Web app**

2. **Cấu hình:**

   - **Execute as**: Chọn **Me (your-email@gmail.com)**
   - **Who has access**: Chọn **Anyone** (rất quan trọng!)

3. **Deploy:**
   - Click **Deploy**
   - Copy URL được tạo ra

## ⚠️ **Lưu ý quan trọng:**

- **Phải chọn "Anyone"** nếu không website sẽ không thể gọi được
- **Execute as "Me"** để script có quyền ghi vào Google Sheet của bạn
- URL sẽ có dạng: `https://script.google.com/macros/s/SCRIPT_ID/exec`

## 🔧 **Nếu gặp lỗi:**

- **Lỗi 403**: Kiểm tra lại "Who has access" phải là "Anyone"
- **Lỗi CORS**: Script đã được cấu hình đúng, không cần thay đổi gì
- **Không lưu được**: Kiểm tra URL có đúng không
