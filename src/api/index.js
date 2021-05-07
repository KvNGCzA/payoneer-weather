import axios from "axios";


export const fetchWeatherData = async (data) => {
  try {
    const response = await axios
      .get(`http://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40`);
    const sanitizedData = {};
    const order = [];

    response.data.list.forEach(current => {
      const currentDate = new Date(current.dt_txt).toDateString();

      if (!sanitizedData[currentDate]) {
        order.push(currentDate);
        sanitizedData[currentDate] = [];
      }

      sanitizedData[currentDate].push(current);
    });

    return { sanitizedData, order };
  } catch(error) {
    console.log('error', error);
  }
};
