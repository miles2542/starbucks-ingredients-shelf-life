import type React from 'react';
import type { GroupingLens, LocaleMode } from '../types/ingredient.ts';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  locale: LocaleMode;
  onLocaleChange: (locale: LocaleMode) => void;
  view: GroupingLens;
  onViewChange: (view: GroupingLens) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  locale,
  onLocaleChange,
  view,
  onViewChange,
  isDark,
  onToggleTheme,
}): React.JSX.Element => {
  return (
    <header className="sticky top-0 z-50 bg-[#F2F2F7]/85 dark:bg-[#000000]/85 backdrop-blur-xl border-b border-black/[0.08] dark:border-white/[0.12] px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#006241] flex items-center justify-center text-white shadow-xs">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-label="Starbucks logo icon"
            >
              <title>Starbucks logo icon</title>
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-[#1C1C1E] dark:text-[#FFFFFF]">
              Starbucks Shelf Life
            </h1>
            <p className="text-[11px] text-[#8E8E93] dark:text-[#98989D]">
              Ingredient & Day-Dot Reference
            </p>
          </div>
        </div>

        {/* Controls Hub */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Locale Switcher */}
          <div className="flex items-center bg-black/[0.05] dark:bg-white/[0.08] p-1 rounded-xl border border-black/[0.04] dark:border-white/[0.08] text-xs">
            <button
              type="button"
              onClick={() => onLocaleChange('dual')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                locale === 'dual'
                  ? 'bg-white dark:bg-[#2C2C2E] shadow-xs text-[#1C1C1E] dark:text-white'
                  : 'text-[#636366] dark:text-[#AEAEB2] hover:text-[#1C1C1E] dark:hover:text-white'
              }`}
            >
              Dual
            </button>
            <button
              type="button"
              onClick={() => onLocaleChange('en')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                locale === 'en'
                  ? 'bg-white dark:bg-[#2C2C2E] shadow-xs text-[#1C1C1E] dark:text-white'
                  : 'text-[#636366] dark:text-[#AEAEB2] hover:text-[#1C1C1E] dark:hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLocaleChange('vi')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                locale === 'vi'
                  ? 'bg-white dark:bg-[#2C2C2E] shadow-xs text-[#1C1C1E] dark:text-white'
                  : 'text-[#636366] dark:text-[#AEAEB2] hover:text-[#1C1C1E] dark:hover:text-white'
              }`}
            >
              VI
            </button>
          </div>

          {/* Theme Toggle (Light / Dark) */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-black/[0.05] dark:bg-white/[0.08] border border-black/[0.04] dark:border-white/[0.08] text-[#1C1C1E] dark:text-[#F2F2F7] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] transition-colors"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-label="Light mode icon"
              >
                <title>Light mode icon</title>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-label="Dark mode icon"
              >
                <title>Dark mode icon</title>
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Sub-bar: Search & View Selector Chips */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5 mt-3 pt-3 border-t border-black/[0.05] dark:border-white/[0.06]">
        {/* View Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
          <span className="text-[#8E8E93] text-[11px] font-semibold mr-1 shrink-0">View:</span>
          <button
            type="button"
            onClick={() => onViewChange('station')}
            className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all shrink-0 ${
              view === 'station'
                ? 'bg-[#006241] text-white shadow-xs'
                : 'bg-black/[0.05] dark:bg-white/[0.08] text-[#636366] dark:text-[#AEAEB2] hover:bg-black/[0.08]'
            }`}
          >
            Physical Station
          </button>
          <button
            type="button"
            onClick={() => onViewChange('category')}
            className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all shrink-0 ${
              view === 'category'
                ? 'bg-[#006241] text-white shadow-xs'
                : 'bg-black/[0.05] dark:bg-white/[0.08] text-[#636366] dark:text-[#AEAEB2] hover:bg-black/[0.08]'
            }`}
          >
            Category
          </button>
          <button
            type="button"
            onClick={() => onViewChange('shelf')}
            className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all shrink-0 ${
              view === 'shelf'
                ? 'bg-[#006241] text-white shadow-xs'
                : 'bg-black/[0.05] dark:bg-white/[0.08] text-[#636366] dark:text-[#AEAEB2] hover:bg-black/[0.08]'
            }`}
          >
            Shelf Life
          </button>
          <button
            type="button"
            onClick={() => onViewChange('storage')}
            className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all shrink-0 ${
              view === 'storage'
                ? 'bg-[#006241] text-white shadow-xs'
                : 'bg-black/[0.05] dark:bg-white/[0.08] text-[#636366] dark:text-[#AEAEB2] hover:bg-black/[0.08]'
            }`}
          >
            Storage Condition
          </button>
        </div>

        {/* In-place Search Bar */}
        <div className="relative w-full md:w-88">
          <div className="absolute left-3.5 top-2.5 text-[#8E8E93] pointer-events-none">
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-label="Search icon"
            >
              <title>Search icon</title>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search ingredient (e.g. sua dac, kem muoi, frap, dâu)..."
            className="w-full text-xs py-2 pl-9 pr-9 rounded-xl bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] text-[#1C1C1E] dark:text-white placeholder-[#8E8E93] focus:ring-2 focus:ring-[#006241]/40 focus:border-[#006241] shadow-xs font-normal"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-2 text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white p-0.5"
              title="Clear search"
              aria-label="Clear search"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-label="Clear search icon"
              >
                <title>Clear search icon</title>
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
};
