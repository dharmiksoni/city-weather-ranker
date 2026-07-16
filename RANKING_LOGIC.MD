
<!-- The weather_code values come from WMO standards: -->
Code        | Meaning
------------------------------
0	        | Clear sky
1,2,3	    | Partly cloudy
45, 48	    | Fog
51, 53, 55	| Drizzle
61, 63, 65  | Rain
71, 73, 75	| Snow
80          | Rain shower(s), slight
95	        | Thunderstorm
96, 99	    | Thunderstorm with hail

<!-- terms and its meaning -->
temperature_2m = temperature at 2 meters above ground
wind_speed_10m = wind speed at 10 meters above ground

wind_speed_80m = for wind turbine planning, wind speed in mid air
temperature_180m = for aviation

<!-- Temperature ratio -->
Freezing / Frigid: < 0C
Very cold: 0C to 10C
Cool/chilly: 10C to 18C
Optimal/confortable: 18C to 24C
warm/mild: 24C to 29C
Hot(too warm): 29C to 35C
Severe Heat: 35C to 40C
Extreme Heat: 40C+

<!-- Wind ratio -->
Calm: < 1 km/h
Light Air: 1 to 11 km/h
Gentle wind: 12 to 28 km/h
Moderate wind: 29 to 38 km/h
Strong wind: 39 to 49 km/h
High Wind: 50 to 61 km/h
very strong wind: 62 to 88 km/h
Violent Storm: 89 to 117 km/h
Hurricane: > 117 km/h


<!-- scoring approach and calculation -->
Example 
Ahmedabad Forecast Weather data for July 15:
        temperature_2m_max: 36.5C
        temperature_2m_min: 27.8C
        precipitation_sum: 4.30mm
        wind_speed_10m_max: 13.7 km/h
        weather_code: 80 (Rain shower, slight)


<!-- skiing score calculation -->
<!-- scale = 0-10 -->
start = 5
Temperature 36.5C (severe heat) - 3 (assume) = 2
wind_speed_10m_max: 13.7 km/h = fine
Weather code 80 (rain, not snow) = no snow

final score = 2 -> clamped to 0 = 0/10
Reason = Too warm, no snow

<!-- Surfing score calculation -->
start = 5
weather_code: 80 (Rain shower, slight) - 1 = (some rain)
Temperature 36.5C, not directly relevant + 0
Wind 13.7 km/h = Gentle wind + 0
Precipitation 4.3mm -> light rain, -1
final = 3/10
Reason = Light rain showers

<!-- outdoor sightseeing -->
start = 5
Temperature 36.5C, severe heat - 2
Wind 13.7 km/h = Gentle wind + 0
Precipitation 4.3mm -> light rain, -1
final = 2/10
Reason = too hot, some rain

<!-- Indoor Sightseeing -->
start = 5
Temperature 36.5C, severe heat +1 -> indoor stay in AC
Wind 13.7 km/h = Gentle wind +1 -> no impact indoor
Precipitation 4.3mm -> light rain, +1 -> good for indoor
Final = 7/10
Reason = severe hear, some rain