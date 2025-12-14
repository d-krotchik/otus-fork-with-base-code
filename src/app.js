export function weatherApp(el) {
  el.innerHTML = `
    <div class="container">
      <h1 class="title">Прогноз погоды</h1>
      <form>
        <input
          id="cityName"
          placeholder="Введите название города"
          required
          autofocus
        />
        <button>Получить прогноз погоды</button>
      </form>
      
      <div id="weather-info"></div>
    </div>
  `;

  const formEl = document.querySelector("form");
  const weatherInfoEl = document.querySelector("#weather-info");

  function showWeather(el, weatherInfo) {
    if(weatherInfo["cod"] !=="404" ) {
      el.innerHTML = `
      <h2 class="subtitle">Погода в городе ${weatherInfo["name"]}</h2>
      <div class="row">
        <div class="card">Температура: ${weatherInfo["main"]["temp"]}</div>
        <div class="card">Ощущается как: ${weatherInfo["main"]["feels_like"]}</div>
        <div class="card">Давление: ${weatherInfo["main"]["pressure"]}</div>
        <div class="card">Влажность: ${weatherInfo["main"]["humidity"]}</div>
      </div>
    `;
    } else {
      el.innerHTML = `<div class="error-message">Город не найден</div>`
    }
  }

  async function getWeather(cityName) {
    const APP_ID = "97d93f1704dcb8e35dd2045c8e75710d";
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${APP_ID}`
    );
    return await response.json();
  }

  formEl.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formElement = e.target;
    const inputElement = formElement.querySelector("input");
    const cityName = inputElement.value;
    inputElement.value = "";

    const weatherInfo = await getWeather(cityName);
    showWeather(weatherInfoEl, weatherInfo);
  });

}