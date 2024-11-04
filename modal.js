/**
 * @Author: Your name
 * @Date:   2024-11-03 02:21:20
 * @Last Modified by:   Your name
 * @Last Modified time: 2024-11-03 02:21:36
 */
// Mở Modal Đăng nhập
function openLoginModal() {
    document.getElementById("loginModal").style.display = "flex";
}

// Đóng Modal Đăng nhập
function closeLoginModal() {
    document.getElementById("loginModal").style.display = "none";
}

// Mở Modal Đăng ký
function openRegisterModal() {
    document.getElementById("registerModal").style.display = "flex";
}

// Đóng Modal Đăng ký
function closeRegisterModal() {
    document.getElementById("registerModal").style.display = "none";
}

// Đóng modal khi bấm ngoài
window.onclick = function(event) {
    if (event.target == document.getElementById("loginModal")) {
        closeLoginModal();
    } else if (event.target == document.getElementById("registerModal")) {
        closeRegisterModal();
    }
};
