import axios from 'axios';
import { DailyForecast } from '../interfaces';

export async function fetchWeatherForecast (latitude: number, longitude: number): Promise <DailyForecast[]> {
    try {
        const resp = await axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
                latitude,
                longitude,
                daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,weather_code',
                timezone: 'auto',
                forecast_days: 7,
            },
        });
        const daily = resp.data.daily;
        const forecasts: DailyForecast[] = [];
        for (let i = 0;i<daily.time.length;i++) {
            forecasts.push({
                date: daily.time[i],
                temperatureMax: daily.temperature_2m_max[i],
                temperatureMin: daily.temperature_2m_min[i],
                precipitation: daily.precipitation_sum[i],
                windSpeed: daily.wind_speed_10m_max[i],
                weatherCode: daily.weather_code[i],
            })
        };
        return forecasts;
    } catch (error) {
        throw new Error('Failed to fetch weather forecast');
    }
}