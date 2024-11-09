/**
 * @Author: Your name
 * @Date:   2024-11-08 22:50:08
 * @Last Modified by:   Your name
 * @Last Modified time: 2024-11-09 18:59:54
 */
const mysql = require('mysql2');

// Kết nối tới MySQL
const connection = mysql.createConnection({
  host: 'localhost',        
  user: 'root',             
  password: 'your_password', 
  database: 'your_database'
});

exports.handler = async function(event, context) {
  if (event.httpMethod === 'POST') {
    const { email, password } = JSON.parse(event.body);

    if (!email || !password) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Email và mật khẩu không được để trống.' })
      };
    }

    const checkEmailSQL = 'SELECT * FROM users WHERE email = ?';
    return new Promise((resolve, reject) => {
      connection.query(checkEmailSQL, [email], (err, results) => {
        if (err) {
          resolve({
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Đã xảy ra lỗi khi kiểm tra email.' }),
          });
        } else if (results.length > 0) {
          resolve({
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Email đã được đăng ký.' }),
          });
        } else {
          const insertSQL = 'INSERT INTO users (email, password) VALUES (?, ?)';
          connection.query(insertSQL, [email, password], (insertErr) => {
            if (insertErr) {
              resolve({
                statusCode: 500,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Lỗi khi lưu dữ liệu người dùng.' }),
              });
            } else {
              resolve({
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: 'Đăng ký thành công!' }),
              });
            }
          });
        }
      });
    });
  }

  return {
    statusCode: 405,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ error: 'Chỉ chấp nhận phương thức POST' }),
  };
};
