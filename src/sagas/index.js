import { all, call, put, takeLatest } from "redux-saga/effects";
import { fetchWeatherData } from "../api";
import {
  FETCH_COUNTRY_CODES_REQUESTED,
  FETCH_REGIONS_REQUESTED,
  FETCH_WEATHER_FAILED,
  FETCH_WEATHER_REQUESTED,
  FETCH_WEATHER_SUCCESS,
} from "../reducers/data";

function* fetchWeather(action) {
  try {
    const data = yield call(fetchWeatherData, action.data);
    yield put({
      type: FETCH_WEATHER_SUCCESS,
      data,
    });
  } catch (e) {
    yield put({
      type: FETCH_WEATHER_FAILED,
      message: e.message,
    });
  }
}

function* watchFetchWeather() {
  yield takeLatest(FETCH_WEATHER_REQUESTED, fetchWeather);
}

// function* watchFetchRegions() {
//   yield takeLatest(FETCH_REGIONS_REQUESTED, fetchWeather);
// }

// function* watchFetchCountryCodes() {
//   yield takeLatest(FETCH_COUNTRY_CODES_REQUESTED, fetchWeather);
// }

function* rootSaga() {
  yield all([watchFetchWeather()]);
}

export default rootSaga;
