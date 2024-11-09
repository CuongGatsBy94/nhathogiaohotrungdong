/**
 * @Author: Your name
 * @Date:   2024-11-08 21:18:51
 * @Last Modified by:   Your name
 * @Last Modified time: 2024-11-08 21:30:03
 */
// Import các thư viện cần thiết (ví dụ như thư viện để kết nối cơ sở dữ liệu)
const mysql = require('mysql2');

// Kết nối đến cơ sở dữ liệu (Thay đổi các thông số này cho phù hợp với cấu hình của bạn)
const db = mysql.createConnection({
  host: 'localhost',  // Hoặc URL của cơ sở dữ liệu
  user: 'yuuki',      // Tên người dùng MySQL
  password: 'password', // Mật khẩu người dùng MySQL
  database: 'forum'    // Tên cơ sở dữ liệu
});

const handler = async (event) => {
  try {
    if (event.httpMethod === 'POST') {
      // Parse dữ liệu từ body của yêu cầu
      const data = JSON.parse(event.body);

      // Kiểm tra nếu thiếu thông tin email hoặc mật khẩu
      const { email, password } = data;
      if (!email || !password) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Email và mật khẩu là bắt buộc' }),
        };
      }

      // Kiểm tra nếu email đã tồn tại trong cơ sở dữ liệu
      const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
      db.execute(checkEmailQuery, [email], (err, results) => {
        if (err) {
          return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Lỗi kết nối cơ sở dữ liệu', error: err }),
          };
        }

        // Nếu email đã tồn tại
        if (results.length > 0) {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Email đã tồn tại' }),
          };
        }

        // Thêm người dùng mới vào cơ sở dữ liệu
        const insertUserQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.execute(insertUserQuery, [email, password], (err, results) => {
          if (err) {
            return {
              statusCode: 500,
              body: JSON.stringify({ message: 'Lỗi khi thêm người dùng', error: err }),
            };
          }

          // Trả về thông báo thành công
          return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Đăng ký thành công' }),
          };
        });
      });

    } else {
      // Nếu không phải POST, trả về lỗi 405 (Method Not Allowed)
      return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Chỉ hỗ trợ POST request' }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Lỗi không xác định', error: error.toString() }),
    };
  }
};

module.exports = { handler };
