import {fireEvent, render, screen} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import App from '../App';
import axios from 'axios';

vi.mock('axios');
const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
};

describe('Weather app', () => {
  it('should show an error when the location can not be found', async () => {
    mockedAxios.get.mockRejectedValue({response: {status: 404}});

    render(<App />);
    const input = screen.getByPlaceholderText(/enter location/i);

    fireEvent.change(input, {target: {value: 'UnknownCity'}});
    fireEvent.keyDown(input, {key: 'Enter'});

    const errorMessage = await screen.findByText('There is no such location');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should show if the weather data is desplayed correctly', async () => {
    const mockWeatherData = {
      name: 'London',
      weather: [{main: 'Cloud', icon: '04d'}],
      main: {temp: 16.68},
      dt: 1744969999,
      timezone: 3600,
    };

    mockedAxios.get.mockResolvedValue({data: mockWeatherData});
    render(<App />);
    const input = screen.getByPlaceholderText(/enter location/i);

    fireEvent.change(input, {target: {value: 'UnknownCity'}});
    fireEvent.keyDown(input, {key: 'Enter'});

    const cityName = await screen.findByText(/london/i);
    const weatherDescription = await screen.findByText('Cloud');
    const temperature = await screen.findByText('17 °C');
    const imageWeather = await screen.findByAltText('weather icon');
    const lastUpdated = await screen.findByText(/Last updated at/);

    expect(cityName).toBeInTheDocument();
    expect(weatherDescription).toBeInTheDocument();
    expect(temperature).toBeInTheDocument();
    expect(imageWeather).toBeInTheDocument();
    expect(lastUpdated).toBeInTheDocument();
  });
});
