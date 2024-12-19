// Fetch posts from JSONPlaceholder API
async function fetchPosts() {
     const response = await fetch('https://jsonplaceholder.typicode.com/posts');
     const posts = await response.json();
 
     const postsContainer = document.getElementById('posts-container');
     posts.slice(0, 5).forEach(post => {
         const postElement = document.createElement('div');
         postElement.classList.add('post');
         postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
         postsContainer.appendChild(postElement);
     });
 }
 
 // Call the function on page load
 window.onload = fetchPosts;
 