import { geocodeCity } from "../services/geocoding"
import { fetchWeatherForecast } from "../services/weather"
import { rankDay } from "../services/ranking"
import { getStoredCity, getStoredForecast, isForecastStale, storeCity, storedForecast } from "../storage/database";

export const resolvers = {
    Query: {
        getCityRankings: async (_parent: any, args: {city: string}) => {
            try {
                console.log(`Geocoding city: ${args.city}`);
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
                console.log(`Cache hit for ${args.city} — returning stored data`);
                const isStaleData = forecast.length===0 || isForecastStale(city.id);
                if (isStaleData) {
                    console.log(`Cache stale — refreshing forecast for ${args.city}`);
                    try {
                        const freshForecast = await fetchWeatherForecast(city.latitude, city.longitude);
                        if(freshForecast) {
                            storedForecast(city.id, freshForecast);
                            forecast = getStoredForecast(city.id);
                            console.log(`Forecast refreshed for ${args.city}`);
                        }
                    } catch (error) {
                        console.log(`API failed, using cached data for ${args.city}`);
                    }
                } else {
                    console.log(`Cache hit for ${args.city} — returning stored data`);
                }
                console.log('forecast:', forecast);
                // run ranking business logic on forecast data
                const rankings = forecast && forecast.map(d => ({
                    date: d.date,
                    scores: rankDay(d)
                }))
                return {
                    city: city.name || null,
                    country: city.country || null,
                    latitude: city.latitude || null,
                    longitude: city.longitude || null,
                    rankings: rankings || [],
                    forecast: forecast || [],
                }
            } catch (error) {
                throw new Error(`Geocoding or Ranking failed for city: ${args.city}`);
            }
        },
    }   
}