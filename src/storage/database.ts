import Database from "better-sqlite3";
import { StoredCity } from "../interfaces";

const db = new Database('weather.db');

// create tables
db.exec(`
    CREATE TABLE IF NOT EXISTS cities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        country TEXT,
        latitude REAL,
        longitude REAL,
        timezone TEXT,
        UNIQUE(name,country)
    );
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS forecasts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        city_id INTEGER,
        date TEXT,
        temperature_max REAL,
        temperature_min REAL,
        precipitation REAL,
        wind_speed REAL,
        weather_code INTEGER,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (city_id) REFERENCES cities(id),
        UNIQUE(city_id, date)
    );
`)

// fetch saved city
export function getStoredCity(name: string): StoredCity | undefined {
    const cityResult = db.prepare('SELECT * FROM cities WHERE name=?').get(name) as StoredCity | undefined;
    return cityResult;
}

// save city details
export function storeCity(name: string, country: string, latitude: number, longitude: number, timezone: string): StoredCity {
    const resp = db.prepare('INSERT OR IGNORE INTO cities (name, country, latitude, longitude, timezone) VALUES(?,?,?,?,?)')
    resp.run(name, country, latitude, longitude, timezone);
    return getStoredCity(name)!;
}

// get stored forecasts data from db
export function getStoredForecast(cityId: number): any[] {
    const forecastResult = db.prepare('SELECT * FROM forecasts WHERE city_id=? ORDER BY date').all(cityId)
    return forecastResult;
}

// store forecasts data by cityId
export function storedForecast(cityId: number, forecasts: any[]): void {
    const forecastSingle = db.prepare('INSERT OR REPLACE INTO forecasts(city_id, date, temperature_max, temperature_min, precipitation, wind_speed, whether_code) VALUES(?,?,?,?,?,?,?)')
    const saveManyForecasts = db.transaction((items: any[]) => {
        for(const item of items) {
            forecastSingle.run(cityId, item.date, item.temperatureMax, item.temperatureMin, item.precipitation, item.windSpeed, item.weatherCode);
        }
    })
    saveManyForecasts(forecasts);
}

// checks if data is older than 6 hours
export function isForecastStale(cityId: number, maxAgeOfRecordInHours: number = 6): boolean {
    const row = db.prepare("SELECT updated_at FROM forecasts WHERE city_id=? ORDER BY updated_at DESC LIMIT 1").get(cityId) as any;
    if(!row) return true;

    const updatedAt = new Date(row.updated_at);
    const now = new Date();
    const hourDiff = (now.getTime()-updatedAt.getTime())/(1000*60*60);
    return hourDiff > maxAgeOfRecordInHours;
}