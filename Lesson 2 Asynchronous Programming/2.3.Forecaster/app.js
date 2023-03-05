function attachEvents() {

    const current = document.getElementById('current');
    const upcoming = document.getElementById('upcoming');
    const btnGet = document.getElementById('submit');
    const forecast = document.getElementById('forecast');
    const location = document.getElementById('location');
    // console.log("TODO...");

    btnGet.addEventListener('click', getWeather);
    // let myLoc;
    const symbols = {
        'Sunny': '&#x2600;',
        'Partly sunny': '&#x26C5;', //⛅
        'Overcast': '&#x2601;', // ☁
        'Rain': '&#x2614;', // ☂
        'Degrees': '&#176;',   // °

    };

    function getWeather() {
        const url = 'http://localhost:3030/jsonstore/forecaster/locations';
        forecast.style.display = 'block';
        fetch(url)
            .then(res => res.json())
            .then(findLocation)
            .catch((err) => {
                current.textContent = 'Error';
            });

        function findLocation(data) {
            let myLoc = data.find(l => l.name == location.value);

            const urlCurrent = `http://localhost:3030/jsonstore/forecaster/today/${myLoc.code}`;
            const urlThreeDay = `http://localhost:3030/jsonstore/forecaster/upcoming/${myLoc.code}`;

            fetch(urlCurrent)
                .then(res => res.json())
                .then(currentWeather);

            fetch(urlThreeDay)
                .then(res => res.json())
                .then(threeDayWeather);

            function currentWeather(data) {
                const div = create('div', '', current, 'forecasts');
                const spanSymbol = create('span', '', div, 'condition symbol');
                spanSymbol.innerHTML = symbols[data.forecast.condition];
                const spanCondition = create('span', '', div, 'condition');
                const spanLoc = create('span', data.name, spanCondition, 'forecast-data');
                const spanDegrees = create('span', '', spanCondition, 'forecast-data');
                spanDegrees.innerHTML = `${data.forecast.low}${symbols.Degrees}/${data.forecast.high}${symbols.Degrees}`;
                const span = create('span', data.forecast.condition, spanCondition, 'forecast-data');


            }

            function threeDayWeather(data){
                const div = create('div','',upcoming,'forecast-info');
                Object.entries(data.forecast).forEach((x)=>{
                    let current = x[1];
                    const span = create('span','',div,'upcoming');
                    const spanSymbol = create('span','',span,'symbol');
                    spanSymbol.innerHTML = symbols[current.condition];
                    const spanDegrees = create('span','',span,'forecast-data');
                    spanDegrees.innerHTML = `${current.low}${symbols.Degrees}/${current.high}${symbols.Degrees}`;
                    const spanWeather = create('span',current.condition,span,'forecast-data');
                });
            }

        }

        function create(type, value, parent, classType) {
            const el = document.createElement(type);
            el.textContent = value;
            parent.appendChild(el);
            el.classList = classType;
            return el;
        }
    }
}

attachEvents();