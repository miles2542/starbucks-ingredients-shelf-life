import { describe, expect, it } from 'vitest';
import { formatDayDot, formatTodayHeader } from '../dayDot.ts';

describe('formatDayDot', () => {
  it('returns null for sub-day (0 days) items', () => {
    const monday = new Date(2026, 8, 28); // Sept 28, 2026 (Monday)
    expect(formatDayDot(0, '60 minutes', monday)).toBeNull();
    expect(formatDayDot(0, 'Immediate', monday)).toBeNull();
    expect(formatDayDot(0, '8 hours', monday)).toBeNull();
    expect(formatDayDot(-1, '0', monday)).toBeNull();
  });

  it('calculates 24-hours expiration as tomorrow (today + 1 day)', () => {
    const monday = new Date(2026, 8, 28); // Monday
    expect(formatDayDot(1, '24 hours', monday)).toBe('Tue · 29/9');
  });

  it('calculates 1-day expiration as same day (today)', () => {
    const monday = new Date(2026, 8, 28); // Monday
    expect(formatDayDot(1, '1 day', monday)).toBe('Mon · 28/9');
  });

  it('calculates multi-day expiration correctly', () => {
    const monday = new Date(2026, 8, 28); // Monday
    expect(formatDayDot(2, '2 days', monday)).toBe('Wed · 30/9');
    expect(formatDayDot(3, '3 days', monday)).toBe('Thu · 1/10');
    expect(formatDayDot(5, '5 days', monday)).toBe('Sat · 3/10');
    expect(formatDayDot(7, '7 days', monday)).toBe('Mon · 5/10');
    expect(formatDayDot(14, '14 days', monday)).toBe('Mon · 12/10');
    expect(formatDayDot(30, '1 month', monday)).toBe('Wed · 28/10');
  });

  it('formats today header correctly', () => {
    const saturday = new Date(2026, 8, 26);
    expect(formatTodayHeader(saturday)).toBe('Sat, 26/9/2026');
  });
});
