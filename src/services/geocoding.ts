import {GeocodingResult } from "../interfaces";
import { fetchWithRetry} from "./fetchWithRetry";

export async function geocodeCity(city: string): Promise<GeocodingResult | null> {
    try {
        const resp = await fetchWithRetry('https://geocoding-api.open-meteo.com/v1/search', {
                name: city,
                count: 1,
                language: 'en'
            }
        )
        if(!resp || !resp.data.results || resp.data.results.length === 0) {
            return null;
        }
        const result = resp.data.results[0];
        return {
            name: result.name,
            latitude: result.latitude,
            longitude: result.longitude,
            country: result.country || '',
            timezone: result.timezone || 'UTC',
        }
    } catch (error) {
        throw new Error(`Geocoding failed for city: ${city}`);
    }
}