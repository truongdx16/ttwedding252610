// URL Parameters handling for guest personalization
function getUrlParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    guest: urlParams.get("guest") || "",
    side: urlParams.get("side") || "", // 'groom' or 'bride'
    autoPlay: urlParams.get("music") !== "false", // Default to true unless explicitly set to false
  };
}

// Get greeting text (neutral)
function getGreetingText() {
  return "Trân trọng kính mời"; // Always neutral greeting
}

// Personalize content based on guest name and side
function personalizeInvitation(params) {
  // Update page title if guest name is provided
  if (params.guest) {
    document.title = `Thiệp mời đám cưới Thành Tuân & Minh Thư - ${params.guest}`;

    // Determine side-specific information
    const sideInfo = getSideSpecificInfo(params.side);
    const greetingText = getGreetingText();

    // Add personalized greeting
    const personalizedGreeting = document.createElement("div");
    personalizedGreeting.className = "personalized-greeting";
    personalizedGreeting.innerHTML = `
      <div style="text-align: center; margin: 20px 0; padding: 25px; background: linear-gradient(135deg, rgba(190, 52, 85, 0.08), rgba(255, 248, 240, 0.9)); border-radius: 15px; border: 2px solid rgba(190, 52, 85, 0.2); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
        <div style="margin-bottom: 15px;">
          <i class="fa-solid fa-heart" style="color: #be3455; font-size: 20px; margin-right: 8px;"></i>
          <span style="color: #be3455; font-size: 18px; font-weight: 600; letter-spacing: 1px;">THIỆP MỜI</span>
          <i class="fa-solid fa-heart" style="color: #be3455; font-size: 20px; margin-left: 8px;"></i>
        </div>
        <h2 style="color: #be3455; font-size: 28px; margin-bottom: 15px; font-family: 'Cormorant Garamond', serif; font-weight: 700; letter-spacing: 0.5px;">${greetingText}</h2>
        <h3 style="color: #2c2c2c; font-size: 32px; margin-bottom: 20px; font-family: 'Fz Alpha Brights', serif; font-weight: 600; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">${params.guest}</h3>
        <div style="border-top: 2px solid rgba(190, 52, 85, 0.3); padding-top: 15px; margin-top: 15px;">
           <p style="color: #555; font-size: 16px; font-style: italic; line-height: 1.6; margin-bottom: 8px;">đến tham dự</p>
          <p style="color: #be3455; font-size: 18px; font-weight: 600; letter-spacing: 0.5px;">${sideInfo.eventTitle}</p>
          ${sideInfo.eventDetails}
        </div>
      </div>
    `;

    // Insert after the intro section
    const coupleSection = document.getElementById("couple");
    coupleSection.parentNode.insertBefore(personalizedGreeting, coupleSection);
  }
}

// Get side-specific information for invitation
function getSideSpecificInfo(side) {
  if (side === "bride") {
    return {
      eventTitle: "Lễ cưới và Tiệc rượu nhà gái",
      eventDetails: `
        <div style="margin-top: 15px; padding: 15px; background: rgba(190, 52, 85, 0.05); border-radius: 10px; border: 1px solid rgba(190, 52, 85, 0.2);">
          <div style="margin-bottom: 10px;">
            <strong style="color: #be3455; font-size: 16px;">🏛️ HÔN LỄ</strong>
            <p style="color: #333; font-size: 14px; margin: 5px 0;">Giáo xứ Bình Châu</p>
            <p style="color: #be3455; font-weight: 600; font-size: 14px;">16:00 - Thứ Sáu, 24/10/2025</p>
          </div>
          <div style="margin-bottom: 10px;">
            <strong style="color: #be3455; font-size: 16px;">🍽️ TIỆC CHIỀU NHÀ GÁI</strong>
            <p style="color: #333; font-size: 14px; margin: 5px 0;">Tư gia - 237/1 Ấp Kênh 8A, Xã Thạnh Đông</p>
            <p style="color: #be3455; font-weight: 600; font-size: 14px;">17:30 - Thứ Sáu, 24/10/2025</p>
          </div>
          <div>
            <strong style="color: #be3455; font-size: 16px;">🎉 TIỆC CHÍNH NHÀ GÁI</strong>
            <p style="color: #333; font-size: 14px; margin: 5px 0;">Tư gia - 237/1 Ấp Kênh 8A, Xã Thạnh Đông</p>
            <p style="color: #be3455; font-weight: 600; font-size: 14px;">11:00 - Thứ Bảy, 25/10/2025</p>
          </div>
        </div>
      `,
    };
  } else {
    return {
      eventTitle: "Lễ cưới và Tiệc rượu nhà trai",
      eventDetails: `
        <div style="margin-top: 15px; padding: 15px; background: rgba(190, 52, 85, 0.05); border-radius: 10px; border: 1px solid rgba(190, 52, 85, 0.2);">
          <div style="margin-bottom: 10px;">
            <strong style="color: #be3455; font-size: 16px;">🏛️ HÔN LỄ</strong>
            <p style="color: #333; font-size: 14px; margin: 5px 0;">Giáo xứ Bình Châu</p>
            <p style="color: #be3455; font-weight: 600; font-size: 14px;">16:00 - Thứ Sáu, 24/10/2025</p>
          </div>
          <div style="margin-bottom: 10px;">
            <strong style="color: #be3455; font-size: 16px;">🍽️ TIỆC CHIỀU NHÀ TRAI</strong>
            <p style="color: #333; font-size: 14px; margin: 5px 0;">Tư gia - 315 Ấp Kênh 7A, Xã Thạnh Đông</p>
            <p style="color: #be3455; font-weight: 600; font-size: 14px;">17:00 - Thứ Bảy, 25/10/2025</p>
          </div>
          <div>
            <strong style="color: #be3455; font-size: 16px;">🎉 TIỆC CHÍNH NHÀ TRAI</strong>
            <p style="color: #333; font-size: 14px; margin: 5px 0;">Tư gia - 315 Ấp Kênh 7A, Xã Thạnh Đông</p>
            <p style="color: #be3455; font-weight: 600; font-size: 14px;">11:00 - Chủ Nhật, 26/10/2025</p>
          </div>
        </div>
      `,
    };
  }
}

