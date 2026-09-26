import { describe, expect, it } from 'vitest';
import { formatDayDot, formatTodayHeader } from '../dayDot.ts';

describe('formatDayDot', () => {
  it('returns null for sub-day (0 days) items', () => {
    const saturday = new Date(2026, 8, 26); // Sept 26, 2026 (Saturday)
    expect(formatDayDot(0, saturday)).toBeNull();
    expect(formatDayDot(-1, saturday)).toBeNull();
  });

  it('calculates 1-day expiration correctly', () => {
    const saturday = new Date(2026, 8, 26); // Saturday
    expect(formatDayDot(1, saturday)).toBe('Sun · 27/9');
  });

  it('calculates multi-day expiration correctly', () => {
    const saturday = new Date(2026, 8, 26); // Saturday
    expect(formatDayDot(2, saturday)).toBe('Mon · 28/9');
    expect(formatDayDot(3, saturday)).toBe('Tue · 29/9');
    expect(formatDayDot(5, saturday)).toBe('Thu · 1/10');
    expect(formatDayDot(7, saturday)).toBe('Sat · 3/10');
    expect(formatDayDot(14, saturday)).toBe('Sat · 10/10');
    expect(formatDayDot(30, saturday)).toBe('Mon · 26/10');
  });

  it('formats today header correctly', () => {
    const saturday = new Date(2026, 8, 26);
    expect(formatTodayHeader(saturday)).toBe('Sat, 26/9/2026');
  });
});
