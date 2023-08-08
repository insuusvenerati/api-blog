const API_URL = process.env.API_URL;

export async function getResource(resource) {
  const response = await fetch(`${API_URL}/${resource}`);
  return await response.json();
}

export async function getUserWithPosts(userId) {
  const posts = await getResource("posts");
  const users = await getResource("users");

  const user = users.find((user) => user.id === userId);
  const userPosts = posts.filter((post) => post.userId === userId);

  return {
    ...user,
    posts: userPosts,
  };
}

export async function fetchData(id) {
  try {
    const [posts, comments, post, user, postComments] = await Promise.all([
      getResource("posts"),
      getResource("comments"),
      getResource(`posts/${id}`),
      getResource(`users/${id}`),
      getResource(`posts/${id}/comments`),
    ]);
    return { posts, comments, post, user, postComments };
  } catch (error) {
    console.error(error);
  }
}
