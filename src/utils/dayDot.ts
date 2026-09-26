const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

/**
 * Calculates the Day-Dot expiration label for a given shelf-life in days.
 * Returns null for sub-day (hours or immediate) items, which do not receive a multi-day day-dot.
 */
export function formatDayDot(days: number, baseDate: Date = new Date()): string | null {
  if (days <= 0 || !Number.isFinite(days)) {
    return null;
  }

  // Calculate target date by adding days in milliseconds
  const targetDate = new Date(baseDate.getTime() + days * 86_400_000);
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
