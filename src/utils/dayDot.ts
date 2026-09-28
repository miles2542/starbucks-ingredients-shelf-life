const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

/**
 * Calculates the Day-Dot expiration label for an ingredient.
 * - Sub-day items (shelfLifeDays <= 0, e.g. "60 minutes", "Immediate", "8 hours") return null ('–').
 * - "1 day" (end of current operational day) returns today's date (same day).
 * - "24 hours" returns tomorrow's date (today + 24 hours / 1 day).
 * - Multi-day (shelfLifeDays > 0) returns today + shelfLifeDays.
 */
export function formatDayDot(
  shelfLifeDays: number,
  shelfLifeDisplay: string,
  baseDate: Date = new Date(),
): string | null {
  if (shelfLifeDays <= 0 || !Number.isFinite(shelfLifeDays)) {
    return null;
  }

  // "1 day" shelf life expires at end of current operating day (same day / today)
  if (shelfLifeDisplay === '1 day') {
    const dayName = DAY_NAMES[baseDate.getDay()];
    const date = baseDate.getDate();
    const month = baseDate.getMonth() + 1;
    return `${dayName} · ${date}/${month}`;
  }

  // "24 hours" and multi-day items add shelfLifeDays to baseDate
  const targetDate = new Date(baseDate.getTime() + shelfLifeDays * 86_400_000);
  const dayName = DAY_NAMES[targetDate.getDay()];
  const date = targetDate.getDate();
  const month = targetDate.getMonth() + 1;

  return `${dayName} · ${date}/${month}`;
}

/**
 * Formats a Date object into a readable store reference string: e.g. "Sat, 26/9/2026"
 */
export function formatTodayHeader(date: Date = new Date()): string {
  const dayName = DAY_NAMES[date.getDay()];
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();

  return `${dayName}, ${d}/${m}/${y}`;
}
