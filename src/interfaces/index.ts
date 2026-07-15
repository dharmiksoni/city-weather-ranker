export interface GeocodingResult {
    name: string;
    latitude: string;
    longitude: string;
    country: string;
    timezone: string;
}

export interface DailyForecast {
    date: string;
    temperatureMax: number;
    temperatureMin: number;
    precipitation: number;
    windSpeed: number;
    weatherCode: number;
}