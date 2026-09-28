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

      <main className="max-w-7xl mx-auto px-[0.7rem] sm:px-4 lg:px-6 pt-4 sm:pt-6 pb-16">
        {view === 'station' && <StationGrid ingredients={filteredIngredients} locale={locale} />}
        {view === 'shelf' && <DurationGrid ingredients={filteredIngredients} locale={locale} />}
        {view === 'storage' && <StorageGrid ingredients={filteredIngredients} locale={locale} />}
        {view === 'category' && <CategoryGrid ingredients={filteredIngredients} locale={locale} />}
      </main>

      <footer className="max-w-7xl mx-auto px-[0.7rem] sm:px-4 lg:px-6 pt-6 pb-12 border-t border-black/[0.06] dark:border-white/[0.08] text-xs text-[#636366] dark:text-[#8E8E93]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1">
            <span>Made with</span>
            <span>{isDark ? '🤍' : '❤️'}</span>
            <span>by</span>
            <a
              href="https://github.com/miles2542"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#1C1C1E] dark:text-[#F2F2F7] hover:text-[#006241] dark:hover:text-[#34C759] underline underline-offset-2 transition-colors"
            >
              Miles
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3.5">
            <span>
              You can also check out the{' '}
              <a
                href="https://starbucks-vn-pos.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#1C1C1E] dark:text-[#F2F2F7] hover:text-[#006241] dark:hover:text-[#34C759] underline underline-offset-2 transition-colors"
              >
                Starbucks POS Simulator
              </a>{' '}
              if ya like
            </span>
            <a
              href="https://github.com/miles2542/starbucks-ingredients-shelf-life"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white transition-colors p-0.5"
              aria-label="GitHub repository"
              title="GitHub repository"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-label="GitHub icon"
              >
                <title>GitHub icon</title>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-black/[0.04] dark:border-white/[0.06] text-center text-[11px] text-[#8E8E93] dark:text-[#636366]">
          Independent reference tool. Not affiliated with, sponsored, or endorsed by Starbucks
          Coffee Company.
        </div>
      </footer>
    </div>
  );
}
