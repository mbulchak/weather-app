import {useEffect, useState} from 'react';
import '@mantine/core/styles.css';
import './App.css';
import axios from 'axios';
import {GeneralType} from './types/GeneralType';
import {Image, Input, MantineProvider, Text} from '@mantine/core';

function App() {
  const [weatherData, setWeatherData] = useState<GeneralType | null>(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  const searchWeatherLocation = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const cacheKey = `weather-${location}`;
      const cache = localStorage.getItem(cacheKey);

      if (cache) {
        setWeatherData(JSON.parse(cache));
        setLocation('');
        return;
      }

      axios
        .get(url)
        .then((response) => {
          localStorage.setItem(cacheKey, JSON.stringify(response.data));
          setWeatherData(response.data);
          setLocation('');
          setError('');
        })
        .catch((error) => {
          if (error.response) {
            switch (error.response.status) {
              case 400:
                setError('Please, write the location');
                break;

              case 401:
              case 403:
                setError('Unauthorized access');
                break;

              case 404:
                setError('There is no such location');
                break;

              case 500:
                setError('Server error, try again later');
                break;

              default:
                setError(`Error: ${error.response.status}`);
            }
          } else {
            setError('Network error, please try again.');
          }
        });
    }
  };

  const timeUpdated = (dt: number, timezone: number) => {
    const localTime = new Date((dt + timezone) * 1000);

    return localTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  };

  useEffect(() => {
    const timeout = setInterval(() => {
      Object.keys(localStorage)
        .filter((key) => key.startsWith('weather-'))
        .forEach((key) => {
          localStorage.removeItem(key);
        });
        
      setWeatherData(null);
    }, 300000);

    return () => clearInterval(timeout);
  }, []);

  return (
    <>
      <MantineProvider>
        <div className='h-screen flex justify-center items-center'>
          <div className='h-[450px] w-[500px] flex flex-col gap-[30px] items-center'>
            <div className='flex flex-col gap-[15px]'>
              <Input
                variant='filled'
                size='md'
                radius='xl'
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                onKeyDownCapture={searchWeatherLocation}
                placeholder='Enter Location'
                className='w-[500px]'
                autoFocus
              />

              {error && (
                <Text c='#c91a25' size='md' fw={500}>
                  {error}
                </Text>
              )}
            </div>

            {!error && weatherData?.weather && (
              <div className='bg-[#dfe2f2] w-full rounded-xl p-8 '>
                <div className='flex justify-around items-start mb-[25px]'>
                  <div className='flex flex-col gap-[30px] '>
                    <div>
                      <Text size='2.5rem' fw={700} c={'#36437a'} style={{marginBottom: '10px'}}>
                        {weatherData?.name}
                      </Text>

                      <Text className='weather__descr'>{weatherData?.weather[0].main}</Text>
                    </div>

                    <Text size='1.8rem' fw={600}>
                      {weatherData?.main.temp.toFixed()} °C
                    </Text>

                    <Text size='lg' c='#4c5897'>
                      Last updated at {timeUpdated(weatherData.dt, weatherData.timezone)}
                    </Text>
                  </div>

                  <Image
                    h='80'
                    w='80'
                    src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}.png`}
                    alt='weather icon'
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </MantineProvider>
    </>
  );
}

export default App;
