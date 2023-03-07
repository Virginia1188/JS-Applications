function attachEvents() {
    const btnLoad = document.getElementById('btnLoad');
    const btnCreate = document.getElementById('btnCreate');
    const ulPhonebook = document.getElementById('phonebook');
    const name = document.getElementById('person');
    const number = document.getElementById('phone');

    btnLoad.addEventListener('click', load);
    btnCreate.addEventListener('click', create);

    function load() {
        const children = ulPhonebook.childNodes;
        Array.from(children).forEach(c => c.remove());
       
        fetch('http://localhost:3030/jsonstore/phonebook')
            .then(res => res.json())
            .then(render)
            .catch((err) => console.log(err));

        function render(data) {
            
            Object.values(data).forEach(e => {
                console.log(e);
                const li = document.createElement('li');
                li.textContent = `${e.person}: ${e.phone}`;
                const btnDelete = document.createElement('button');
                li.appendChild(btnDelete);
                btnDelete.textContent = 'Delete';
                ulPhonebook.appendChild(li);
                btnDelete.addEventListener('click', () => {
                    fetch(`http://localhost:3030/jsonstore/phonebook/${e._id}`, {
                        method: 'delete',
                        headers: { 'Content-type': 'application/json' },
                    });
                    li.remove();

                });
            });
        };
    }

    function create() {
        fetch('http://localhost:3030/jsonstore/phonebook',{
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({person: `${name.value}`, phone: `${number.value}`}),
        });
        load();
        name.value = '';
        number.value = '';
    }
}


attachEvents();