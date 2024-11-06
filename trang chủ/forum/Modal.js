/**
 * @Author: Your name
 * @Date:   2024-11-06 18:09:26
 * @Last Modified by:   Your name
 * @Last Modified time: 2024-11-06 18:23:27
 */
document.addEventListener('DOMContentLoaded', function() {
    const isAdmin = true; // Đặt là false nếu không phải admin

    // Ẩn form bài viết nếu không phải admin
    if (!isAdmin) {
        document.getElementById('admin-post-form').style.display = 'none';
    }

    // Thêm bài viết vào danh sách (chỉ admin có thể đăng bài)
    document.querySelector('#admin-post-form button').addEventListener('click', function() {
        addPost();
    });

    function addPost() {
        if (!isAdmin) {
            alert("Chỉ admin mới có thể đăng bài.");
            return;
        }

        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;

        if (title.trim() === '' || content.trim() === '') {
            alert('Vui lòng điền đầy đủ tiêu đề và nội dung bài viết.');
            return;
        }

        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        const postTitle = document.createElement('h3');
        postTitle.textContent = title;
        const postContent = document.createElement('p');
        postContent.textContent = content;

        const commentForm = document.createElement('div');
        commentForm.classList.add('comment-form');
        const commentNameInput = document.createElement('input');
        commentNameInput.type = 'text';
        commentNameInput.placeholder = 'Tên của bạn';
        const commentInput = document.createElement('input');
        commentInput.type = 'text';
        commentInput.placeholder = 'Viết bình luận...';

        commentInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                addComment(postDiv, commentNameInput.value, commentInput.value);
                commentInput.value = '';
                commentNameInput.value = '';
            }
        });

        const commentButton = document.createElement('button');
        commentButton.classList.add('btn', 'btn-secondary', 'mt-2');
        commentButton.textContent = 'Đăng Bình Luận';
        commentButton.onclick = function() {
            addComment(postDiv, commentNameInput.value, commentInput.value);
            commentInput.value = '';
            commentNameInput.value = '';
        };

        commentForm.appendChild(commentNameInput);
        commentForm.appendChild(commentInput);
        commentForm.appendChild(commentButton);

        const commentList = document.createElement('div');
        commentList.classList.add('comment-list');

        postDiv.appendChild(postTitle);
        postDiv.appendChild(postContent);
        postDiv.appendChild(commentForm);
        postDiv.appendChild(commentList);

        document.getElementById('posts').appendChild(postDiv);

        document.getElementById('post-title').value = '';
        document.getElementById('post-content').value = '';
    }

    function addComment(postDiv, commenterName, commentText) {
        if (commenterName.trim() === '' || commentText.trim() === '') {
            alert('Vui lòng nhập tên và bình luận.');
            return;
        }

        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.textContent = `${commenterName}: ${commentText}`;

        const commentList = postDiv.querySelector('.comment-list');
        commentList.appendChild(commentDiv);
    }
});
