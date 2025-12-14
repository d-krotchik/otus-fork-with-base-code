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
    el.innerHTML = `
      <h2 class="subtitle">Погода в городе ${weatherInfo["name"]}</h2>
      <div class="row">
        <div class="card">Температура: ${weatherInfo["temp"]}</div>
        <div class="card">Ощущается как: ${weatherInfo["feels_like"]}</div>
        <div class="card">Давление: ${weatherInfo["pressure"]}</div>
        <div class="card">Влажность: ${weatherInfo["humidity"]}</div>
      </div>
    `;
  }

  function getWeather() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = {
          temp: -2,
          feels_like: -4,
          humidity: 85,
          pressure: 1013,
          name: "Москва"
        };
        resolve(mockData);
      }, 2000);
    });
  }

  formEl.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formElement = e.target;
    const inputElement = formElement.querySelector("input");
    inputElement.value = "";

    const weatherInfo = await getWeather();
    showWeather(weatherInfoEl, weatherInfo);
  });

}