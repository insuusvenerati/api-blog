import { fetchData } from "../services/api";
import { createResource, renderMultipleResources } from "../services/ui";

window.addEventListener("load", async () => {
  const id = 1;
  const data = await fetchData(id);

  if (data) {
    const { posts, comments } = data;
    renderMultipleResources([
      createResource(
        "#posts",
        (post) => `
        <a href="/post">${post.title}</a>
        <p>${post.body}</p>
      `,
        posts
      ),
      createResource(
        "#comments",
        (comment) => `
        <h2>${comment.name}</h2>
        <p>${comment.body}</p>
      `,
        comments
      ),
    ]);
  }
});
