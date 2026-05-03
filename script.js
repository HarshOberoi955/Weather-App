let apiKey = "374f5b7258c2fea2b013dbcf3fd09c4c"

async function getWeather(){

let city = document.getElementById("city").value

let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

let response = await fetch(url)

let data = await response.json()

displayWeather(data)

}

function displayWeather(data){

let result = document.getElementById("weatherResult")

if(data.cod != 200){
result.innerHTML = "❌ City not found"
return
}

let icon = data.weather[0].icon

result.innerHTML = `
<h2>${data.name}</h2>
<img src="https://openweathermap.org/img/wn/${icon}@4x.png">
<p>🤔 Feels Like: ${data.main.feels_like} °C</p>

<p>🌡 Temp: ${data.main.temp} °C</p>
<p>☁ Weather: ${data.weather[0].main}</p>
<p>💧 Humidity: ${data.main.humidity}%</p>
<p>🌬 Wind: ${data.wind.speed} m/s</p>
`

changeBackground(data.weather[0].main)

}

function changeBackground(weather){

let body = document.body

if(weather === "Clear"){
body.style.background = "linear-gradient(135deg,#fceabb,#f8b500)"
}

else if(weather === "Clouds"){
body.style.background = "linear-gradient(135deg,#bdc3c7,#2c3e50)"
}

else if(weather === "Rain"){
body.style.background = "linear-gradient(135deg,#4facfe,#00f2fe)"
}

}

function getLocationWeather(){

if(!navigator.geolocation){
alert("Geolocation is not supported by this browser")
return
}

navigator.geolocation.getCurrentPosition(async function(position){

let lat = position.coords.latitude
let lon = position.coords.longitude

let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

let response = await fetch(url)

let data = await response.json()

displayWeather(data)

},
function(){

alert("Location permission denied")

})

}

document.getElementById("city").addEventListener("keypress",function(e){

if(e.key === "Enter"){
getWeather()
}

})