function student() {
    const inputs = document.querySelector('#form');
    const tbody = document.querySelector('tbody');
    const btn = document.getElementById('submit');

    const div = document.querySelector('.inputs');
    const clearInputs = div.childNodes;
    Array.from(clearInputs).forEach(i => {
        i.value = '';
    });

    fetch('http://localhost:3030/jsonstore/collections/students')
        .then(res => res.json())
        .then(render)
        .catch((err) => console.log(err));

    inputs.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(inputs);
        let firstName = data.get('firstName');
        let lastName = data.get('lastName');
        let num = data.get('facultyNumber');
        let grade = data.get('grade');
        if (firstName == '' || lastName == '' || num == '' || grade == '') {
            return;
        }

        fetch('http://localhost:3030/jsonstore/collections/students', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ firstName: `${firstName}`, lastName: `${lastName}`, facultyNumber: `${num.toString()}`, grade: `${grade}` }),
        });


    });
    function render(data) {
        const children = tbody.childNodes;
        Array.from(children).forEach(c => c.remove());

        Object.entries(data).forEach(e => {
            // console.log(e[1]);
            const tr = createEl('tr', '', tbody);
            const name = createEl('th', e[1].firstName, tr);
            const lname = createEl('th', e[1].lastName, tr);
            // console.log(e[1].firstName);
            // console.log(e[1].lastName);
            // console.log(e[1].facultyNumber);
            // console.log(e[1].grade);
            const fnum = createEl('th', e[1].facultyNumber, tr);
            const grade = createEl('th', e[1].grade, tr);
        });
    }

    function createEl(type, content, parent) {
        const el = document.createElement(type);
        el.textContent = content;
        parent.appendChild(el);
        return el;
    }
}




student();