import {
  FETCH_WEATHER_FAILED,
  FETCH_WEATHER_SUCCESS,
  TOGGLE_LOADING,
} from './constants';

const initialState = {
  weatherData: {},
  loading: true,
};

export default function reducer(state = initialState, action) {
  const newState = {
    ...state,
  };

  switch (action.type) {
    case FETCH_WEATHER_SUCCESS:
      newState.weatherData = action.data;
      newState.loading = false;

      return newState;
    case TOGGLE_LOADING:
      newState.loading = !newState.loading;

      return newState;
    case FETCH_WEATHER_FAILED:
      newState.loading = false;

      return newState;
    default:
      return newState;
  }
}
