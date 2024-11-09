/**
 * @Author: Your name
 * @Date:   2024-11-08 23:59:40
 * @Last Modified by:   Your name
 * @Last Modified time: 2024-11-09 18:50:40
 */
const express = require('express');
const mysql = require('mysql2');
const fetch = require('node-fetch'); // Import thư viện fetch

const app = express();
const port = 3000;

app.use(express.json());

// Cấu hình kết nối MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'your_database',
});

// Hàm xác thực reCAPTCHA
async function verifyRecaptcha(recaptchaResponse) {
    const secretKey = '6LeTxHkqAAAAAHQ56pqlyB7Wb3u91TNWfR7oQ4rK';
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;
    
    const response = await fetch(verifyUrl, { method: 'POST' });
    const data = await response.json();
    return data.success;
}

// API để thêm người dùng (với reCAPTCHA)
app.post('/register', async (req, res) => {
  const { email, password, recaptchaResponse } = req.body;

  // Xác thực reCAPTCHA
  const isRecaptchaValid = await verifyRecaptcha(recaptchaResponse);
  if (!isRecaptchaValid) {
    return res.status(400).send({ error: 'Xác thực reCAPTCHA không hợp lệ.' });
  }

  // Kiểm tra email và mật khẩu không được rỗng
  if (!email || !password) {
    return res.status(400).send({ error: 'Email và mật khẩu không được để trống.' });
  }

  // Kiểm tra email đã tồn tại chưa
  const checkEmailSQL = 'SELECT * FROM users WHERE email = ?';
  connection.query(checkEmailSQL, [email], (err, results) => {
    if (err) {
      return res.status(500).send({ error: 'Đã xảy ra lỗi khi kiểm tra email.' });
    } else if (results.length > 0) {
      return res.status(400).send({ error: 'Email đã được đăng ký.' });
    } else {
      const insertSQL = 'INSERT INTO users (email, password) VALUES (?, ?)';
      connection.query(insertSQL, [email, password], (insertErr, insertResults) => {
        if (insertErr) {
          return res.status(500).send({ error: 'Lỗi khi lưu dữ liệu người dùng.' });
        } else {
          return res.status(200).send({ message: 'Đăng ký thành công!' });
        }
      });
    }
  });
});

// API để thêm bài viết
app.post('/add-post', (req, res) => {
  const { userId, title, content, status } = req.body;
  
  const sql = 'INSERT INTO posts (user_id, title, content, status) VALUES (?, ?, ?, ?)';
  connection.query(sql, [userId, title, content, status], (err, results) => {
    if (err) {
      res.status(500).send({ error: 'Lỗi khi chèn bài viết' });
    } else {
      res.status(200).send({ message: 'Bài viết đã được lưu thành công!' });
    }
  });
});

// Bắt đầu server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
