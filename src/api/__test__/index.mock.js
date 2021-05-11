export const successResponse = {
  data: {
    cod: '200',
    message: 0,
    cnt: 40,
    list: [
      {
        dt: 1620756000,
        main: {
          temp: 287.28,
          feels_like: 286.81,
          temp_min: 282.57,
          temp_max: 287.28,
          pressure: 1008,
          sea_level: 1008,
          grnd_level: 949,
          humidity: 79,
          temp_kf: 4.71,
        },
        weather: [
          {
            id: 500,
            main: 'Rain',
            description: 'light rain',
            icon: '10d',
          },
        ],
        clouds: {
          all: 83,
        },
        wind: {
          speed: 5.47,
          deg: 251,
          gust: 11.25,
        },
        visibility: 10000,
        pop: 0.94,
        rain: {
          '3h': 1.59,
        },
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-11 18:00:00',
      },
      {
        dt: 1620766800,
        main: {
          temp: 284.47,
          feels_like: 283.93,
          temp_min: 281.89,
          temp_max: 284.47,
          pressure: 1010,
          sea_level: 1010,
          grnd_level: 950,
          humidity: 87,
          temp_kf: 2.58,
        },
        weather: [
          {
            id: 500,
            main: 'Rain',
            description: 'light rain',
            icon: '10n',
          },
        ],
        clouds: {
          all: 92,
        },
        wind: {
          speed: 4.2,
          deg: 244,
          gust: 10.22,
        },
        visibility: 10000,
        pop: 0.99,
        rain: {
          '3h': 1.41,
        },
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-11 21:00:00',
      },
      {
        dt: 1620777600,
        main: {
          temp: 281.76,
          feels_like: 279.29,
          temp_min: 281.76,
          temp_max: 281.76,
          pressure: 1012,
          sea_level: 1012,
          grnd_level: 950,
          humidity: 94,
          temp_kf: 0,
        },
        weather: [
          {
            id: 500,
            main: 'Rain',
            description: 'light rain',
            icon: '10n',
          },
        ],
        clouds: {
          all: 100,
        },
        wind: {
          speed: 4.32,
          deg: 247,
          gust: 11.05,
        },
        visibility: 10000,
        pop: 0.96,
        rain: {
          '3h': 0.96,
        },
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-12 00:00:00',
      },
    ],
    city: {
      id: 2867714,
      name: 'Munich',
      coord: {
        lat: 48.1374,
        lon: 11.5755,
      },
      country: 'DE',
      population: 1260391,
      timezone: 7200,
      sunrise: 1620704390,
      sunset: 1620758424,
    },
  },
};

export const expectedSuccessResult = {
  allDaysData: {
    'Tue May 11 2021': [
      {
        dt: 1620756000,
        main: {
          temp: 287.28,
          feels_like: 286.81,
          temp_min: 282.57,
          temp_max: 287.28,
          pressure: 1008,
          sea_level: 1008,
          grnd_level: 949,
          humidity: 79,
          temp_kf: 4.71,
        },
        weather: [
          {
            id: 500,
            main: 'Rain',
            description: 'light rain',
            icon: '10d',
          },
        ],
        clouds: {
          all: 83,
        },
        wind: {
          speed: 5.47,
          deg: 251,
          gust: 11.25,
        },
        visibility: 10000,
        pop: 0.94,
        rain: {
          '3h': 1.59,
        },
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-11 18:00:00',
      },
      {
        dt: 1620766800,
        main: {
          temp: 284.47,
          feels_like: 283.93,
          temp_min: 281.89,
          temp_max: 284.47,
          pressure: 1010,
          sea_level: 1010,
          grnd_level: 950,
          humidity: 87,
          temp_kf: 2.58,
        },
        weather: [
          {
            id: 500,
            main: 'Rain',
            description: 'light rain',
            icon: '10n',
          },
        ],
        clouds: {
          all: 92,
        },
        wind: {
          speed: 4.2,
          deg: 244,
          gust: 10.22,
        },
        visibility: 10000,
        pop: 0.99,
        rain: {
          '3h': 1.41,
        },
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-11 21:00:00',
      },
    ],
    'Wed May 12 2021': [
      {
        dt: 1620777600,
        main: {
          temp: 281.76,
          feels_like: 279.29,
          temp_min: 281.76,
          temp_max: 281.76,
          pressure: 1012,
          sea_level: 1012,
          grnd_level: 950,
          humidity: 94,
          temp_kf: 0,
        },
        weather: [
          {
            id: 500,
            main: 'Rain',
            description: 'light rain',
            icon: '10n',
          },
        ],
        clouds: {
          all: 100,
        },
        wind: {
          speed: 4.32,
          deg: 247,
          gust: 11.05,
        },
        visibility: 10000,
        pop: 0.96,
        rain: {
          '3h': 0.96,
        },
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-12 00:00:00',
      },
    ],
  },
  dates: ['Tue May 11 2021', 'Wed May 12 2021'],
  dailyAverages: {
    'Tue May 11 2021': {
      overallCast: 'Rain',
      overcast: 'light rain',
      temp: 286,
      pressure: 1009,
      humidity: 83,
    },
    'Wed May 12 2021': {
      overallCast: 'Rain',
      overcast: 'light rain',
      temp: 282,
      pressure: 1012,
      humidity: 94,
    },
  },
};
