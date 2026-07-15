import { geocodeCity } from "../services/geocoding"
import { fetchWeatherForecast } from "../services/weather"

export const resolvers = {
    Query: {
        getCityRankings: async (_parent: any, args: {city: string}) => {
            return {
                city: args.city,
                country: null,
                latitude: null,
                longitude: null,
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