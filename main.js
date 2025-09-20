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

  // Gửi lên Google Sheets
  // Thay YOUR_GOOGLE_APPS_SCRIPT_URL bằng URL của Google Apps Script đã deploy
  // AKfycbzwOX2XQbgiES8JLfY0qSogX8oVNpVgynrFcK-S_oVLyBU9_2FkFBzUNrp2LU8z9bT0
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzwOX2XQbgiES8JLfY0qSogX8oVNpVgynrFcK-S_oVLyBU9_2FkFBzUNrp2LU8z9bT0/exec";

  fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        alert("Cảm ơn bạn đã xác nhận! ❤️");
        this.reset();
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
        throw new Error(result.error || "Unknown error");
      }
    })
    .catch((error) => {
      console.error("Lỗi khi lưu dữ liệu: ", error);
      alert("Có lỗi xảy ra, vui lòng thử lại sau.");
    });
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

  toggleBtn.addEventListener("click", () => {
    const isOff = toggleBtn.classList.toggle("off");
    if (isOff) {
      music.pause();
      isLooping = false;
    } else {
      music.currentTime = startTime; // Phát từ giây thứ 39
      music.play();
      isLooping = true;
    }
  });

  // Theo dõi thời gian để lặp lại
  music.addEventListener("timeupdate", () => {
    if (isLooping && music.currentTime >= endTime) {
      music.currentTime = startTime;
      music.play(); // Đảm bảo phát lại
    }
  });
});