// Scroll indicator functionality
document.addEventListener("DOMContentLoaded", () => {
  // Handle URL parameters first
  const urlParams = getUrlParameters();
  personalizeInvitation(urlParams);

  // Test Google Apps Script connection
  console.log("Testing Google Apps Script connection...");
  testGoogleScriptConnection();

  // Thêm test functions vào global scope để có thể gọi từ console
  window.testGoogleScriptConnection = testGoogleScriptConnection;
  window.testDataSubmission = testDataSubmission;

  const scrollIndicator = document.getElementById("scroll-indicator");

  // Debug: Check if element exists
  console.log("Scroll indicator element:", scrollIndicator);

  if (!scrollIndicator) {
    console.error("Scroll indicator element not found!");
    return;
  }

  // Show/hide scroll indicator based on scroll position
  function updateScrollIndicator() {
    const scrollY = window.scrollY;
    console.log("Scroll Y:", scrollY); // Debug log

    // Show indicator only when at the very top of the page
    if (scrollY < 50) {
      scrollIndicator.style.opacity = "1";
      scrollIndicator.style.display = "flex";
      console.log("Showing indicator"); // Debug log
    } else {
      scrollIndicator.style.opacity = "0";
      scrollIndicator.style.display = "none";
      console.log("Hiding indicator"); // Debug log
    }
  }

  // Update on scroll
  window.addEventListener("scroll", updateScrollIndicator);

  // Initial check
  updateScrollIndicator();
});

// Ngày cưới (26/07/2025 lúc 08:00)
const weddingDate = new Date("2025-10-26T00:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = days
    .toString()
    .padStart(2, "0");
  document.getElementById("hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").textContent = seconds
    .toString()
    .padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown(); // chạy lần đầu

// Bắt sự kiện chọn toggle cho "Nhà trai / Nhà gái"
document.querySelectorAll("#side-select .select-toggle").forEach((toggle) => {
  toggle.addEventListener("click", function () {
    document
      .querySelectorAll("#side-select .select-toggle")
      .forEach((el) => el.classList.remove("active"));
    this.classList.add("active");
    document.getElementById("side-input").value = this.dataset.value;
  });
});

// Bắt sự kiện chọn toggle cho "Sẵn sàng / Rất tiếc"
document.querySelectorAll("#status-select .select-toggle").forEach((toggle) => {
  toggle.addEventListener("click", function () {
    document
      .querySelectorAll("#status-select .select-toggle")
      .forEach((el) => el.classList.remove("active"));
    this.classList.add("active");
    const value = this.dataset.value;
    document.getElementById("status-input").value = value;

    // Ẩn/hiện dropdown số người tham dự
    const peopleGroup = document.getElementById("people-group");
    if (value === "Sẵn sàng") {
      peopleGroup.style.display = "block";
    } else {
      peopleGroup.style.display = "none";
    }
  });
});

// Function để test kết nối với Google Apps Script
function testGoogleScriptConnection() {
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxToWicOXuzMNh06qWNMaR0WT3R7dPjABJE4nYec_YYnoYs--bJkBho0DmBqlTj8OPN/exec";

  fetch(GOOGLE_SCRIPT_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log("Google Script Test Response:", data);

      if (data.message && data.message.includes("working")) {
        console.log("✅ Google Apps Script is working!");
        console.log("Domain:", data.domain);
        console.log("Allowed Domains:", data.allowedDomains);

        if (data.requestInfo) {
          console.log("Request Info:", data.requestInfo);
          console.log("Origin:", data.requestInfo.origin);
          console.log("User Agent:", data.requestInfo.userAgent);
        }
      }
    })
    .catch((error) => {
      console.error("❌ Google Script Test Failed:", error);
    });
}

