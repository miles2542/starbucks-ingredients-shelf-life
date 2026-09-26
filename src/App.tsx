import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { CategoryGrid } from './components/CategoryGrid.tsx';
import { DurationGrid } from './components/DurationGrid.tsx';
import { Header } from './components/Header.tsx';
import { StationGrid } from './components/StationGrid.tsx';
import { StorageGrid } from './components/StorageGrid.tsx';
import { INGREDIENTS } from './data/ingredients.ts';
import type { GroupingLens, LocaleMode } from './types/ingredient.ts';
import { formatTodayHeader } from './utils/dayDot.ts';
import { filterIngredients } from './utils/search.ts';

export default function App(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [locale, setLocale] = useState<LocaleMode>('dual');
  const [view, setView] = useState<GroupingLens>('station');
  const [isDark, setIsDark] = useState<boolean>(false);

  // Sync theme with DOM root
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Memoized in-place search filtering
  const filteredIngredients = useMemo(
    () => filterIngredients(INGREDIENTS, searchQuery),
    [searchQuery],
  );

  const todayHeader = useMemo(() => formatTodayHeader(), []);

  return (
    <div className="min-h-screen bg-[#F2F2F7] dark:bg-[#000000] text-[#1C1C1E] dark:text-[#F2F2F7] transition-colors duration-150">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        locale={locale}
        onLocaleChange={setLocale}
        view={view}
        onViewChange={setView}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
      />

      <main className="max-w-7xl mx-auto px-6 pt-6 pb-20">
        {view === 'station' && <StationGrid ingredients={filteredIngredients} locale={locale} />}
        {view === 'category' && <CategoryGrid ingredients={filteredIngredients} locale={locale} />}
        {view === 'shelf' && <DurationGrid ingredients={filteredIngredients} locale={locale} />}
        {view === 'storage' && <StorageGrid ingredients={filteredIngredients} locale={locale} />}
      </main>

      <footer className="max-w-7xl mx-auto px-6 pb-12 pt-6 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-wrap items-center justify-between text-xs text-[#8E8E93] dark:text-[#8E8E93]">
        <div className="flex items-center gap-2">
          <svg
            className="w-3.5 h-3.5 text-[#006241] dark:text-[#34C759]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-label="Calendar icon"
          >
            <title>Calendar icon</title>
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
          <span>
            Day-Dot calculated for:{' '}
            <strong className="font-semibold text-[#1C1C1E] dark:text-[#FFFFFF]">
              {todayHeader}
            </strong>
          </span>
        </div>
        <div>
          Showing {filteredIngredients.length} of {INGREDIENTS.length} items
        </div>
      </footer>
    </div>
  );
}
