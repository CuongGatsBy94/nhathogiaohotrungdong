<?php
/**
 * @Author: Your name
 * @Date:   2024-11-08 20:15:31
 * @Last Modified by:   Your name
 * @Last Modified time: 2024-11-08 20:15:35
 */

session_start();
include 'db_connect.php'; // Kết nối cơ sở dữ liệu

// Kiểm tra người dùng đã đăng nhập chưa
if (!isset($_SESSION['user_id'])) {
    header('Location: login.html'); // Nếu chưa đăng nhập, chuyển hướng về trang login
    exit;
}

$user_id = $_SESSION['user_id'];

// Lấy bài viết của người dùng
$sql = "SELECT * FROM posts WHERE user_id = $user_id";
$result = $conn->query($sql);

echo "<h2>Your Posts</h2>";
while ($row = $result->fetch_assoc()) {
    echo "<div><h3>" . $row['title'] . "</h3><p>" . $row['content'] . "</p></div>";
}

$conn->close();
?>
