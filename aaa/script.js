/**
 * @Author: Your name
 * @Date:   2024-11-10 20:03:09
 * @Last Modified by:   Your name
 * @Last Modified time: 2024-11-10 20:10:52
 */
// Lưu trữ thông tin tài khoản vào Local Storage
function register() {
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();
  
    if (!firstName || !lastName || !email || !password) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }
  
    // Lưu thông tin người dùng vào Local Storage
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
  
    localStorage.setItem('user', JSON.stringify(user));
    alert('Đăng ký thành công! Hãy đăng nhập.');
  
    // Chuyển sang form đăng nhập
    document.querySelector('.wrapper').classList.toggle('flip');
  }
  
  // Chức năng đăng nhập
  function login() {
    const loginEmail = document.getElementById('login-email').value.trim();
    const loginPassword = document.getElementById('login-password').value.trim();
  
    // Lấy thông tin người dùng từ Local Storage
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (!user) {
      alert('Không tìm thấy thông tin tài khoản. Hãy đăng ký trước.');
      return;
    }
  
    // Kiểm tra thông tin đăng nhập
    if (user.email === loginEmail && user.password === loginPassword) {
      alert('Đăng nhập thành công!');
      // Chuyển hướng đến trang diễn đàn
      window.location.href = 'diendan/index.html';
    } else {
      alert('Email hoặc mật khẩu không đúng.');
    }
  }
  
  // Chuyển đổi giữa form đăng nhập và đăng ký
  document.querySelectorAll('.toggle').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      document.querySelector('.wrapper').classList.toggle('flip');
    });
  });
  