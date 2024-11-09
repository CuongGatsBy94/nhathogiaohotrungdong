/**
 * @Author: Your name
 * @Date:   2024-11-09 00:10:24
 * @Last Modified by:   Your name
 * @Last Modified time: 2024-11-09 00:10:30
 */
const mysql = require('mysql2');

// Kết nối tới MySQL
const connection = mysql.createConnection({
  host: 'localhost',        // Thay đổi nếu bạn sử dụng MySQL trên máy chủ khác
  user: 'root',             // Thay bằng username của bạn
  password: 'your_password', // Thay bằng mật khẩu của bạn
  database: 'your_database' // Thay bằng tên cơ sở dữ liệu của bạn
});

exports.handler = async function(event, context) {
  if (event.httpMethod === 'POST') {
    const { email, password } = JSON.parse(event.body);

    // Kiểm tra email và mật khẩu không được rỗng
    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email và mật khẩu không được để trống.' })
      };
    }

    // Kiểm tra email và mật khẩu trong cơ sở dữ liệu
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    
    return new Promise((resolve, reject) => {
      connection.query(sql, [email, password], (err, results) => {
        if (err) {
          reject({
            statusCode: 500,
            body: JSON.stringify({ error: 'Đã xảy ra lỗi khi đăng nhập.' }),
          });
        } else if (results.length > 0) {
          // Nếu tìm thấy tài khoản hợp lệ
          resolve({
            statusCode: 200,
            body: JSON.stringify({ message: 'Đăng nhập thành công!' }),
          });
        } else {
          // Nếu không tìm thấy tài khoản hợp lệ
          resolve({
            statusCode: 401,
            body: JSON.stringify({ error: 'Thông tin đăng nhập không chính xác.' }),
          });
        }
      });
    });
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Chỉ chấp nhận phương thức POST' }),
  };
};
