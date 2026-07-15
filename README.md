# City Weather Ranker

Ranks next 7 days for skiing, surfing, outdoor/indoor sightseeing.

## How to run
npm install
npx tsx src/index.ts
Open http://localhost:4000/graphql

## Assumptions
- SQLite for storage (no external DB needed)
- Data refreshes every 6 hours
- Ranking score 0-10 per activity
- City geocoding via Open-Meteo's geocoding API