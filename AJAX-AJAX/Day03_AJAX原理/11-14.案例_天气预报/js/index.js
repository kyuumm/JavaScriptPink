/**
 * 目标1：默认显示-北京市天气
 *  1.1 获取北京市天气数据
 *  1.2 数据展示到页面
 */

function getWeather(cityCode) {
  myAxios({
    url: 'http://hmajax.itheima.net/api/weather',
    method: 'GET',
    params: {
      city: cityCode
    }
  }).then(result => {
    console.log(result.data);
    const wObj = result.data;

    const title = document.querySelector('.title');
    title.innerHTML = `
     <span class="dateShort">${wObj.dateShort}</span>
        <span class="calendar">农历&nbsp;
          <span class="dateLunar">${wObj.dateLunar}</span>
        </span>
    `

    document.querySelector('.area').innerHTML = wObj.area

    const weatherBox = document.querySelector('.weather-box');
    weatherBox.innerHTML = `
     <div class="tem-box">
        <span class="temp">
          <span class="temperature">${wObj.temperature}</span>
          <span>°</span>
        </span>
      </div>
      <div class="climate-box">
        <div class="air">
          <span class="psPm25">${wObj.psPm25}</span>
          <span class="psPm25Level">${wObj.psPm25Level}</span>
        </div>
        <ul class="weather-list">
          <li>
            <img src="${wObj.weatherImg}" class="weatherImg" alt="">
            <span class="weather">${wObj.weather}</span>
          </li>
          <li class="windDirection">${wObj.windDirection}</li>
          <li class="windPower">${wObj.windPower}</li>
        </ul>
      </div>
    `

    const todayWeather = document.querySelector('.today-weather')
    todayWeather.innerHTML = `
      <div class="range-box">
        <span>今天：</span>
        <span class="range">
          <span class="weather">${wObj.weather}</span>
          <span class="temNight">${wObj.todayWeather.temNight}</span>
          <span>-</span>
          <span class="temDay">${wObj.todayWeather.temDay}</span>
          <span>℃</span>
        </span>
      </div>
      <ul class="sun-list">
        <li>
          <span>紫外线</span>
          <span class="ultraviolet">${wObj.todayWeather.ultraviolet}</span>
        </li>
        <li>
          <span>湿度</span>
          <span class="humidity">${wObj.todayWeather.humidity}</span>%
        </li>
        <li>
          <span>日出</span>
          <span class="sunriseTime">${wObj.todayWeather.sunriseTime}</span>
        </li>
        <li>
          <span>日落</span>
          <span class="sunsetTime">${wObj.todayWeather.sunsetTime}</span>
        </li>
      </ul>
    `

    const dayForecast = wObj.dayForecast;
    const dayForecastStr = dayForecast.map(element => {
      return `
      <li class="item">
          <div class="date-box">
            <span class="dateFormat">${element.dateFormat}</span>
            <span class="date">${element.date}</span>
          </div>
          <img src="${element.weatherImg}" alt="" class="weatherImg">
          <span class="weather">${element.weather}</span>
          <div class="temp">
            <span class="temNight">${element.temNight}</span>-
            <span class="temDay">${element.temDay}</span>
            <span>℃</span>
          </div>
          <div class="wind">
            <span class="windDirection">${element.windDirection}</span>
            <span class="windPower">&lt;${element.windPower}</span>
          </div>
        </li>
        `
    }).join('')

    document.querySelector('.week-wrap').innerHTML = dayForecastStr

  }).catch({

  })
}


//第一次进入网页就要调用
getWeather('110100');


// 2
document.querySelector('.search-city').addEventListener('input', (e) => {
  console.log(e.target.value);
  myAxios({
    url: 'http://hmajax.itheima.net/api/weather/city',
    params: {
      city: e.target.value
    }

  }).then(result => {
    console.log(result);

    const cityList = result.data
    const cityListStr = cityList.map(item => {
      return `
      <li class="city-item" data-code="${item.code}">${item.name}</li>
      `
      //这里没有用转义符，嗯。
    }).join('')

    document.querySelector('.search-list').innerHTML = cityListStr
  })
})


//3切换城市天气
//获取城市code，切换天气

document.querySelector('.search-list').addEventListener('click', e => {
  if (e.target.classList.contains('city-item')) {
    getWeather(e.target.dataset.code)

    document.querySelector('.search-city').value = '';
  }

})