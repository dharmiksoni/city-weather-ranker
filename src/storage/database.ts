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

export function getStoredCity(name: string): StoredCity | undefined {
    const cityResult = db.prepare('SELECT * FROM cities WHERE name=?').get(name) as StoredCity | undefined;
    return cityResult;
}

export function storeCity(name: string, country: string, latitude: number, longitude: number, timezone: string): StoredCity {
    const resp = db.prepare('INSERT OR IGNORE INTO cities (name, country, latitude, longitude, timezone) VALUES(?,?,?,?,?)')
    resp.run(name, country, latitude, longitude, timezone);
    return getStoredCity(name)!;
}

export function getStoredForecast(cityId: number): any[] {
    const cityResult = db.prepare('SELECT * FROM forecasts WHERE city_id=? ORDER BY date').all(cityId)
    return cityResult;
}

// export function storedForecast() {

// }

// export function isForecastStale() {

// }