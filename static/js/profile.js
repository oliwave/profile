const API_URL = 'http://localhost:5001/api/user';
//const API_URL = 'https://profile-cs633.vercel.app/api/user';

document.addEventListener("DOMContentLoaded", () => {
  console.log("user id:", user_id);

  // 假设你已经在页面上获取到了当前登录的 userId（从 session 或者通过 API 请求）
const currentUserId = '当前登录用户的ID';  // 这个值应该从后端获取

// 假设页面 URL 的一部分是 userId
const profileUserId = window.location.pathname.split('/').pop();  // 获取当前页面的 userId

// 检查是否是自己的资料
if (currentUserId === profileUserId) {
    // 显示编辑按钮
    document.getElementById('editButton').style.display = 'block';
} else {
    // 隐藏编辑按钮
    document.getElementById('editButton').style.display = 'none';
}
});