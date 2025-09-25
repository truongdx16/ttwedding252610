# Hướng dẫn khắc phục vấn đề nhạc không tự động phát

## Vấn đề phổ biến

Trình duyệt hiện đại thường chặn autoplay để bảo vệ người dùng khỏi âm thanh không mong muốn. Đây là hành vi bình thường và có thể khắc phục.

## Giải pháp đã tích hợp

### 1. **Chiến lược Muted Autoplay (Mới)**

- **Bypass autoplay policy**: Phát nhạc với `muted=true` trước, sau đó tắt muted
- **Tăng volume dần**: Sau khi phát thành công, tăng volume lên 0.7
- **Tỷ lệ thành công cao**: Hầu hết trình duyệt cho phép muted autoplay

### 2. **Chiến lược Normal Autoplay**

- Thử phát nhạc bình thường với volume đầy đủ
- Hoạt động trên một số trình duyệt và cài đặt

### 3. **Chiến lược User Interaction**

- Khi cả hai chiến lược trên thất bại, chờ người dùng tương tác
- Tự động thử phát lại khi người dùng click/touch/keypress

### 4. **Multiple Timing Attempts**

- Thử phát nhạc ngay khi DOM ready
- Thử lại khi window load hoàn tất
- Tăng cơ hội thành công với nhiều lần thử

## Cách khắc phục cho người dùng

### **Trên Desktop:**

1. **Chrome/Edge**: Nhấn vào bất kỳ đâu trên trang
2. **Firefox**: Click vào trang hoặc nhấn phím bất kỳ
3. **Safari**: Click vào trang và cho phép autoplay

### **Trên Mobile:**

1. **iOS Safari**: Chạm vào trang
2. **Android Chrome**: Chạm vào trang
3. **Các app khác**: Chạm vào trang hoặc scroll

### **Cài đặt trình duyệt:**

#### Chrome:

1. Vào `chrome://settings/content/sound`
2. Thêm domain vào "Allow" list
3. Hoặc vào `chrome://settings/content/autoplay` và chọn "Allow"

#### Firefox:

1. Vào `about:preferences#privacy`
2. Tìm "Autoplay" và chọn "Allow Audio and Video"

#### Safari:

1. Safari > Preferences > Websites > Auto-Play
2. Chọn "Allow All Auto-Play" cho domain

## Kiểm tra trạng thái nhạc

### **Console Logs:**

Mở Developer Tools (F12) và xem console để kiểm tra:

- `"Music started successfully"` - Nhạc phát thành công
- `"Autoplay blocked"` - Nhạc bị chặn, đang chờ tương tác
- `"Music started after user interaction"` - Nhạc phát sau khi tương tác

### **Visual Indicators:**

- **Nút nhạc có dấu gạch chéo**: Nhạc đang tắt
- **Nút nhạc không có dấu gạch chéo**: Nhạc đang phát

## Tắt nhạc tự động

Nếu không muốn nhạc tự động phát, thêm `music=false` vào URL:

```
https://your-domain.com/index.html?guest=TênKhách&side=groom&music=false
```

## Troubleshooting nâng cao

### **Nếu vẫn không hoạt động:**

1. **Kiểm tra file audio:**

   - Đảm bảo file `audio/kodidien.mp3` tồn tại
   - Kiểm tra đường dẫn file

2. **Kiểm tra HTTPS:**

   - Một số trình duyệt yêu cầu HTTPS để phát audio
   - Đảm bảo trang web chạy trên HTTPS

3. **Kiểm tra quyền trình duyệt:**

   - Cho phép trang web phát âm thanh
   - Kiểm tra icon âm thanh trên thanh địa chỉ

4. **Test trên trình duyệt khác:**
   - Thử Chrome, Firefox, Safari
   - Kiểm tra trên cả desktop và mobile

### **Debug Code:**

Thêm vào console để debug:

```javascript
// Kiểm tra element audio
console.log(document.getElementById("bg-music"));

// Kiểm tra URL parameters
console.log(getUrlParameters());

// Test phát nhạc thủ công
document.getElementById("bg-music").play();
```

## Lưu ý quan trọng

1. **Autoplay Policy**: Đây là tính năng bảo mật của trình duyệt, không phải lỗi
2. **User Experience**: Người dùng chỉ cần click/touch một lần để kích hoạt
3. **Fallback**: Luôn có nút điều khiển thủ công
4. **Mobile Friendly**: Hoạt động tốt trên cả desktop và mobile

## Kết luận

Vấn đề nhạc không tự động phát là bình thường và đã được xử lý tự động. Người dùng chỉ cần tương tác với trang một lần để kích hoạt nhạc, sau đó nhạc sẽ tự động phát cho các lần truy cập tiếp theo.
