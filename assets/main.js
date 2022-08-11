
var weatherInfo = {}
const randomCountryList = ['Tiaret', 'Hechi', 'Madrid', 'Chelsea', 'Arsenal', 'Munich', 'Hanoi', 'Singapore','Africa','Barcelona']
let shuffled 
let selectedCountry
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// Get all component
const mainBackground = $('.main-background img')
const mainTemp = $('.main-section-detail .temp')
const countryName = $('.country .country-name')
const dateTime = $('.country .country-time')
const weatherIcon = $('.main-section-detail .weather img')
const mainWeather = $('.weather .info')

const randomCountry = $('.detail-section .recom-list')
const inputField = $('.detail-section input')
const searchBtn = $('.detail-section .search-icon ')
const weatherDetails = $$('.parameter')


//render view after input
randomCountry.addEventListener('click', (e)=> {
    console.log(e.target.closest('li').innerText)
    inputField.value = e.target.closest('li').innerText
})

function weatherGet(url){
    shuffled = randomCountryList.sort(() => 0.5 - Math.random());
    selectedCountry = shuffled.slice(0,4)
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      weatherInfo = data
      renderView(data)
      console.log(weatherInfo)
  });  
}


function renderView(data) {
    let am_pm = ''
    mainTemp.innerHTML = `${(data.main.temp - 273).toFixed(0)}<span>°</span>`
    countryName.innerText = `${data.name}`
    weatherIcon.src = `./assets/img/w${data.weather[0].icon}.png`
    mainWeather.innerText = data.weather[0].description.charAt(0).toUpperCase()+data.weather[0].description.slice(1)
    weatherDetails[0].innerText = `${data.clouds.all} %`
    weatherDetails[1].innerText = `${data.wind.speed} m/s`
    weatherDetails[2].innerText = `${data.main.humidity} %`
    weatherDetails[3].innerText = `${data.main.pressure} hpa`
    
    randomCountry.innerHTML = selectedCountry.map(country => `<li>${country}<li/>`).join('')
    let dt = data.dt
    let day = new Date(dt*1000)
    if(day.getHours() > 12) {
        am_pm = 'night.png'
    }
    else am_pm = 'day.png'
    mainBackground.src = `./assets/img/${data.weather[0].description.toLowerCase()}/${am_pm}`
    dateTime.innerText = day.toLocaleTimeString() + '\n' + day.toLocaleDateString()
}
// default load
let previousCountry = 'Hanoi'
let url = `https://api.openweathermap.org/data/2.5/weather?q=${previousCountry}&appid=dd19f41655d83b9a4c0675e244c3243e`
weatherGet(url)
 
// search by button
searchBtn.addEventListener('click', ()=>{
    apiConstantCall() 
})

// press enter to search
inputField.addEventListener('keyup', (e)=>{
    if (e.key === "Enter") {
        apiConstantCall()
    }
})

// search if input field has changed
function apiConstantCall(){
    if(inputField.value != previousCountry) {
        previousCountry = inputField.value
        url = `https://api.openweathermap.org/data/2.5/weather?q=${previousCountry}&appid=dd19f41655d83b9a4c0675e244c3243e`
        weatherGet(url)
         
    }
}


