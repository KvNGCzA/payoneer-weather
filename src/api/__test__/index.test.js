import axios from 'axios';
import { toast } from 'react-toastify';
import fetchWeatherData from '../';
import { successResponse, expectedSuccessResult } from './index.mock';

jest.mock('react-toastify', () => ({
  toast: { error: jest.fn() },
}));

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('fetchWeatherData', () => {
  it('should format api response correctly when api call is successful', async () => {
    // Arrange
    axios.get.mockResolvedValue(successResponse);

    // Act
    const response = await fetchWeatherData({
      region: '',
      countryCode: '',
      unit: '',
    });

    // Assert
    expect(response).toEqual(expectedSuccessResult);
  });

  it('should call toast.error when there is a failure in api call', async () => {
    // Act
    await fetchWeatherData();

    // Assert
    expect(toast.error).toHaveBeenCalled();
  });
});
