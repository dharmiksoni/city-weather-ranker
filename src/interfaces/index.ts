export interface GeocodingResult {
    name: string;
    latitude: number;
    longitude: number;
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

export interface StoredCity {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface ActivityScore {
  activity: string;
  score: number;
  reason: string;
}