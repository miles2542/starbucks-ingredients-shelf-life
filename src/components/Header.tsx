import type React from 'react';
import { useEffect, useRef, useState } from 'react';
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

const VIEW_OPTIONS: readonly { id: GroupingLens; label: string; isDefault?: boolean }[] = [
  { id: 'station', label: 'Physical Station', isDefault: true },
  { id: 'shelf', label: 'Shelf Life' },
  { id: 'storage', label: 'Storage Condition' },
  { id: 'category', label: 'Category' },
] as const;

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
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Live 24-hour clock
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsViewDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const weekday = currentTime.toLocaleDateString('en-US', { weekday: 'short' });
  const dayMonthFormatted = currentTime.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
  const yearFormatted = currentTime.getFullYear();
  const timeFormatted = currentTime.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <header className="sticky top-0 z-50 bg-[#F2F2F7]/90 dark:bg-[#000000]/90 backdrop-blur-xl border-b border-black/[0.08] dark:border-white/[0.12] px-[0.7rem] sm:px-4 lg:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Starbucks Siren Logo + Day of week, Date, and 24h Timestamp */}
        <div className="flex items-center gap-1.5 sm:gap-2 select-none shrink-0 min-w-0">
          <img
            src="/starbucks_siren.svg?v=3"
            alt="Starbucks"
            className="w-4 h-4 sm:w-5.5 sm:h-5.5 rounded-full shrink-0"
          />
          <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-semibold text-[#1C1C1E] dark:text-[#FFFFFF] whitespace-nowrap">
            <span>{weekday},</span>
            <span className="text-[#3C3C43] dark:text-[#EBEBF5]">
              {dayMonthFormatted}
              <span className="hidden sm:inline"> {yearFormatted}</span>
            </span>
            <span className="text-[#8E8E93] dark:text-[#98989D] font-mono-num font-normal ml-0.5">
              · {timeFormatted}
            </span>
          </div>
        </div>

        {/* Right: Compact Locale Switcher + Circular Theme Toggle */}
        <div className="flex items-center gap-2">
          {/* Compact Locale Selector */}
          <div className="flex items-center bg-black/[0.05] dark:bg-white/[0.08] p-0.5 rounded-lg border border-black/[0.04] dark:border-white/[0.08] text-[11px] sm:text-xs">
            <button
              type="button"
              onClick={() => onLocaleChange('dual')}
              className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                locale === 'dual'
                  ? 'bg-white dark:bg-[#2C2C2E] shadow-xs text-[#1C1C1E] dark:text-white'
                  : 'text-[#636366] dark:text-[#AEAEB2] hover:text-[#1C1C1E] dark:hover:text-white'
              }`}
              title="Dual English & Vietnamese (Recommended)"
            >
              Dual
            </button>
            <button
              type="button"
              onClick={() => onLocaleChange('en')}
              className={`px-2 py-0.5 rounded-md font-medium transition-all ${
                locale === 'en'
                  ? 'bg-white dark:bg-[#2C2C2E] shadow-xs text-[#1C1C1E] dark:text-white'
                  : 'text-[#636366] dark:text-[#AEAEB2] hover:text-[#1C1C1E] dark:hover:text-white'
              }`}
            >
              En
            </button>
            <button
              type="button"
              onClick={() => onLocaleChange('vi')}
              className={`px-2 py-0.5 rounded-md font-medium transition-all ${
                locale === 'vi'
                  ? 'bg-white dark:bg-[#2C2C2E] shadow-xs text-[#1C1C1E] dark:text-white'
                  : 'text-[#636366] dark:text-[#AEAEB2] hover:text-[#1C1C1E] dark:hover:text-white'
              }`}
            >
              Vi
            </button>
          </div>

          {/* Persistent Circular Pin / Badge Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-white dark:bg-[#2C2C2E] border border-black/[0.08] dark:border-white/[0.15] text-[#1C1C1E] dark:text-[#F2F2F7] shadow-xs hover:border-[#006241] dark:hover:border-[#34C759] transition-all"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle color theme"
          >
            {isDark ? (
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-label="Sun icon"
              >
                <title>Sun icon</title>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1C1C1E]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-label="Moon icon"
              >
                <title>Moon icon</title>
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Sub-bar: Mobile Single-Line (Views Dropdown + Search) | Desktop Row */}
      <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-black/[0.05] dark:border-white/[0.06]">
        {/* Mobile View: Single Line Flex with Views Dropdown and Search */}
        <div className="flex md:hidden items-center gap-2 relative" ref={dropdownRef}>
          {/* Views Button with darker/greyer background so lighter search bar draws attention */}
          <button
            type="button"
            onClick={() => setIsViewDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1.5 h-9 px-3 rounded-xl bg-[#E5E5EA] dark:bg-[#2C2C2E] hover:bg-[#D1D1D6] dark:hover:bg-[#3A3A3C] active:bg-[#C7C7CC] text-xs font-semibold text-[#3C3C43] dark:text-[#EBEBF5] border border-black/[0.04] dark:border-white/[0.06] shadow-xs shrink-0 transition-colors"
            aria-haspopup="true"
            aria-expanded={isViewDropdownOpen}
          >
            <span>Views</span>
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-200 ease-out ${
                isViewDropdownOpen ? 'rotate-180' : ''
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-label="Toggle views dropdown"
            >
              <title>Toggle views dropdown</title>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {/* Views Floating Dropdown Menu with tactful scale & fade animation */}
          <div
            className={`absolute left-0 top-full mt-1.5 w-56 bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] rounded-xl shadow-lg p-1.5 z-50 flex flex-col gap-0.5 transition-all duration-150 ease-out origin-top-left ${
              isViewDropdownOpen
                ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
            }`}
          >
            {VIEW_OPTIONS.map((opt) => {
              const isSelected = view === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    onViewChange(opt.id);
                    setIsViewDropdownOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                    isSelected
                      ? 'bg-[#006241] text-white font-semibold'
                      : 'text-[#1C1C1E] dark:text-[#F2F2F7] hover:bg-black/[0.05] dark:hover:bg-white/[0.08]'
                  }`}
                >
                  <span>{opt.label}</span>
                  {opt.isDefault && (
                    <span
                      className={`text-[11px] font-medium transition-colors ${
                        isSelected ? 'text-white/80' : 'text-[#8E8E93] dark:text-[#98989D]'
                      }`}
                    >
                      Default
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Search Input */}
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8E93] pointer-events-none flex items-center">
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
              placeholder="Search ingredients (Eng and Vie)"
              className="w-full h-9 text-xs pl-9 pr-8 rounded-xl bg-white dark:bg-[#1C1C1E] border border-black/[0.1] dark:border-white/[0.12] text-[#1C1C1E] dark:text-white placeholder-[#8E8E93] focus:ring-2 focus:ring-[#006241]/40 focus:border-[#006241] shadow-xs font-normal transition-all"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white p-1 flex items-center"
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

        {/* Desktop View: Horizontal Chips & Search Row */}
        <div className="hidden md:flex items-center justify-between gap-4">
          {/* Ordered View Selector Chips */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#8E8E93] text-[11px] font-semibold mr-1 shrink-0">Views:</span>
            {VIEW_OPTIONS.map((opt) => {
              const isSelected = view === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onViewChange(opt.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all shrink-0 ${
                    isSelected
                      ? 'bg-[#006241] text-white shadow-xs'
                      : 'bg-black/[0.05] dark:bg-white/[0.08] text-[#636366] dark:text-[#AEAEB2] hover:bg-black/[0.08]'
                  }`}
                >
                  <span>{opt.label}</span>
                  {opt.isDefault && (
                    <span
                      className={`text-[10px] font-medium transition-colors ${
                        isSelected ? 'text-white/80' : 'text-[#8E8E93] dark:text-[#98989D]'
                      }`}
                    >
                      Default
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop Search Bar */}
          <div className="relative w-80 lg:w-96">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E8E93] pointer-events-none flex items-center">
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
              placeholder="Search ingredients (Eng and Vie)"
              className="w-full text-xs py-2 pl-9 pr-9 rounded-xl bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] text-[#1C1C1E] dark:text-white placeholder-[#8E8E93] focus:ring-2 focus:ring-[#006241]/40 focus:border-[#006241] shadow-xs font-normal"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white p-0.5 flex items-center"
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
      </div>
    </header>
  );
};
