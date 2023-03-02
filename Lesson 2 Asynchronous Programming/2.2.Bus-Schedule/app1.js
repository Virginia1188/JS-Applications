function solve() {
    const divInfo = document.getElementById('info');
    const btnDepart = document.getElementById('depart');
    const btnArrive = document.getElementById('arrive');
    let currentStop = '';
    let nextId = 'depot';

    function depart() {
        let url = `http://localhost:3030/jsonstore/bus/schedule/${nextId}`;
        fetch(url)
            .then(res => res.json())
            .then(transformData)
            .catch((err) => {
                divInfo.textContent = 'Error';
                btnDepart.disabled = true;
                btnArrive.disabled = true;
            });
    };

    function arrive() {
        btnArrive.disabled = true;
        btnDepart.disabled = false;
        divInfo.textContent = `Arriving at ${currentStop}`;
    }

    function transformData(data) {
        currentStop = data.name;
        nextId = data.next;
        divInfo.textContent = `Next stop ${currentStop}`;    
        btnArrive.disabled = false;
        btnDepart.disabled = true;                
    }

    return {
        depart,
        arrive
    };
}

let result = solve();