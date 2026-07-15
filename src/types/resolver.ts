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
        }
    }   
}