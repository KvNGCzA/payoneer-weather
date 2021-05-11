import { expectSaga } from 'redux-saga-test-plan';

import { fetchWeather } from '../';
import fetchWeatherData from '../../api';

jest.mock('../../api/', () => jest.fn());

describe('Test sagas', () => {
  it('should put FETCH_WEATHER_SUCCESS when api call is successful', () => {
    // Arrange
    fetchWeatherData.mockResolvedValue('success');

    // Act & Assert
    return expectSaga(fetchWeather, {
      data: {
        region: 'Munich',
        unit: 'imperial',
        countryCode: 'de',
        chartDate: true,
        successCallback: jest.fn(),
      },
    })
      .put({
        type: 'FETCH_WEATHER_SUCCESS',
        data: 'success',
      })
      .run(false);
  });

  it('should put FETCH_WEATHER_FAILED when api call fails', () => {
    return (
      // Act & Assert
      expectSaga(fetchWeather, {
        data: { failureCallback: jest.fn() },
      })
        .put({
          type: 'FETCH_WEATHER_FAILED',
        })
        .run(false)
    );
  });
});
