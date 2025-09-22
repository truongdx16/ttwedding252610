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
  try {
    // Kiểm tra nếu có callback parameter (JSONP)
    const callback = e.parameter.callback;
    const data = e.parameter.data;

    if (callback && data) {
      // Xử lý JSONP request
      const jsonData = JSON.parse(data);

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
      const timestamp = new Date(jsonData.timestamp);
      const rowData = [
        timestamp,
        jsonData.side,
        jsonData.fullname,
        jsonData.wish,
        jsonData.status,
        jsonData.people,
      ];

      sheet.appendRow(rowData);

      // Trả về JSONP response
      const result = { success: true, message: "Data saved successfully" };
      return ContentService.createTextOutput(
        callback + "(" + JSON.stringify(result) + ")"
      ).setMimeType(ContentService.MimeType.JAVASCRIPT);
    }

    // Test function để kiểm tra script hoạt động
    return ContentService.createTextOutput(
      JSON.stringify({ message: "Google Apps Script is working!" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    const callback = e.parameter.callback;
    if (callback) {
      const result = { success: false, error: error.toString() };
      return ContentService.createTextOutput(
        callback + "(" + JSON.stringify(result) + ")"
      ).setMimeType(ContentService.MimeType.JAVASCRIPT);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
