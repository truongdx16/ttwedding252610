// Google Apps Script để xử lý dữ liệu từ wedding website
// Hướng dẫn sử dụng:
// 1. Tạo Google Sheet mới
// 2. Mở Apps Script (Extensions > Apps Script)
// 3. Paste code này vào
// 4. Deploy as web app với quyền "Anyone"
// 5. Copy URL và sử dụng trong website

function doPost(e) {
  try {
    // Parse dữ liệu từ POST request
    const data = JSON.parse(e.postData.contents);

    // Lấy Google Sheet
    const sheet = SpreadsheetApp.getActiveSheet();

    // Thêm header nếu sheet trống
    if (sheet.getLastRow() === 0) {
      sheet
        .getRange(1, 1, 1, 6)
        .setValues([
          ["Timestamp", "Side", "Full Name", "Wish", "Status", "People"],
        ]);
    }

    // Thêm dữ liệu mới
    const timestamp = new Date(data.timestamp);
    const rowData = [
      timestamp,
      data.side,
      data.fullname,
      data.wish,
      data.status,
      data.people,
    ];

    sheet.appendRow(rowData);

    // Trả về response thành công
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: "Data saved successfully" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Trả về lỗi nếu có
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Test function để kiểm tra script hoạt động
  return ContentService.createTextOutput(
    JSON.stringify({ message: "Google Apps Script is working!" })
  ).setMimeType(ContentService.MimeType.JSON);
}
