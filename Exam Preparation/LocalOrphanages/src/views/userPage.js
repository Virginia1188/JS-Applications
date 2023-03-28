import { getMyProducts } from '../data/products.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';

const userPostTemplate = (allPosts) => html`
<section id="my-posts-page">
    <h1 class="title">My Posts</h1>

    <!-- Display a div with information about every post (if any)-->
    <div class="my-posts">
    ${allPosts.length > 0 ?
    html`${allPosts.map(postTemplate)}` :
    html`<h1 class="title no-posts-title">You have no posts yet!</h1>`}
    </div>

</section>`;

const postTemplate = (post) => html`
<div class="post">
    <h2 class="post-title">${post.title}</h2>
    <img class="post-image" src=${post.imageUrl} alt="Material Image">
    <div class="btn-wrapper">
        <a href="/${post._id}" class="details-btn btn">Details</a>
    </div>
</div>`;
export async function userPage(ctx){
    const id = ctx.params.id;
    const userData = getUserData();
    const allPosts = await getMyProducts(userData._id);
    ctx.render(userPostTemplate(allPosts));
}