// Function để test submit dữ liệu
function testDataSubmission() {
  const testData = {
    side: "Nhà trai",
    fullname: "Test User",
    wish: "Test wish",
    status: "Sẵn sàng",
    people: "1",
    timestamp: Date.now(),
    origin: window.location.origin,
    userAgent: navigator.userAgent,
  };

  console.log("Testing data submission with:", testData);

  // Tạo form element giả để test
  const mockForm = document.createElement("form");
  submitDataWithJSONP(testData, mockForm);
}

// Function để gửi dữ liệu sử dụng JSONP
function submitDataWithJSONP(data, formElement) {
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxToWicOXuzMNh06qWNMaR0WT3R7dPjABJE4nYec_YYnoYs--bJkBho0DmBqlTj8OPN/exec";

  const script = document.createElement("script");
  const callbackName = "jsonp_callback_" + Math.round(100000 * Math.random());

  window[callbackName] = function (result) {
    delete window[callbackName];
    document.body.removeChild(script);

    // Ẩn loading state
    hideLoadingState(formElement);

    if (result.success) {
      // Hiển thị thông báo thành công với thông tin chi tiết
      let successMessage = "Cảm ơn bạn đã xác nhận! ❤️";

      // Thêm thông tin từ server nếu có
      if (result.requestInfo) {
        console.log("Request Info:", result.requestInfo);
        if (result.requestInfo.rateLimitCount) {
          console.log(`Rate Limit: ${result.requestInfo.rateLimitCount}/100`);
        }
      }

      alert(successMessage);

      // Reset form
      formElement.reset();
      document.getElementById("side-input").value = "Nhà trai";
      document.getElementById("status-input").value = "Sẵn sàng";
      document
        .querySelectorAll(".select-toggle")
        .forEach((el) => el.classList.remove("active"));
      document
        .querySelector('#side-select .select-toggle[data-value="Nhà trai"]')
        .classList.add("active");
      document
        .querySelector('#status-select .select-toggle[data-value="Sẵn sàng"]')
        .classList.add("active");
    } else {
      // Hiển thị thông báo lỗi chi tiết hơn
      let errorMessage = "Có lỗi xảy ra, vui lòng thử lại sau.";

      if (result.error) {
        if (result.error.includes("Rate limit exceeded")) {
          errorMessage =
            "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 1 giờ.";
        } else {
          errorMessage = `Lỗi: ${result.error}`;
        }
      }

      console.error("Submission Error:", result);
      alert(errorMessage);
    }
  };

  // Thêm thông tin origin và user agent vào data
  const enhancedData = {
    ...data,
    origin: window.location.origin,
    userAgent: navigator.userAgent,
    timestamp: Date.now(),
  };

  const url =
    GOOGLE_SCRIPT_URL +
    "?callback=" +
    callbackName +
    "&data=" +
    encodeURIComponent(JSON.stringify(enhancedData));
  script.src = url;
  document.body.appendChild(script);
}

// Function để hiển thị loading state
function showLoadingState(formElement) {
  const submitBtn = formElement.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Đang gửi...";
    submitBtn.style.opacity = "0.7";
  }
}

// Function để ẩn loading state
function hideLoadingState(formElement) {
  const submitBtn = formElement.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit (Xác nhận)";
    submitBtn.style.opacity = "1";
  }
}

// Bắt sự kiện submit form
document.getElementById("guest-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Ngăn reload

  // Hiển thị loading state
  showLoadingState(this);

  // Lấy dữ liệu từ form
  const side = document.getElementById("side-input").value;
  const fullname = document.getElementById("fullname").value.trim();
  const wish = document.getElementById("wish").value.trim();
  const status = document.getElementById("status-input").value;
  const people = this.people.value;

  // Kiểm tra tên không rỗng
  if (!fullname) {
    hideLoadingState(this);
    alert("Vui lòng nhập tên khách mời!");
    return;
  }

  // Tạo dữ liệu với thông tin bổ sung
  const data = {
    side,
    fullname,
    wish,
    status,
    people,
    timestamp: Date.now(),
    // Thông tin bổ sung sẽ được thêm trong submitDataWithJSONP
  };

  // Gửi lên Google Sheets sử dụng JSONP để tránh CORS
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxToWicOXuzMNh06qWNMaR0WT3R7dPjABJE4nYec_YYnoYs--bJkBho0DmBqlTj8OPN/exec";

  // Sử dụng JSONP để tránh CORS với enhanced data
  submitDataWithJSONP(data, this);
});

