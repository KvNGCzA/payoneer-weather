const dailyAverage = {
  humidity: 95,
  overallCast: 'Clouds',
  overcast: 'overcast clouds',
  pressure: 1011,
  temp: 47,
};

const getEightDataSets = date => {
  let x = 0;
  const result = [];
  let finalDate = new Date(date).toLocaleDateString();
  finalDate = finalDate.replace(/\//g, '-');

  while (x < 8) {
    const time = x * 3;
    const hour = time < 10 ? `0${time}` : time;

    result.push({
      clouds: { all: 100 },
      dt: 1620950400,
      dt_txt: `${finalDate} 00:${hour}:00`,
      main: {
        feels_like: 45.23,
        grnd_level: 948,
        humidity: 94,
        pressure: 1010,
        sea_level: 1010,
        temp: 47.35,
        temp_kf: 0,
        temp_max: 47.35,
        temp_min: 47.35,
      },
      pop: 0.49,
      rain: { '3h': Math.random() },
      sys: { pod: 'n' },
      visibility: 10000,
      weather: [
        { description: 'light rain', icon: '10n', id: 500, main: 'Rain' },
      ],
      wind: { speed: 4.81, deg: 229, gust: 11.48 },
    });
    x += 1;
  }

  return result;
};

const initialState = {
  weatherData: {
    dailyAverages: {
      'Sun May 09 2021': dailyAverage,
      'Mon May 10 2021': dailyAverage,
      'Tue May 11 2021': dailyAverage,
      'Wed May 12 2021': dailyAverage,
      'Thu May 13 2021': dailyAverage,
    },
    fiveDayData: {
      'Sun May 09 2021': getEightDataSets('Sun May 09 2021'),
      'Mon May 10 2021': getEightDataSets('Mon May 10 2021'),
      'Tue May 11 2021': getEightDataSets('Tue May 11 2021'),
      'Wed May 12 2021': getEightDataSets('Wed May 12 2021'),
      'Thu May 13 2021': getEightDataSets('Thu May 13 2021'),
    },
    order: [
      'Sun May 09 2021',
      'Mon May 10 2021',
      'Tue May 11 2021',
      'Wed May 12 2021',
      'Thu May 13 2021',
    ],
  },
  loading: false,
};

export default initialState;
