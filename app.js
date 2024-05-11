const apiKey = "0606af1b42f8fbd4e4e0ee034e77bfbf";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search input')
const searchBtn = document.querySelector('.search button')
const weatherIcon = document.querySelector('.weather-icon')
const temp = document.querySelector('.temp')

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    if (response.status == 404) {
        document.querySelector('.error').style.display = 'block'
        document.querySelector('.weather').style.display = 'none'
    } else {
        const data = await response.json()
        console.log("🚀 ~ checkWeather ~ data:", data)
        const cityName = document.querySelector('.city')
        cityName.innerText = data.name
        const temp = document.querySelector('.temp')
        temp.innerText = Math.round(data.main.temp) + '°C'
        const humidity = document.querySelector('.humidity')
        humidity.innerText = data.main.humidity + '%'
        const wind = document.querySelector('.wind')
        wind.innerText = data.wind.speed + 'km/h'

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = './images/clouds.png'
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = './images/clear.png'
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = './images/rain.png'
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = './images/drizzle.png'
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = './images/mist.png'
        }
        document.querySelector('.weather').style.display = 'block'
        document.querySelector('.error').style.display = 'none'

    }

}

searchBtn.addEventListener('click', () => {
    if (searchBox.value.trim() === '') {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    } else {
        checkWeather(searchBox.value);
    }
});

searchBox.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        if (searchBox.value.trim() === '') {
            document.querySelector('.error').style.display = 'block';
            document.querySelector('.weather').style.display = 'none';
        } else {
            checkWeather(searchBox.value);
        }
    }
});

