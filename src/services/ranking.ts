import { ActivityScore, DailyForecast } from "../interfaces";

/**
 * Logic for score calculation
 */

// impacts for this activity - temperature, snow, wind
function scoreSkiing (forecast: DailyForecast): ActivityScore {
    let score = 5;
    let reason: string[] = []
    // temperature check
    if(forecast.temperatureMax < 0 ) {
        score = score + 3;
        reason.push('Below freezing'); // good for skiing
    } else if (forecast.temperatureMax < 5) {
        score = score + 1;
        reason.push('Moderate Cold'); // ok to skiing
    } else {
        score = score - 2;
        reason.push('Too warm'); // not good for skiing
    }
    // snow check
    const snowCodes = [71, 73, 75, 77, 85, 86];
    if(snowCodes.includes(forecast.weatherCode)) {
        score = score+3;
        reason.push('snowing');
    }

    // wind check
    if(forecast.windSpeed > 40) {
        score = score - 3;
        reason.push('high winds');
    } else if(forecast.windSpeed > 20) { 
        score = score - 1;
        reason.push('moderate winds');
    }
    score = Math.max(0,Math.min(10, score));
    return { activity: 'Skiing', score:score, reason: reason.join(',') };
}

// impacts - wind, rain, water temperature
function scoreSurfing (forecast: DailyForecast): ActivityScore {
    let score = 5;
    let reason: string[] = []
    // wind check
    if(forecast.windSpeed > 40) {
        score = score - 3;
        reason.push('high winds');
    } else if(forecast.windSpeed > 20) { 
        score = score + 1;
        reason.push('good winds for waves');
    }

    // rain check
    if(forecast.precipitation > 20) {
        score = score - 3;
        reason.push('heavy rain');
    } else if(forecast.precipitation > 5) {
        score = score - 1;
        reason.push('light rain');
    }

    // weather code
    const snowCodes = [95,96,99];
    if(snowCodes.includes(forecast.weatherCode)) {
        score = score-4;
        reason.push('thunderstorm');
    }

    // temperature
    if (forecast.temperatureMax > 25) {
        score = score + 2;
        reason.push('warm weather');
    }
    score = Math.max(0, Math.min(10, score));
    return { activity: 'Surfing', score:score, reason: reason.join(',') || "average condition" };
}

// impacts for this activity - wind, rain, temperature
function scoreOutdoorSeen (forecast: DailyForecast): ActivityScore {
    let score  = 5;
    let reason: string[] = [];
    // wind check
    if(forecast.windSpeed > 40) {
        score = score - 3;
        reason.push('high winds');
    }

    // rain check
    if(forecast.precipitation === 0) {
        score = score+3;
        reason.push('no rain');
    } else if(forecast.precipitation < 2) {
        score = score + 1;
        reason.push('light rain');
    } else if(forecast.precipitation > 10) {
        score = score - 3;
        reason.push('heavy rain');
    }

    // temperature check
    if(forecast.temperatureMax > 15 && forecast.temperatureMax < 28 ) {
        score = score + 2;
        reason.push('good temperature'); 
    } else if (forecast.temperatureMax < 5) {
        score = score - 2;
        reason.push('too Cold');
    } else if (forecast.temperatureMax > 35) {
        score = score - 2;
        reason.push('Too hot');
    }

    score = Math.max(0, Math.min(10, score));
    return { activity: 'Outdoor Sightseeing', score:score, reason: reason.join(',') || 'average conditions' };
}

// impacts for this activity - rain, temperature
function scoreIndoorSeen (forecast: DailyForecast): ActivityScore {
    let score  = 5;
    let reason: string[] = [];
    // rain check
    if(forecast.precipitation > 10) {
        score = score+3;
        reason.push('perfect for indoors');
    } else if(forecast.precipitation > 2) {
        score = score + 1;
        reason.push('light rain');
    }

    // temperature check
    if(forecast.temperatureMax < 0) {
        score = score + 3;
        reason.push('freezing cold, stay indoor'); 
    } else if (forecast.temperatureMax > 35) {
        score = score + 2;
        reason.push('too hot stay indoor');
    }

    // rain check
    if (forecast.precipitation === 0 && forecast.temperatureMax >= 15 && forecast.temperatureMax <= 28) {
        score = score - 2;
        reason.push('nice weather — go outside instead');
    }

    score = Math.max(0, Math.min(10, score));
    return { activity: 'Indoor Sightseeing', score:score, reason: reason.join(',') || 'average conditions' };
}

export function rankDay(forecast: DailyForecast): ActivityScore[] {
    return [
        scoreSkiing(forecast),
        scoreSurfing(forecast),
        scoreOutdoorSeen(forecast),
        scoreIndoorSeen(forecast)
    ]
}