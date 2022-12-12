var selectcity = document.querySelector("#pushingcity");
var search1 = document.querySelector("#forthesearch");
var btnclear = document.querySelector("#clearbtn");
var prevcities = document.querySelector("#historyfinder");
var weathertoday = document.querySelector("#todayweather");
var dayforec = document.querySelector("#dayforec");
var searchesprev = [];

//function for weather dashboard display

function dashboard(event) {
    event.preventDefault();
    var cities = selectcity.value;
    weatherforc(cities);
}
//acquiring api of openweathermap for the cities and forecast data
function weatherforc(cityName) {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=cf52bda9505d69567000a24e4d4a1ffb&units=imperial`;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (nowData) {
            console.log(nowData);
            var forecdata = `https://api.openweathermap.org/data/2.5/forecast?lat=${nowData.coord.lat}&lon=${nowData.coord.lon}&appid=cf52bda9505d69567000a24e4d4a1ffb&units=imperial`;
            fetch(forecdata)
                .then(function (response) {
                    return response.json();
                })
                .then(function (forthedata) {
                    if (searchesprev.includes(nowData.name) === false) {
                        searchesprev.push(nowData.name);
                        //storing city searches
                        localStorage.setItem("city", JSON.stringify(searchesprev));
                    }
                    citydisplay();
                    console.log(forthedata);
                    //making list of temperature, speed, and humitdity and dates accordingly
                    weathertoday.innerHTML = 
                    `<ul>
        <li class="title ">${nowData.name}: <span> ${moment(nowData.dt,"X").format(" MM/DD/YYYY")} </span></li>
        <li><img src ="http://openweathermap.org/img/wn/${nowData.weather[0].icon}@2x.png" /></li>
        <li>Temp: ${Math.floor(nowData.main.temp) + "&#176F"}</li>
        <li>Max Temp: ${Math.floor(nowData.main.temp_max) + "&#176F"}</li>
        <li>Min Temp: ${Math.floor(nowData.main.temp_min) + "&#176F"}</li>
        <li>Humidity: ${nowData.main.humidity}</li>
                     </ul>`;
                });
        });
}
//creating access of deployment from previous searches of cities 
function citydisplay() {
    if (localStorage.getItem("city")) {
        searchesprev = JSON.parse(localStorage.getItem("city"));
    }
    var citiescont = "";
    for (var i = 0; i < searchesprev.length; i++) {
        citiescont =
            citiescont +
            `<button class="button column search-1" type="submit">${searchesprev[i]}</button>`;
    }
    prevcities.innerHTML = citiescont;
    var searching = document.querySelectorAll(".search-1");
    for (var i = 0; i < searching.length; i++) {
        searching[i].addEventListener("click", function () {
            weatherforc(this.textContent);
        });
    }
}
citydisplay();

search1.addEventListener("submit", dashboard); 

//making function and button to clear the history of previous searches
function clearingthehist() {
    localStorage.clear();
    prevcities.innerHTML = "";
    searchesprev = [];
}
btnclear.addEventListener("click", function () {
    clearingthehist();
});
