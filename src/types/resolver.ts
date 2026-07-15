import { geocodeCity } from "../services/geocoding"
import { fetchWeatherForecast } from "../services/weather"
import { getStoredCity, storeCity } from "../storage/database";

export const resolvers = {
    Query: {
        getCityRankings: async (_parent: any, args: {city: string}) => {
            let city= getStoredCity(args.city);
            if(!city) {
                const result = await geocodeCity(args.city);
                if(!result) {
                    throw new Error(`City not found: ${args.city}`);
                }
                city = storeCity (
                    result.name,
                    result.country,
                    result.latitude,
                    result.longitude,
                    result.timezone
                )
            }
            return {
                city: city.name,
                country: city.country,
                latitude: city.latitude,
                longitude: city.longitude,
                rankings: [],
                forecast: [],
            }
        },
        testGeocoding: async (_parent: any, args: {city: string}) => {
            const result = await geocodeCity(args.city);
            return result;
        },
        testDailyWeather: async (_parent: any, args: {latitude: number, longitude: number}) => {
            const result = await fetchWeatherForecast(args.latitude, args.longitude);
            return result;
        }
    }   
}