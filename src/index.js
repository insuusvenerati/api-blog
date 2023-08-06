import "@picocss/pico/css/pico.min.css";
import "./css/styles.css";

// Business Logic

const API_URL = process.env.API_URL;

async function getResource(resource) {
  const response = await fetch(`${API_URL}/${resource}`);
  return await response.json();
}

async function getUserWithPosts(userId) {
  const posts = await getResource("posts");
  const users = await getResource("users");

  const user = users.find((user) => user.id === userId);
  const userPosts = posts.filter((post) => post.userId === userId);

  return {
    ...user,
    posts: userPosts,
  };
}

// UI Logic //

window.addEventListener("load", async () => {
  // Home page
  const posts = await getResource("posts");
  const comments = await getResource("comments");
  const postsEl = document.querySelector("#posts");
  const commentsEl = document.querySelector("#comments");

  const userTest = await getUserWithPosts(1);
  console.log(userTest);

  // Post page
  const id = 1;
  const [post, user, postComments] = await Promise.all([
    getResource(`posts/${id}`),
    getResource(`users/${id}`),
    getResource(`posts/${id}/comments`),
  ]);

  const postCommentsEl = document.querySelector("#postComments");
  const postAuthorEl = document.querySelector("#postAuthor");
  const postEl = document.querySelector("#post");

  if (postsEl) {
    posts.forEach((post) => {
      const postEl = document.createElement("div");
      postEl.classList.add("post");
      postEl.innerHTML = `
        <a href="/post">${post.title}</a>
        <p>${post.body}</p>
      `;
      postsEl.appendChild(postEl);
    });
  }

  if (commentsEl) {
    comments.forEach((comment) => {
      const commentEl = document.createElement("div");
      commentEl.classList.add("comment");
      commentEl.innerHTML = `
        <h2>${comment.name}</h2>
        <p>${comment.body}</p>
      `;
      commentsEl.appendChild(commentEl);
    });
  }

  if (postEl) {
    postEl.innerHTML = `
      <h1>${post.title}</h1>
      <p>${post.body}</p>
    `;
  }

  if (postAuthorEl) {
    postAuthorEl.innerHTML = `
      <h3>${user.name}</h3>
      <p>${user.email}</p>
    `;
  }

  if (postCommentsEl) {
    postComments.forEach((comment) => {
      const commentEl = document.createElement("div");
      commentEl.classList.add("comment");
      commentEl.innerHTML = `
        <h2>${comment.name}</h2>
        <p>${comment.body}</p>
      `;
      postCommentsEl.appendChild(commentEl);
    });
  }
});
