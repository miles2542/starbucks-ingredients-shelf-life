import type React from 'react';
import type { Ingredient, LocaleMode } from '../types/ingredient.ts';
import { StationTable } from './StationTable.tsx';

interface DurationGridProps {
  ingredients: readonly Ingredient[];
  locale: LocaleMode;
}

interface DurationBucket {
  label: string;
  days: readonly number[];
}

const DURATION_BUCKETS: readonly DurationBucket[] = [
  { label: 'Immediate & Sub-day (< 24 hours)', days: [0] },
  { label: '1 Day (24 hours)', days: [1] },
  { label: '2 – 3 Days', days: [2, 3] },
  { label: '5 – 7 Days', days: [5, 7] },
  { label: '14 Days (2 weeks)', days: [14] },
  { label: '1 Month & Beyond', days: [30, 90] },
];

export const DurationGrid: React.FC<DurationGridProps> = ({
  ingredients,
  locale,
}): React.JSX.Element => {
  const activeBuckets = DURATION_BUCKETS.map((bucket) => ({
    ...bucket,
    items: ingredients.filter((item) => bucket.days.includes(item.shelfLifeDays)),
  })).filter((b) => b.items.length > 0);

  if (activeBuckets.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm font-medium text-[#8E8E93] dark:text-[#98989D]">
          No ingredients match your query.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {activeBuckets.map((bucket) => (
        <section
          key={bucket.label}
          className="bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] rounded-2xl p-6 lg:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
        >
          <header className="pb-3.5 mb-4 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-tight text-[#1C1C1E] dark:text-[#FFFFFF]">
              {bucket.label}
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-[#8E8E93] dark:text-[#98989D] font-mono-num">
              {bucket.items.length} items
            </span>
          </header>
          <div className="bg-[#F9F9FB] dark:bg-[#252528] rounded-xl p-5 border border-black/[0.04] dark:border-white/[0.06]">
            <StationTable items={bucket.items} locale={locale} />
          </div>
        </section>
      ))}
    </div>
  );
};
