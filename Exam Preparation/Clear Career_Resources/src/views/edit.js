import { html } from '../lib.js';
import { getById, updateData } from '../data/data.js';
import { createSubmitHandler } from '../utils.js';

const editTemplate = (product, onEdit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Offer</h2>
        <form class="edit-form" @submit=${onEdit}>
            <input type="text" name="title" .value=${product.title} id="job-title" placeholder="Title" />
            <input type="text" name="imageUrl" .value=${product.imageUrl} id="job-logo" placeholder="Company logo url" />
            <input type="text" name="category" .value=${product.category} id="job-category" placeholder="Category" />
            <textarea id="job-description" name="description" .value=${product.description} placeholder="Description" rows="4" cols="50"></textarea>
            <textarea id="job-requirements" name="requirements" .value=${product.requirements} placeholder="Requirements" rows="4"
                cols="50"></textarea>
            <input type="text" name="salary" .value=${product.salary} id="job-salary" placeholder="Salary" />

            <button type="submit">post</button>
        </form>
    </div>
</section>
`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const product = await getById(id);

    ctx.render(editTemplate(product, createSubmitHandler(onEdit)));

    async function onEdit({ title, imageUrl, category, description, requirements, salary }) {
        if ([title, imageUrl, category, description, requirements, salary].some(p => p == '')) {
            return alert('All fields are required');
        }

        await updateData(id, { title, imageUrl, category, description, requirements, salary });
        ctx.page.redirect(`/details/${id}`);

    }
}