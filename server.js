/**
 * @Author: Your name
 * @Date:   2024-11-06 20:05:23
 * @Last Modified by:   Your name
 * @Last Modified time: 2024-11-06 20:30:44
 */
const express = require('express');
const app = express();
const port = 3000;

// Danh sách các IP của admin (thêm IP của bạn vào đây)
const admins = ['::1', '192.168.0.111']; // Thêm IP admin của bạn tại đây

// API để lấy thông tin về quyền người dùng
app.get('/get-user-role', (req, res) => {
    const userIP = req.ip;  // Lấy địa chỉ IP của người dùng
    const isAdmin = admins.includes(userIP);  // Kiểm tra xem IP có phải của admin không
    res.json({ isAdmin });  // Trả về kết quả
});

// Bắt đầu server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
