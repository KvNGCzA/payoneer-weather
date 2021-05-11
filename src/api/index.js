import axios from 'axios';
import { toast } from 'react-toastify';

const fetchWeatherData = async data => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${data.region},${data.countryCode}&units=${data.unit}&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40`
    );

    const allDaysData = getAllDaysData(response.data.list);
    const dates = Object.keys(allDaysData || {});

    return {
      allDaysData,
      dates,
      dailyAverages: getDailyAverages({ dates, allDaysData }),
    };
  } catch (error) {
    toast.error(
      window.navigator.onLine
        ? 'Error fetching weather data, please try again'
        : 'Please check your internet connection'
    );
  }
};

const getAllDaysData = data => {
  const allDaysData = {};

  data.forEach(current => {
    const currentDate = new Date(current.dt_txt).toDateString();

    if (!allDaysData[currentDate]) {
      allDaysData[currentDate] = [];
    }

    allDaysData[currentDate].push(current);
  });

  return allDaysData;
};

const getDailyAverages = ({ dates, allDaysData }) => {
  const dailyAverages = {};

  for (let x = 0; x < dates.length; x += 1) {
    const key = dates[x];
    const currentDayData = allDaysData[key];
    const numOfData = allDaysData[key].length;

    const {
      dayTotalTemp,
      dayTotalPressure,
      dayTotalHumidity,
      overallCast,
    } = extractDayData(currentDayData);

    const overcast = getOvercast({ currentDayData, overallCast });

    dailyAverages[key] = {
      overallCast,
      overcast,
      temp: Math.round(dayTotalTemp / numOfData),
      pressure: Math.round(dayTotalPressure / numOfData),
      humidity: Math.round(dayTotalHumidity / numOfData),
    };
  }

  return dailyAverages;
};

const getOvercast = ({ currentDayData, overallCast }) => {
  const filteredDays = currentDayData.filter(
    current => current.weather[0].main === overallCast
  );

  let j = 0;
  const dayCast = {};

  while (j < filteredDays.length) {
    const currentDayCast = filteredDays[j].weather[0].description;
    if (!dayCast[currentDayCast]) {
      dayCast[currentDayCast] = 0;
    }

    dayCast[currentDayCast] = dayCast[currentDayCast] + 1;

    j += 1;
  }

  return Object.keys(dayCast).reduce((a, b) =>
    dayCast[a] > dayCast[b] ? a : b
  );
};

const extractDayData = currentDayData => {
  let y = 0;
  let dayTotalTemp = 0;
  let dayTotalPressure = 0;
  let dayTotalHumidity = 0;
  const dayWeather = {};

  while (y < currentDayData.length) {
    dayTotalTemp += currentDayData[y].main.temp;
    dayTotalPressure += currentDayData[y].main.pressure;
    dayTotalHumidity += currentDayData[y].main.humidity;
    const currentDayMain = currentDayData[y].weather[0].main;

    if (!dayWeather[currentDayMain]) {
      dayWeather[currentDayMain] = 0;
    }

    dayWeather[currentDayMain] = dayWeather[currentDayMain] + 1;

    y += 1;
  }

  return {
    dayTotalTemp,
    dayTotalPressure,
    dayTotalHumidity,
    overallCast: Object.keys(dayWeather).reduce((a, b) =>
      dayWeather[a] > dayWeather[b] ? a : b
    ),
  };
};

export default fetchWeatherData;
