import { call, put, takeLatest } from 'redux-saga/effects';

import fetchWeatherData from '../api';
import {
  FETCH_WEATHER_FAILED,
  FETCH_WEATHER_REQUESTED,
  FETCH_WEATHER_SUCCESS,
} from '../reducers/constants';

export function* fetchWeather(action) {
  const data = yield call(fetchWeatherData, action.data);

  if (data) {
    yield put({
      type: FETCH_WEATHER_SUCCESS,
      data,
    });

    action.data.successCallback && action.data.successCallback();
  } else {
    yield put({
      type: FETCH_WEATHER_FAILED,
    });
  }
}

function* watchFetchWeather() {
  yield takeLatest(FETCH_WEATHER_REQUESTED, fetchWeather);
}

export default watchFetchWeather;
