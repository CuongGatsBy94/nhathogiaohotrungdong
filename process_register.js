/**
 * @Author: Your name
 * @Date:   2024-11-08 23:43:07
 * @Last Modified by:   Your name
 * @Last Modified time: 2024-11-08 23:43:14
 */
const mysql = require('mysql2');

// Tạo kết nối đến cơ sở dữ liệu MySQL
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,     // Lấy thông tin từ biến môi trường
  user: process.env.MYSQL_USER,     // Lấy thông tin từ biến môi trường
  password: process.env.MYSQL_PASSWORD, // Lấy thông tin từ biến môi trường
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

  // Kiểm tra email đã tồn tại trong cơ sở dữ liệu chưa
  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  const [existingUsers] = await db.promise().query(checkEmailQuery, [email]);

  if (existingUsers.length > 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Email is already registered' }),
    };
  }

  // Thêm người dùng mới vào cơ sở dữ liệu
  const insertUserQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
  const [result] = await db.promise().query(insertUserQuery, [email, password]);

  if (result.affectedRows === 1) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Registration successful' }),
    };
  }

  return {
    statusCode: 500,
    body: JSON.stringify({ message: 'Failed to register user' }),
  };
};