document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");
  const toggleBtn = document.getElementById("music-toggle");

  // Get URL parameters to check if music should auto-play
  const urlParams = getUrlParameters();

  // Cấu hình
  const startTime = 39;
  const endTime = 74;

  // Đặt âm lượng mặc định
  music.volume = 0.7;

  let isLooping = false;

  // Phát nhạc tự động khi trang load (only if autoPlay is true)
  const startMusic = async () => {
    if (!urlParams.autoPlay) {
      console.log("Music autoplay disabled via URL parameter");
      toggleBtn.classList.remove("off");
      return;
    }

    // Chiến lược 1: Thử phát nhạc với muted trước
    try {
      music.currentTime = startTime;
      music.muted = true; // Bắt đầu với muted để bypass autoplay policy
      await music.play();

      // Sau khi phát thành công, tăng volume dần dần
      music.muted = false;
      music.volume = 0.7;
      isLooping = true;
      toggleBtn.classList.add("off");
      console.log("Music started successfully with muted strategy");
      return;
    } catch (error) {
      console.log("Muted autoplay failed:", error);
    }

    // Chiến lược 2: Thử phát nhạc bình thường
    try {
      music.currentTime = startTime;
      music.muted = false;
      await music.play();
      isLooping = true;
      toggleBtn.classList.add("off");
      console.log("Music started successfully");
      return;
    } catch (error) {
      console.log("Normal autoplay blocked:", error);
    }

    // Chiến lược 3: Chờ user interaction
    toggleBtn.classList.remove("off");

    const tryPlayOnInteraction = () => {
      music.currentTime = startTime;
      music.muted = false;
      music
        .play()
        .then(() => {
          isLooping = true;
          toggleBtn.classList.add("off");
          console.log("Music started after user interaction");
          // Loại bỏ event listeners sau khi thành công
          document.removeEventListener("click", tryPlayOnInteraction);
          document.removeEventListener("touchstart", tryPlayOnInteraction);
          document.removeEventListener("keydown", tryPlayOnInteraction);
        })
        .catch((err) => console.log("Still blocked:", err));
    };

    // Thêm event listeners để thử phát nhạc khi user tương tác
    document.addEventListener("click", tryPlayOnInteraction, { once: true });
    document.addEventListener("touchstart", tryPlayOnInteraction, {
      once: true,
    });
    document.addEventListener("keydown", tryPlayOnInteraction, {
      once: true,
    });

    // Hiển thị thông báo nhỏ để người dùng biết cần tương tác
    const showInteractionHint = () => {
      const hint = document.createElement("div");
      hint.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(190, 52, 85, 0.9);
        color: white;
        padding: 10px 20px;
        border-radius: 25px;
        font-size: 14px;
        z-index: 10000;
        animation: fadeInOut 3s ease-in-out;
        pointer-events: none;
        text-align: center;
      `;
      hint.textContent = "🎵 Nhấn vào trang để phát nhạc";
      document.body.appendChild(hint);

      // Thêm CSS animation
      const style = document.createElement("style");
      style.textContent = `
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
          20% { opacity: 1; transform: translateX(-50%) translateY(0); }
          80% { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
        }
      `;
      document.head.appendChild(style);

      setTimeout(() => {
        if (hint.parentNode) {
          hint.parentNode.removeChild(hint);
        }
        if (style.parentNode) {
          style.parentNode.removeChild(style);
        }
      }, 3000);
    };

    // Hiển thị thông báo sau 1 giây
    setTimeout(showInteractionHint, 1000);
  };

  // Bắt đầu phát nhạc ngay khi trang load
  startMusic();

  // Thử phát nhạc lại khi window load hoàn tất
  window.addEventListener("load", () => {
    if (!isLooping && urlParams.autoPlay) {
      console.log("Trying to start music on window load");
      startMusic();
    }
  });

  // Xử lý nút toggle
  toggleBtn.addEventListener("click", () => {
    if (toggleBtn.classList.contains("off")) {
      // Đang phát -> Tắt nhạc
      music.pause();
      isLooping = false;
      toggleBtn.classList.remove("off");
      console.log("Music turned OFF");
    } else {
      // Đang tắt -> Bật nhạc
      music.currentTime = startTime;
      music
        .play()
        .then(() => {
          isLooping = true;
          toggleBtn.classList.add("off");
          console.log("Music turned ON");
        })
        .catch((error) => {
          console.log("Failed to start music:", error);
        });
    }
  });

  // Theo dõi thời gian để lặp lại
  music.addEventListener("timeupdate", () => {
    if (isLooping && music.currentTime >= endTime) {
      music.currentTime = startTime;
      music.play().catch((error) => {
        console.log("Loop play failed:", error);
      });
    }
  });
});
