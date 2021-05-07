import { FETCH_WEATHER_SUCCESS } from "./data";

const initialState = { weatherData: [] };

export default function reducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case FETCH_WEATHER_SUCCESS:
      newState.weatherData = action.data;
      return newState;
    default:
      return newState;
  }
}
