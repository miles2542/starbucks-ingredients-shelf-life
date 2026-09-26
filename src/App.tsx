import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { CategoryGrid } from './components/CategoryGrid.tsx';
import { DurationGrid } from './components/DurationGrid.tsx';
import { Header } from './components/Header.tsx';
import { StationGrid } from './components/StationGrid.tsx';
import { StorageGrid } from './components/StorageGrid.tsx';
import { INGREDIENTS } from './data/ingredients.ts';
import type { GroupingLens, LocaleMode } from './types/ingredient.ts';
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

      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 pt-4 sm:pt-6 pb-16">
        {view === 'station' && <StationGrid ingredients={filteredIngredients} locale={locale} />}
        {view === 'shelf' && <DurationGrid ingredients={filteredIngredients} locale={locale} />}
        {view === 'storage' && <StorageGrid ingredients={filteredIngredients} locale={locale} />}
        {view === 'category' && <CategoryGrid ingredients={filteredIngredients} locale={locale} />}
      </main>

      <footer className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6" />
    </div>
  );
}
