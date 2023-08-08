import { fetchData } from "../services/api";
import { createResource, renderMultipleResources } from "../services/ui";

window.addEventListener("load", async () => {
  const id = 1;
  const data = await fetchData(id);

  if (data) {
    const { post, user, postComments } = data;
    renderMultipleResources([
      createResource(
        "#post",
        (post) => `
        <h1>${post.title}</h1>
        <p>${post.body}</p>
      `,
        [post]
      ),
      createResource(
        "#postAuthor",
        (user) => `
        <h3>${user.name}</h3>
        <p>${user.email}</p>
      `,
        [user]
      ),
      createResource(
        "#postComments",
        (comment) => `
        <h2>${comment.name}</h2>
        <p>${comment.body}</p>
      `,
        postComments
      ),
    ]);
  }
});
