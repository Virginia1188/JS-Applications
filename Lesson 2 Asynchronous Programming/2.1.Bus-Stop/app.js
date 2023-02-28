function getInfo() {
    const stopID = document.getElementById('stopId').value;
    const stopName = document.getElementById('stopName');
    const ulBuses = document.getElementById('buses');
    ulBuses.textContent = '';
    let url = `http://localhost:3030/jsonstore/bus/businfo/${stopID}`;

    fetch(url)
        .then(check)
        .then(transformData)
        .catch((err)=> {
			stopName.textContent = 'Error';
        });
			

    function check(res) {
        if (res.status !== 200) {
            stopName.textContent = 'Error';
            return stopName;
        }
        return res.json();
    }

    function transformData(data){
        stopName.textContent = data.name;

        console.log(data);
        for (const [busId,time] of Object.entries(data.buses)) {
            const li = document.createElement('li');
            li.textContent = `Bus ${busId} arrives in ${time} minutes`;
            ulBuses.appendChild(li);
        }
    }
}