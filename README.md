# Weather application

This weather application allows you to input a city name and display a info about weather in this city.

- [Demo](https://mbulchak.github.io/weather-app/)

## Features
- show information about the weather in the typing city: city name, temperature, short weather description, etc.
- doing error handling if the city is not found, and related to the API
- cache the weather data for 5 minutes
- tests for incorrect city entering, and if the weather data is displayed correctly

## Instruments
- React, TypeScript, localStorage, axios
- OpenWeatherMap API
- Mantine, Tailwind
- Vitest, React Testing Library

## Usage
- clone this repo
- install dependencies
```js
npm install
```
- create a `.env` file in the root
```js
VITE_OPENWEATHERMAP_API_KEY=your_api_key
```
- run the projects
```js
npm run dev
```
- click on the url in the terminal
