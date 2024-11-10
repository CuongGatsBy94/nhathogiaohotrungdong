/**
 * @Author: Your name
 * @Date:   2024-11-10 20:13:32
 * @Last Modified by:   Your name
 * @Last Modified time: 2024-11-10 20:20:19
 */
// Tên tài khoản người dùng (thay đổi hoặc lấy từ hệ thống đăng nhập)
const currentUser = "User123";

// Tạo bài viết
function createPost(title, content, imageUrl) {
  const postList = document.getElementById('post-list');

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

  // Thêm phần bình luận
  const commentSection = document.createElement('div');
  commentSection.classList.add('comment-section');

  // Form nhập comment
  const commentInput = document.createElement('div');
  commentInput.classList.add('comment-input');

  const commentText = document.createElement('input');
  commentText.type = 'text';
  commentText.placeholder = 'Nhập bình luận của bạn...';

  const commentButton = document.createElement('button');
  commentButton.textContent = 'Bình luận';
  commentButton.addEventListener('click', () => addComment(commentList, commentText.value));

  commentInput.appendChild(commentText);
  commentInput.appendChild(commentButton);

  // Danh sách comment
  const commentList = document.createElement('div');
  commentList.classList.add('comment-list');

  // Thêm các phần tử vào section comment
  commentSection.appendChild(commentInput);
  commentSection.appendChild(commentList);

  // Thêm comment section vào bài viết
  postItem.appendChild(commentSection);

  // Thêm bài viết vào danh sách
  postList.appendChild(postItem);
}

// Thêm comment vào danh sách comment
function addComment(commentList, commentText) {
  if (!commentText.trim()) {
    alert('Vui lòng nhập nội dung bình luận.');
    return;
  }

  const commentItem = document.createElement('div');
  commentItem.classList.add('comment-item');

  // Hiển thị tên tài khoản
  const author = document.createElement('span');
  author.classList.add('comment-author');
  author.textContent = `${currentUser}: `;

  const text = document.createElement('span');
  text.textContent = commentText;

  // Thêm tên người dùng và bình luận vào item
  commentItem.appendChild(author);
  commentItem.appendChild(text);

  // Thêm bình luận vào danh sách
  commentList.appendChild(commentItem);

  // Xóa nội dung đã nhập sau khi bình luận
  const inputField = commentList.previousSibling.querySelector('input');
  inputField.value = '';
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

  // Reset dữ liệu
  document.getElementById('post-title').value = '';
  document.getElementById('post-content').value = '';
  document.getElementById('post-image').value = '';
});
