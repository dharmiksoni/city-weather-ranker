/*
DayForecast : weather data for 1 day - temp,rain,wind
ActivityScore : one activitity's score (0-10) with a reason
DayRanking : All activity score for 1 day
CityWeatherRanking : Everything for a city - forecast + rankings
Query : client sends city name, gets back rankings
**/

export const typeDefs = `#graphql
    type DayForecast {
        date: String!
        temperatureMax: Float
        temperatureMin: Float
        precipitation: Float
        windSpeed: Float
        weatherCode: Int
    }
    type ActivityScore {
        activity: String!
        score: Float!
        reason: String!
    }
    type DayRanking {
        date: String!
        scores: [ActivityScore!]!
    }
    type CityWeatherRanking {
        city: String!
        country: String!
        lat: Float
        long: Float
        rankings: [DayRanking!]!
        forecast: [DayForecast!]!
    }
    type GeoResult {
        name: String
        latitude: Float
        longitude: Float
        country: String
        timezone: String
    }
    type WeatherResult {
        date: String
        temperatureMax: Float
        temperatureMin: Float
        precipitation: Float
        windSpeed: Float
        weatherCode: Int
    }
    type Query {
        getCityRankings(city: String!): CityWeatherRanking
        testGeocoding(city: String!): GeoResult
        testDailyWeather(latitude: Float!, longitude: Float!): [WeatherResult]
    }
`;