import type React from 'react';
import type { Ingredient, LocaleMode } from '../types/ingredient.ts';
import { StationTable } from './StationTable.tsx';

interface StorageGridProps {
  ingredients: readonly Ingredient[];
  locale: LocaleMode;
}

export const StorageGrid: React.FC<StorageGridProps> = ({
  ingredients,
  locale,
}): React.JSX.Element => {
  const ambientItems = ingredients.filter((i) => i.storage === 'ambient');
  const coldItems = ingredients.filter((i) => i.storage === 'refrigerated');

  if (ambientItems.length === 0 && coldItems.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm font-medium text-[#8E8E93] dark:text-[#98989D]">
          No ingredients match your query.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-start">
      {ambientItems.length > 0 && (
        <section className="bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] rounded-2xl p-[1.1rem] sm:p-5 lg:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
          <header className="pb-3 mb-3.5 sm:pb-4 sm:mb-5 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-xs bg-amber-500 inline-block" />
              <h2 className="text-sm font-bold tracking-tight text-[#1C1C1E] dark:text-[#FFFFFF]">
                {locale === 'vi' ? 'Nhiệt độ phòng (Ambient)' : 'Ambient Storage'}
              </h2>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-[#8E8E93] dark:text-[#98989D] font-mono-num">
              {ambientItems.length} items
            </span>
          </header>
          <div className="bg-[#F9F9FB] dark:bg-[#252528] rounded-xl p-2.5 sm:p-4 lg:p-5 border border-black/[0.04] dark:border-white/[0.06]">
            <StationTable items={ambientItems} locale={locale} />
          </div>
        </section>
      )}

      {coldItems.length > 0 && (
        <section className="bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] rounded-2xl p-[1.1rem] sm:p-5 lg:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
          <header className="pb-3 mb-3.5 sm:pb-4 sm:mb-5 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-xs bg-cyan-500 inline-block" />
              <h2 className="text-sm font-bold tracking-tight text-[#1C1C1E] dark:text-[#FFFFFF]">
                {locale === 'vi' ? 'Tủ mát (Refrigerated)' : 'Refrigerated Storage'}
              </h2>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-[#8E8E93] dark:text-[#98989D] font-mono-num">
              {coldItems.length} items
            </span>
          </header>
          <div className="bg-[#F9F9FB] dark:bg-[#252528] rounded-xl p-2.5 sm:p-4 lg:p-5 border border-black/[0.04] dark:border-white/[0.06]">
            <StationTable items={coldItems} locale={locale} />
          </div>
        </section>
      )}
    </div>
  );
};
