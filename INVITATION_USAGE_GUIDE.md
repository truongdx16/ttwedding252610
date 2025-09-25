# Hướng dẫn sử dụng Thiệp mời Đám cưới

## Cách sử dụng URL Parameters

Trang web thiệp mời này hỗ trợ các tham số URL để cá nhân hóa trải nghiệm cho từng khách mời.

### Cú pháp URL

```
https://your-domain.com/index.html?guest=TênKháchMời&side=groom&music=true
```

### Các tham số hỗ trợ

#### 1. `guest` (Tên khách mời)

- **Mô tả**: Tên của khách mời
- **Ví dụ**: `guest=NguyenVanA`
- **Tác dụng**:
  - Hiển thị lời mời trang trọng và cá nhân hóa
  - Tự động điền tên vào form RSVP
  - Cập nhật tiêu đề trang với tên đầy đủ của cô dâu chú rể

#### 2. `side` (Phía tham dự)

- **Mô tả**: Phía mà khách mời thuộc về
- **Giá trị**:
  - `groom` - Nhà trai
  - `bride` - Nhà gái
- **Ví dụ**: `side=groom`
- **Tác dụng**: Tự động chọn phía tham dự trong form RSVP

#### 3. `music` (Tự động phát nhạc)

- **Mô tả**: Có tự động phát nhạc khi vào trang hay không
- **Giá trị**:
  - `true` (mặc định) - Tự động phát nhạc
  - `false` - Không tự động phát nhạc
- **Ví dụ**: `music=false`

### Ví dụ URL hoàn chỉnh

#### Cho khách mời nhà trai:

```
https://your-domain.com/index.html?guest=NguyenVanA&side=groom
```

#### Cho khách mời nhà gái:

```
https://your-domain.com/index.html?guest=TranThiB&side=bride
```

#### Cho khách mời không muốn nhạc tự động phát:

```
https://your-domain.com/index.html?guest=LeVanC&side=groom&music=false
```

### Cách tạo link cho từng khách mời

1. **Chuẩn bị danh sách khách mời** với thông tin:

   - Tên đầy đủ
   - Phía tham dự (nhà trai/gái)

2. **Tạo URL cá nhân hóa** cho mỗi khách mời:

   ```javascript
   // Ví dụ tạo link cho danh sách khách mời
   const guests = [
     { name: "Nguyen Van A", side: "groom" },
     { name: "Tran Thi B", side: "bride" },
     { name: "Le Van C", side: "groom" },
   ];

   guests.forEach((guest) => {
     const url = `https://your-domain.com/index.html?guest=${encodeURIComponent(
       guest.name
     )}&side=${guest.side}`;
     console.log(`${guest.name}: ${url}`);
   });
   ```

3. **Gửi link** cho từng khách mời qua:
   - Tin nhắn SMS
   - Email
   - Zalo/Facebook Messenger
   - QR Code

### Tính năng tự động

- ✅ **Nhạc tự động phát** khi vào trang (có thể tắt bằng `music=false`)
- ✅ **Tên khách mời tự động điền** vào form RSVP
- ✅ **Phía tham dự tự động chọn** dựa trên tham số `side`
- ✅ **Lời mời trang trọng** hiển thị tên khách mời với thiết kế đẹp mắt
- ✅ **Tiêu đề trang** được cập nhật với tên khách mời

### Lưu ý quan trọng

1. **Tên khách mời** sẽ được encode trong URL, hỗ trợ tiếng Việt có dấu
2. **Nhạc tự động phát** có thể bị trình duyệt chặn, khách mời có thể bấm nút để bật/tắt
3. **Form RSVP** vẫn có thể được chỉnh sửa thủ công nếu cần
4. **Tất cả dữ liệu** sẽ được lưu vào Google Sheets để quản lý

### Troubleshooting

**Nhạc không tự động phát:**

- Trình duyệt có thể chặn autoplay
- Khách mời cần tương tác với trang trước (click, scroll)
- Có thể bấm nút nhạc ở góc phải dưới để bật/tắt

**Tên khách mời không hiển thị đúng:**

- Kiểm tra URL có đúng format không
- Đảm bảo tên được encode đúng cách
- Refresh trang để load lại

**Phía tham dự không tự động chọn:**

- Kiểm tra giá trị `side` phải là `groom` hoặc `bride`
- Không phân biệt hoa thường
