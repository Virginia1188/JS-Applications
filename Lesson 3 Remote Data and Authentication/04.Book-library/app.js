function solve() {
    const form = document.querySelector('form');
    const btnLoad = document.getElementById('loadBooks');
    const tbody = document.querySelector('tbody');
    const btnSubmit = document.querySelector('form button');
    btnLoad.addEventListener('click', load);

    function load() {
        const childre = tbody.childNodes;
        Array.from(childre).forEach(c => c.remove());
        fetch('http://localhost:3030/jsonstore/collections/books')
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                Object.entries(data).forEach(e => {
                    const tr = createEl('tr', '', tbody);
                    const tdA = createEl('td', e[1].title, tr);
                    const tdT = createEl('td', e[1].author, tr);
                    const tdB = createEl('td', '', tr);
                    const btnEdit = createEl('button', 'Edit', tdB);
                    const btnDelete = createEl('button', 'Delete', tdB);

                    btnDelete.addEventListener('click', () => {
                        fetch(`http://localhost:3030/jsonstore/collections/books/${e[1]._id}`, {
                            method: 'delete'
                        });
                        tr.remove();
                    });

                    btnEdit.addEventListener('click', () => {

                        const h3 = document.querySelector('h3');
                        h3.textContent = 'Edit FORM';
                        const btnSubmit = document.querySelector('form button');
                        btnSubmit.textContent = 'Save';
                        const [inputT, inputA] = document.querySelectorAll('form input');
                        // console.log(inputs);
                        inputA.value = e[1].author;
                        inputT.value = e[1].title;

                        btnSubmit.addEventListener('click', () => {
                            fetch(`http://localhost:3030/jsonstore/collections/books/${e[1]._id}`, {
                                method: 'put',
                                headers: { 'Content-type': 'application/json' },
                                body: JSON.stringify({ author: `${inputA.value}`, title: `${inputT.value}` })
                            });
                            inputA.value = '';
                            inputT.value = '';
                            h3.textContent = 'FORM';
                            btnSubmit.textContent = 'Submit';
                            load();
                        });

                    });
                });
            });
    };


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const author = data.get('author');
        const title = data.get('title');

        if (author == '' || title == '') {
            return;
        }

        fetch('http://localhost:3030/jsonstore/collections/books', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ author: `${author}`, title: `${title}` })
        });
        load(); //do i need the load here?
        const clearInputs = document.querySelectorAll('form input');
        Array.from(clearInputs).forEach(i => {
            i.value = '';
        });
    });




    function createEl(type, content, parent) {
        const el = document.createElement(type);
        el.textContent = content;
        parent.appendChild(el);
        return el;
    }

}
solve();