<?php
/**
 * @Author: Your name
 * @Date:   2024-11-10 20:43:38
 * @Last Modified by:   Your name
 * @Last Modified time: 2024-11-10 20:44:13
 */
// Lưu bài viết
function createPost(title, content, imageUrl) {
  const postList = document.getElementById('post-list');

  // Tạo ID duy nhất cho bài viết (sử dụng thời gian hiện tại hoặc ID ngẫu nhiên)
  const postId = new Date().getTime(); // hoặc bạn có thể sử dụng Math.random() để tạo ID ngẫu nhiên

  const postItem = document.createElement('div');
  postItem.classList.add('post-item');

  // Tạo tiêu đề bài viết
  const postTitle = document.createElement('h3');
  postTitle.textContent = title;
  postItem.appendChild(postTitle);

  // Thêm ảnh vào bài viết nếu có
  if (imageUrl) {
    const postImage = document.createElement('img');
    postImage.src = imageUrl;
    postItem.appendChild(postImage);
  }

  // Thêm nội dung bài viết
  const postContent = document.createElement('p');
  postContent.textContent = content;
  postItem.appendChild(postContent);

  // Tạo liên kết bài viết
  const postLink = document.createElement('a');
  postLink.href = `post.html?id=${postId}`;
  postLink.textContent = "Xem bài viết chi tiết";
  postItem.appendChild(postLink);

  // Thêm bài viết vào danh sách
  postList.appendChild(postItem);

  // Lưu bài viết vào LocalStorage (giả sử bạn không sử dụng cơ sở dữ liệu)
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.push({ id: postId, title, content, imageUrl });
  localStorage.setItem('posts', JSON.stringify(posts));
}

// Xử lý sự kiện khi nhấn nút Đăng bài
document.getElementById('submit-post').addEventListener('click', () => {
  const title = document.getElementById('post-title').value.trim();
  const content = document.getElementById('post-content').value.trim();
  const imageInput = document.getElementById('post-image');
  const file = imageInput.files[0];

  if (!title || !content) {
    alert('Vui lòng nhập tiêu đề và nội dung bài viết.');
    return;
  }

  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const imageUrl = event.target.result;
      createPost(title, content, imageUrl);
    };
    reader.readAsDataURL(file);
  } else {
    createPost(title, content, null);
  }

  // Xóa dữ liệu sau khi đăng bài
  document.getElementById('post-title').value = '';
  document.getElementById('post-content').value = '';
  document.getElementById('post-image').value = '';
});
