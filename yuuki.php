<?php
// Cấu hình thông tin kết nối
$servername = "localhost";  // Thường dùng localhost trong môi trường XAMPP
$username = "root";        // Tài khoản mặc định trong XAMPP là "root"
$password = "";            // Mật khẩu mặc định là trống trong XAMPP
$dbname = "yuuki";         // Tên cơ sở dữ liệu bạn đã tạo

// Tạo kết nối
$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
} else {
    echo "Kết nối thành công!";
}
?>
