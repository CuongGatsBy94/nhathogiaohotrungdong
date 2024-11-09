<?php
/**
 * @Author: Your name
 * @Date:   2024-11-08 19:36:55
 * @Last Modified by:   Your name
 * @Last Modified time: 2024-11-08 20:15:05
 */

$servername = "localhost";
$username = "root"; // tên người dùng MySQL
$password = ""; // mật khẩu MySQL
$dbname = "my_website_db"; // tên cơ sở dữ liệu

// Tạo kết nối
$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
