const API_KEY = '255ab47c33b843aa763667cb39ec7e59';

    if (localStorage.getItem('Data')) {
        createContent(JSON.parse(localStorage.getItem('Data')));
    }

    document.querySelector('form').addEventListener('submit', e => {
        e.preventDefault();
        
        let city = e.target.querySelector('input').value;
        console.log(city);

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=sp`)
        .then(res => res.json()
    )
        .then(res => {
            console.log(res)
            if(res.cod == 200){
                createContent(res);

                localStorage.setItem('Data', JSON.stringify(res));
                document.querySelector('#error').style.display = 'none';
            }else{
                document.querySelector('#error').style.display = 'block';
            }
        });
    });

function createContent (content) {
    document.querySelector('#cityname').innerHTML = content.name;
    document.querySelector('#now').innerHTML = content.main.temp + " °C";
    document.querySelector('#feel').innerHTML = content.main.feels_like + " °C";
    document.querySelector('#max').innerHTML = content.main.temp_max + " °C";
    document.querySelector('#min').innerHTML = content.main.temp_min + " °C";
    document.querySelector('#speed').innerHTML = content.wind.speed + " km/s";
    document.querySelector('#humidity').innerHTML = content.main.humidity + " %";
    document.querySelector('#pressure').innerHTML = content.main.pressure + " mb";
    document.querySelector('#weather').innerHTML = content.weather[0].description;
    document.querySelector('#icono').setAttribute('src',"https://openweathermap.org/img/w/"+content.weather[0].icon+".png");
    document.querySelector('.answer').style.display = 'block';


}