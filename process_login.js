/**
 * @Author: Your name
 * @Date:   2024-11-08 23:44:30
 * @Last Modified by:   Your name
 * @Last Modified time: 2024-11-08 23:44:35
 */
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// Tạo kết nối đến cơ sở dữ liệu MySQL
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,       // Lấy thông tin từ biến môi trường
  user: process.env.MYSQL_USER,       // Lấy thông tin từ biến môi trường
  password: process.env.MYSQL_PASSWORD,  // Lấy thông tin từ biến môi trường
  database: process.env.MYSQL_DATABASE, // Lấy thông tin từ biến môi trường
});

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const { email, password } = JSON.parse(event.body);

  if (!email || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Email and password are required' }),
    };
  }

  // Kiểm tra email có tồn tại trong cơ sở dữ liệu không
  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  const [users] = await db.promise().query(checkEmailQuery, [email]);

  if (users.length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Email not found' }),
    };
  }

  const user = users[0];

  // Kiểm tra mật khẩu
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Incorrect password' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Login successful' }),
  };
};
