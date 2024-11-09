/**
 * @Author: Your name
 * @Date:   2024-11-08 23:59:27
 * @Last Modified by:   Your name
 * @Last Modified time: 2024-11-08 23:59:31
 */
const mysql = require('mysql2');

// Tạo kết nối đến MySQL
const connection = mysql.createConnection({
  host: 'localhost',            // Địa chỉ MySQL Server (thường là localhost khi phát triển cục bộ)
  user: 'root',                 // Tên người dùng MySQL của bạn
  password: 'your_password',    // Mật khẩu của bạn
  database: 'your_database'     // Tên cơ sở dữ liệu
});

// Hàm để chèn bài viết mới
const insertPost = (userId, title, content, status) => {
  const sql = 'INSERT INTO posts (user_id, title, content, status) VALUES (?, ?, ?, ?)';
  connection.query(sql, [userId, title, content, status], (err, results) => {
    if (err) {
      console.error('Lỗi khi chèn bài viết:', err);
    } else {
      console.log('Bài viết đã được lưu thành công:', results);
    }
  });
};

// Chèn bài viết mới
insertPost(1, 'Tiêu đề bài viết', 'Nội dung bài viết', 'published');
