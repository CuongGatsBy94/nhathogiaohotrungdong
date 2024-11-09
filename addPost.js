/**
 * @Author: Your name
 * @Date:   2024-11-09 00:00:01
 * @Last Modified by:   Your name
 * @Last Modified time: 2024-11-09 00:00:12
 */
'use strict';
const mysql = require('mysql2');

exports.handler = async function(event, context) {
  const { userId, title, content, status } = JSON.parse(event.body);

  // Tạo kết nối MySQL
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'your_database',
  });

  const sql = 'INSERT INTO posts (user_id, title, content, status) VALUES (?, ?, ?, ?)';

  return new Promise((resolve, reject) => {
    connection.query(sql, [userId, title, content, status], (err, results) => {
      if (err) {
        reject({
          statusCode: 500,
          body: JSON.stringify({ error: 'Lỗi khi chèn bài viết' }),
        });
      } else {
        resolve({
          statusCode: 200,
          body: JSON.stringify({ message: 'Bài viết đã được lưu thành công!' }),
        });
      }
    });
  });
};
