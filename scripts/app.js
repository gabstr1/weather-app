const cityForm = document.querySelector("form");

const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const card = document.querySelector(".card");
const details = document.querySelector(".details");

const forecast = new Forecast();

const updateUI = (data) => {
  //destructure properties
  const { cityDets, weather } = data;

  //update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather[0].WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather[0].Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>`;

  //update the night/day & icon images

  const iconSrc = `img/icons/${weather[0].WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = null;
  if (weather.IsDayTime) {
    timeSrc = "img/night.svg";
  } else {
    timeSrc = "img/day.svg";
  }

  time.setAttribute("src", timeSrc);

  if (card.classList.contains("d-none")) {
    //remove d-none class if present
    card.classList.remove("d-none");
  }
};

cityForm.addEventListener("submit", (e) => {
  //prevent default action
  e.preventDefault();

  //get city value
  const city = cityForm.city.value.trim();
  cityForm.reset;

  //update the UI with a new city
  forecast
    .updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  //set local storage
  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  forecast
    .updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
