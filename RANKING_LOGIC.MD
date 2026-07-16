# Ranking Logic

## Weather Codes (WMO Standards)

| Code | Meaning |
|------|---------|
| 0 | Clear sky |
| 1, 2, 3 | Partly cloudy |
| 45, 48 | Fog |
| 51, 53, 55 | Drizzle |
| 61, 63, 65 | Rain |
| 71, 73, 75 | Snow |
| 80 | Rain shower(s), slight |
| 95 | Thunderstorm |
| 96, 99 | Thunderstorm with hail |

## Open-Meteo API Parameters

| Parameter | Meaning |
|-----------|---------|
| `temperature_2m` | Temperature at 2 meters above ground |
| `wind_speed_10m` | Wind speed at 10 meters above ground |
| `wind_speed_80m` | Wind speed at 80m |
| `temperature_180m` | Temperature at 180m |

## Temperature Scale

| Range | Category |
|-------|----------|
| < 0C | Freezing / Frigid |
| 0C – 10C | Very cold |
| 10C – 18C | Cool / Chilly |
| 18C – 24C | Optimal / Comfortable |
| 24C – 29C | Warm / Mild |
| 29C – 35C | Hot (too warm) |
| 35C – 40C | Severe heat |
| 40C+ | Extreme heat |

## Wind Scale

| Range | Category |
|-------|----------|
| < 1 km/h | Calm |
| 1 – 11 km/h | Light air |
| 12 – 28 km/h | Gentle wind |
| 29 – 38 km/h | Moderate wind |
| 39 – 49 km/h | Strong wind |
| 50 – 61 km/h | High wind |
| 62 – 88 km/h | Very strong wind |
| 89 – 117 km/h | Violent storm |
| > 117 km/h | Hurricane |

---

## Scoring Approach

Each activity starts at **5 (average)** and adjusts based on weather conditions. Final score is clamped between **0-10**.

### Example: Ahmedabad — July 15

**Weather data:**
- temperature_2m_max: **36.5C** (severe heat)
- precipitation_sum: **4.30 mm** (light rain)
- wind_speed_10m_max: **13.7 km/h** (gentle wind)
- weather_code: **80** (rain shower, slight)

---

### Skiing Score: 0/10

```
Start: 5
Temperature 36.5C (severe heat)    → -3
Wind 13.7 km/h (gentle)             → no change
Weather code 80 (rain, not snow)    → no snow bonus
                                    ─────
Final: 2 → clamped to 0
Reason: Too warm, no snow
```

### Surfing Score: 3/10

```
Start: 5
Weather code 80 (rain shower)       → -1 (some rain)
Temperature 36.5C                  → +0 (not directly relevant)
Wind 13.7 km/h (gentle)             → +0
Precipitation 4.3mm                 → -1 (light rain)
                                    ─────
Final: 3
Reason: Light rain showers
```

### Outdoor Sightseeing Score: 2/10

```
Start: 5
Temperature 36.5C (severe heat)    → -2
Wind 13.7 km/h (gentle)             → +0
Precipitation 4.3mm                 → -1 (light rain)
                                    ─────
Final: 2
Reason: Too hot, some rain
```

### Indoor Sightseeing Score: 7/10

```
Start: 5
Temperature 36.5C (severe heat)    → +2 (stay in AC)
Precipitation 4.3mm (rain outside)  → +1 (good for indoors)
                                    ─────
Final: 7
Reason: Severe heat, some rain — perfect for indoors
```

---

## Activity Factors Summary

| Activity | Positive factors | Negative factors |
|----------|-----------------|------------------|
| **Skiing** | Sub-zero temps, snowfall, low wind | Warm temps, rain, high wind |
| **Surfing** | Moderate wind (creates waves), warm weather | Thunderstorms, very high wind, heavy rain |
| **Outdoor Sightseeing** | No rain, 15-28C, low wind | Rain, extreme temps, high wind |
| **Indoor Sightseeing** | Bad outdoor weather (rain, extreme temps) | Nice weather (go outside!) |
