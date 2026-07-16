# City weather Ranker

Ranks next 7 days for skiing, surfing, outdoor/indoor sightseeing.

## How to run

```bash
npm install
npm run dev
```

Open http://localhost:4000/graphql

## Assumptions
- SQLite for storage (no external DB or Docker needed)
- Data refreshes every 6 hours
- Ranking score 0-10 per activity
- City geocoding via Open-Meteo's geocoding API
- Retry with exponential backoff (3 attempts, 1s/2s/4s delays)
- Server serves stale data if API is unavailable

## Example query
```graphql
query {
  getCityRankings(city: "Mumbai") {
    city
    country
    latitude
    longitude
    rankings {
      date
      scores {
        activity
        score
        reason
      }
    }
    forecast {
      date
      temperatureMax
      temperatureMin
      precipitation
      windSpeed
      weatherCode
    }
  }
}
```
## Architecture
[mermaid-diagram-2026-07-16-125409.png](mermaid-diagram-2026-07-16-125409.png)

## Tech stack

Node.js, TypeScript, Express, Apollo Server (GraphQL), SQLite, Axios- Mocha + + Chai (testing)

## Scripts

```bash
npm run dev #dev
npm test #test
```
