// Google Apps Script để xử lý dữ liệu từ wedding website
// Hướng dẫn sử dụng:
// 1. Tạo Google Sheet mới
// 2. Mở Apps Script (Extensions > Apps Script)
// 3. Paste code này vào
// 4. Deploy as web app với quyền "Anyone"
// 5. Copy URL và sử dụng trong website

// Danh sách domain được phép
const ALLOWED_DOMAINS = [
  "sapxepdidamcuoidi.site",
  "www.sapxepdidamcuoidi.site",
  "localhost", // Cho testing local
  "127.0.0.1",
];

// Function để kiểm tra domain có được phép không
function isAllowedDomain(origin) {
  if (!origin) return false;

  try {
    const url = new URL(origin);
    return ALLOWED_DOMAINS.includes(url.hostname);
  } catch (e) {
    return false;
  }
}

// Function để log request và validate CORS
function logAndValidateRequest(e, requestType) {
  const timestamp = new Date().toISOString();
  const userAgent = e.parameter.userAgent || "Unknown";
  const origin = e.parameter.origin || "Unknown";

  // Log request details
  console.log(`${requestType} Request - ${timestamp}`);
  console.log(`Origin: ${origin}`);
  console.log(`User Agent: ${userAgent}`);

  // Validate domain
  const isValidDomain = isAllowedDomain(origin);
  console.log(`Domain Valid: ${isValidDomain}`);

  // Rate limiting check (basic)
  const rateLimitKey = `${origin}_${requestType}`;
  const rateLimitCount =
    PropertiesService.getScriptProperties().getProperty(rateLimitKey) || 0;
  const currentCount = parseInt(rateLimitCount) + 1;

  // Reset counter every hour
  const lastReset =
    PropertiesService.getScriptProperties().getProperty(
      `${rateLimitKey}_reset`
    ) || 0;
  const now = Date.now();
  if (now - parseInt(lastReset) > 3600000) {
    // 1 hour
    PropertiesService.getScriptProperties().setProperty(rateLimitKey, "0");
    PropertiesService.getScriptProperties().setProperty(
      `${rateLimitKey}_reset`,
      now.toString()
    );
  } else {
    PropertiesService.getScriptProperties().setProperty(
      rateLimitKey,
      currentCount.toString()
    );
  }

  const isRateLimited = currentCount > 100; // Max 100 requests per hour per origin
  console.log(`Rate Limit: ${currentCount}/100, Limited: ${isRateLimited}`);

  return {
    timestamp,
    origin,
    userAgent,
    isValidDomain,
    requestType,
    rateLimitCount: currentCount,
    isRateLimited,
  };
}

// Function để tạo response với CORS headers
function createCORSResponse(data, mimeType = ContentService.MimeType.JSON) {
  const response = ContentService.createTextOutput(
    JSON.stringify(data)
  ).setMimeType(mimeType);

  // Thêm CORS headers nếu có thể
  try {
    // Google Apps Script không hỗ trợ thiết lập headers trực tiếp
    // Nhưng chúng ta có thể thêm thông tin CORS vào response body
    const corsData = {
      ...data,
      cors: {
        allowedOrigins: ALLOWED_DOMAINS,
        allowedMethods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        maxAge: 86400,
      },
    };

    return ContentService.createTextOutput(
      JSON.stringify(corsData)
    ).setMimeType(mimeType);
  } catch (e) {
    // Fallback nếu có lỗi
    return response;
  }
}

function doPost(e) {
  try {
    // Log và validate request
    const requestInfo = logAndValidateRequest(e, "POST");

    // Kiểm tra rate limiting
    if (requestInfo.isRateLimited) {
      return createCORSResponse({
        success: false,
        error: "Rate limit exceeded. Please try again later.",
        domain: "sapxepdidamcuoidi.site",
        requestInfo: requestInfo,
      });
    }

    // Parse dữ liệu từ POST request
    const data = JSON.parse(e.postData.contents);

    // Lấy Google Sheet
    const sheet = SpreadsheetApp.getActiveSheet();

    // Thêm header nếu sheet trống
    if (sheet.getLastRow() === 0) {
      sheet
        .getRange(1, 1, 1, 7)
        .setValues([
          [
            "Timestamp",
            "Side",
            "Full Name",
            "Wish",
            "Status",
            "People",
            "Origin",
          ],
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
      requestInfo.origin, // Thêm origin để tracking
    ];

    sheet.appendRow(rowData);

    // Trả về response thành công
    return createCORSResponse({
      success: true,
      message: "Data saved successfully",
      domain: "sapxepdidamcuoidi.site",
      requestInfo: requestInfo,
    });
  } catch (error) {
    // Log error
    console.error("POST Error:", error.toString());

    // Trả về lỗi nếu có
    return createCORSResponse({
      success: false,
      error: error.toString(),
      domain: "sapxepdidamcuoidi.site",
    });
  }
}

function doGet(e) {
  try {
    // Log và validate request
    const requestInfo = logAndValidateRequest(e, "GET");

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
          .getRange(1, 1, 1, 7)
          .setValues([
            [
              "Timestamp",
              "Side",
              "Full Name",
              "Wish",
              "Status",
              "People",
              "Origin",
            ],
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
        requestInfo.origin, // Thêm origin để tracking
      ];

      sheet.appendRow(rowData);

      // Trả về JSONP response với CORS headers
      const result = {
        success: true,
        message: "Data saved successfully",
        requestInfo: requestInfo,
      };
      return ContentService.createTextOutput(
        callback + "(" + JSON.stringify(result) + ")"
      ).setMimeType(ContentService.MimeType.JAVASCRIPT);
    }

    // Test function để kiểm tra script hoạt động
    return createCORSResponse({
      message: "Google Apps Script is working!",
      domain: "sapxepdidamcuoidi.site",
      timestamp: new Date().toISOString(),
      allowedDomains: ALLOWED_DOMAINS,
      requestInfo: requestInfo,
    });
  } catch (error) {
    // Log error
    console.error("GET Error:", error.toString());

    const callback = e.parameter.callback;
    if (callback) {
      const result = {
        success: false,
        error: error.toString(),
        requestInfo: logAndValidateRequest(e, "GET_ERROR"),
      };
      return ContentService.createTextOutput(
        callback + "(" + JSON.stringify(result) + ")"
      ).setMimeType(ContentService.MimeType.JAVASCRIPT);
    }

    return createCORSResponse({
      success: false,
      error: error.toString(),
      domain: "sapxepdidamcuoidi.site",
    });
  }
}

// Function để xử lý OPTIONS request (CORS preflight)
function doOptions(e) {
  try {
    // Log và validate request
    const requestInfo = logAndValidateRequest(e, "OPTIONS");

    return createCORSResponse({
      message: "CORS preflight handled",
      domain: "sapxepdidamcuoidi.site",
      allowedMethods: ["GET", "POST", "OPTIONS"],
      allowedDomains: ALLOWED_DOMAINS,
      requestInfo: requestInfo,
    });
  } catch (error) {
    console.error("OPTIONS Error:", error.toString());

    return createCORSResponse({
      success: false,
      error: error.toString(),
      domain: "sapxepdidamcuoidi.site",
    });
  }
}
