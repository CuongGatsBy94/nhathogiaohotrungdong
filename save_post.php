<?php
// Kết nối cơ sở dữ liệu
include 'db_connect.php';

// Kiểm tra dữ liệu có được gửi qua POST không
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST['title'];
    $content = $_POST['content'];

    // Kiểm tra xem có ảnh không và xử lý ảnh nếu có
    $imagePath = '';
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $imagePath = 'uploads/' . basename($_FILES['image']['name']);
        move_uploaded_file($_FILES['image']['tmp_name'], $imagePath);
    }

    // Chuẩn bị và thực hiện câu lệnh SQL để chèn bài viết
    $stmt = $conn->prepare("INSERT INTO posts (title, content, image) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $title, $content, $imagePath);

    if ($stmt->execute()) {
        echo "Đăng bài viết thành công!";
    } else {
        echo "Lỗi: " . $stmt->error;
    }

    // Đóng kết nối
    $stmt->close();
    $conn->close();
}
?>
