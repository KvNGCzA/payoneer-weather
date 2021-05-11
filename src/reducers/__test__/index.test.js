import { FETCH_WEATHER_FAILED, FETCH_WEATHER_SUCCESS, TOGGLE_LOADING } from '../constants';
import reducer from '../index';

const initialState = {
  weatherData: {},
  loading: true,
};

describe('Reducer', () => {
  it('should return initial state', () => {
    // Act
    const result = reducer(undefined, {});

    // Assert
    expect(result).toEqual(initialState);
  });

  it('should return new state for FETCH_WEATHER_SUCCESS', () => {
    const expectedResult = {
      weatherData: { message: 'success' },
      loading: false,
    }
    // Act
    const result = reducer(undefined, {
      type: FETCH_WEATHER_SUCCESS,
      data: { message: 'success' },
    });

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should return current/initial state for FETCH_WEATHER_FAILED', () => {
    // Act
    const result = reducer(undefined, {
      type: FETCH_WEATHER_FAILED,
    });

    // Assert
    expect(result).toEqual({ ...initialState, loading: false });
  });

  it('should return new state for TOGGLE_LOADING', () => {
    const expectedResult = {
      weatherData: {},
      loading: false,
    }
    // Act
    const result = reducer(undefined, {
      type: TOGGLE_LOADING,
    });

    // Assert
    expect(result).toEqual(expectedResult);
  });
});
