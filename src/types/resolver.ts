import { geocodeCity } from "../services/geocoding"
import { fetchWeatherForecast } from "../services/weather"
import { rankDay } from "../services/ranking"
import { getStoredCity, getStoredForecast, isForecastStale, storeCity, storedForecast } from "../storage/database";

export const resolvers = {
    Query: {
        getCityRankings: async (_parent: any, args: {city: string}) => {
            // check if we have city in db
            let city= getStoredCity(args.city);
            if(!city) {
                // fetch city details from api call
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
            // check if we have fresh forecast data in db
            let forecast = getStoredForecast(city.id);
            if(forecast.length===0 || isForecastStale(city.id)) {
                const freshForecast = await fetchWeatherForecast(city.latitude, city.longitude);
                storedForecast(city.id, freshForecast);
                forecast = getStoredForecast(city.id);
            }
            console.log('forecast:', forecast);
            // run ranking business logic on forecast data
            const rankings = forecast.map(d => ({
                date: d.date,
                scores: rankDay(d)
            }))
            return {
                city: city.name,
                country: city.country,
                latitude: city.latitude,
                longitude: city.longitude,
                rankings: rankings,
                forecast: forecast,
            }
        },
    }   
}