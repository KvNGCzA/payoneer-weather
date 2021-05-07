import axios from "axios";


export const fetchWeatherData = async (data) => {
  try {
    const response = await axios
      .get(`http://api.openweathermap.org/data/2.5/forecast?q=${data.state},${data.countryCode}&units=${data.unit}&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40`);
    const fiveDayData = {};
    const dailyAverages = {};
    const order = [];

    response.data.list.forEach(current => {
      const currentDate = new Date(current.dt_txt).toDateString();

      if (!fiveDayData[currentDate]) {
        order.push(currentDate);
        fiveDayData[currentDate] = [];
      }

      fiveDayData[currentDate].push(current);
    });

    for(let x = 0; x < order.length; x += 1) {
      let y = 0;
      let dayTempAvg = 0;
      let dayPressureAvg = 0;
      let dayHumidityAvg = 0;
      const dayWeather = {};
      const dayCast = {};

      const key = order[x];
      const currentDay = fiveDayData[key];
      const numOfData = fiveDayData[key].length;
      
      while(y < currentDay.length) {
        dayTempAvg += currentDay[y].main.temp;
        dayPressureAvg += currentDay[y].main.pressure;
        dayHumidityAvg += currentDay[y].main.humidity;
        const currentDayMain = currentDay[y].weather[0].main;
        const currentDayCast = currentDay[y].weather[0].description;

        if (!dayWeather[currentDayMain]) {
          dayWeather[currentDayMain] = 0;
        }

        dayWeather[currentDayMain] = dayWeather[currentDayMain] + 1
        dayCast[currentDayCast] = dayWeather[currentDayCast] + 1

        y += 1;
      }

      dailyAverages[key] = {
        temp: Math.round(dayTempAvg/numOfData),
        pressure: Math.round(dayPressureAvg/numOfData),
        humidity: Math.round(dayHumidityAvg/numOfData),
        // If there is a draw the select last one, i.e if Clouds = 2 and Rain = 2 select Rain
        overall: Object.keys(dayWeather).reduce((a, b) => dayWeather[a] > dayWeather[b] ? a : b),
        cast: Object.keys(dayCast).reduce((a, b) => dayCast[a] > dayCast[b] ? a : b),
      }
      
    }

    return { fiveDayData, order, dailyAverages };
  } catch(error) {
    console.log('error', error);
  }
};
