import axios from "axios";
import { toast } from "react-toastify";

export const fetchWeatherData = async (data) => {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${data.state},${data.countryCode}&units=${data.unit}&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40`
    );
    const fiveDayData = {};
    const order = [];

    response.data.list.forEach((current) => {
      const currentDate = new Date(current.dt_txt).toDateString();

      if (!fiveDayData[currentDate]) {
        order.push(currentDate);
        fiveDayData[currentDate] = [];
      }

      fiveDayData[currentDate].push(current);
    });

    return {
      fiveDayData,
      order,
      dailyAverages: getDailyAverages(order, fiveDayData),
    };
  } catch (error) {
    toast.error("Error fetching weather data");
  }
};

const getDailyAverages = (order, fiveDayData) => {
  const dailyAverages = {};

  for (let x = 0; x < order.length; x += 1) {
    const key = order[x];
    const currentDayData = fiveDayData[key];
    const numOfData = fiveDayData[key].length;

    const {
      dayTotalTemp,
      dayTotalPressure,
      dayTotalHumidity,
      overallCast,
    } = extractCurrentDayData(currentDayData);

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
  const filteredDay = currentDayData.filter(
    (current) => current.weather[0].main === overallCast
  );

  let j = 0;
  const dayCast = {};

  while (j < filteredDay.length) {
    const currentDayCast = filteredDay[j].weather[0].description;
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

const extractCurrentDayData = (currentDayData) => {
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
