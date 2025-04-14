
const input = document.querySelector('.in');
const btn = document.querySelector('.btn');
const info = document.querySelector('.info');

// یک تابع برای دریافت و نمایش اطلاعات آب و هوا
btn.addEventListener('click', () => {
    const city = input.value; // نام شهری که کاربر وارد کرده است
    const apiKey = 'fb44d97a64b15366f9a784d202afe7e0'; // کلید API خود را اینجا قرار دهید
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            let codeicon = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${codeicon}@2x.png`;
            const weatherDescription = data.weather[0].description;
            const temperature = Math.round(data.main.temp);
            const humidity = data.main.humidity;
            const cityname = data.name
            const country = data.sys.country
            info.innerHTML = `
                <h2>Weather in ${cityname}</h2>
                <p>country: ${country}<p>
                <p>Temperature: ${temperature} °C</p>
                <p>Humidity: ${humidity}%</p>
                <p>Description: ${weatherDescription}</p>
                <div class="weathericon"><img src="${iconUrl}" alt="Weather Icon"></div>
                
            `;
            console.log(data);
        })
        .catch(error => {
            info.innerHTML = `<p>Error: ${error.message}</p>`;
        });
});