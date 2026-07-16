# City weather Ranker

Ranks next 7 days for skiing, surfing, outdoor/indoor sightseeing.

## How to run
npm install
npx tsx src/index.ts
Open http://localhost:4000/graphql

## Assumptions
- SQLite for storage (no external DB or Docker needed)
- Data refreshes every 6 hours
- Ranking score 0-10 per activity
- City geocoding via Open-Meteo's geocoding API
- Retry with exponential backoff (3 attempts, 1s/2s/4s delays)
- Server serves stale data if API is unavailable

## Example query
curl --location 'http://localhost:4000/graphql' \
--header 'content-type: application/json' \
--data '{"query":"query {\n  getCityRankings(city: \"São Paulo\") {\n    city,\n    country,\n    latitude,\n    longitude,\n    rankings {\n      date\n      scores {\n        activity\n        score\n        reason\n      }\n    },\n    forecast {\n      date,\n      precipitation,\n      temperatureMax,\n      temperatureMin,\n      windSpeed,\n      weatherCode,\n    }\n  }\n}","variables":{}}'

## Architecture
Provided Mermaid Flowchart diagram

## Tech stack
Node.js, TypeScript, Express, Apollo Server (GraphQL), SQLite, Axios