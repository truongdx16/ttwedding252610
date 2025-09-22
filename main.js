// Scroll indicator functionality
document.addEventListener("DOMContentLoaded", () => {
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

// Function để gửi dữ liệu sử dụng JSONP
function submitDataWithJSONP(data, formElement) {
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzq2ZmzRl47tvAvFo6iXwO3mKX7QOtSWni5HbdGITndmpM0nykYSsuyOwdQq7AhQ7aB/exec";

  const script = document.createElement("script");
  const callbackName = "jsonp_callback_" + Math.round(100000 * Math.random());

  window[callbackName] = function (result) {
    delete window[callbackName];
    document.body.removeChild(script);

    if (result.success) {
      alert("Cảm ơn bạn đã xác nhận! ❤️");
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
      alert("Có lỗi xảy ra, vui lòng thử lại sau.");
    }
  };

  const url =
    GOOGLE_SCRIPT_URL +
    "?callback=" +
    callbackName +
    "&data=" +
    encodeURIComponent(JSON.stringify(data));
  script.src = url;
  document.body.appendChild(script);
}

// Bắt sự kiện submit form
document.getElementById("guest-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Ngăn reload

  // Lấy dữ liệu từ form
  const side = document.getElementById("side-input").value;
  const fullname = document.getElementById("fullname").value.trim();
  const wish = document.getElementById("wish").value.trim();
  const status = document.getElementById("status-input").value;
  const people = this.people.value;

  // Kiểm tra tên không rỗng
  if (!fullname) {
    alert("Vui lòng nhập tên khách mời!");
    return;
  }

  // Tạo dữ liệu
  const data = {
    side,
    fullname,
    wish,
    status,
    people,
    timestamp: Date.now(),
  };

  // Gửi lên Google Sheets sử dụng JSONP để tránh CORS
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwN0Fm7Db9E2U4JTtyBW-obFCuDv7DLwxsX-TDHEVW5Nybg7EbQsQryPxfgFaXU9ofM/exec";

  // Sử dụng JSONP để tránh CORS
  submitDataWithJSONP(data, this);
});

document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");
  const toggleBtn = document.getElementById("music-toggle");

  // Cấu hình
  const startTime = 39;
  const endTime = 74;

  // Đặt âm lượng mặc định
  music.volume = 0.7;

  let isLooping = false;

  // Phát nhạc tự động khi trang load
  const startMusic = async () => {
    try {
      music.currentTime = startTime;
      await music.play();
      isLooping = true;
      toggleBtn.classList.add("off"); // Nhạc đang phát -> hiển thị nút "tắt"
      console.log("Music started successfully");
    } catch (error) {
      console.log("Autoplay blocked:", error);
      toggleBtn.classList.remove("off"); // Nhạc bị chặn -> hiển thị nút "bật"
    }
  };

  // Bắt đầu phát nhạc ngay khi trang load
  startMusic();

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
