import { expect } from 'chai';
import { rankDay } from '../services/ranking';
import { DailyForecast } from '../interfaces';

describe('rankDay', () => {
  it('should return 4 activity scores', () => {
    const forecast: DailyForecast = {
      date: '2026-07-15',
      temperatureMax: 20,
      temperatureMin: 12,
      precipitation: 0,
      windSpeed: 10,
      weatherCode: 1,
    };
    const result = rankDay(forecast);
    expect(result).to.have.lengthOf(4);
  });

  it('should score skiing low when hot', () => {
    const forecast: DailyForecast = {
      date: '2026-07-15',
      temperatureMax: 35,
      temperatureMin: 25,
      precipitation: 0,
      windSpeed: 10,
      weatherCode: 0,
    };
    const result = rankDay(forecast);
    const skiing = result.find(r => r.activity === 'Skiing');
    expect(skiing!.score).to.be.lessThan(5);
  });

  it('should score skiing high when snowing and cold', () => {
    const forecast: DailyForecast = {
      date: '2026-07-15',
      temperatureMax: -5,
      temperatureMin: -10,
      precipitation: 10,
      windSpeed: 10,
      weatherCode: 73,
    };
    const result = rankDay(forecast);
    const skiing = result.find(r => r.activity === 'Skiing');
    expect(skiing!.score).to.be.greaterThan(7);
  });
});