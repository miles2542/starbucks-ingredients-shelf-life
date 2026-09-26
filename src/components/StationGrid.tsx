import type React from 'react';
import type { Ingredient, LocaleMode } from '../types/ingredient.ts';
import { StationTable } from './StationTable.tsx';

interface StationGridProps {
  ingredients: readonly Ingredient[];
  locale: LocaleMode;
}

export const StationGrid: React.FC<StationGridProps> = ({
  ingredients,
  locale,
}): React.JSX.Element => {
  const mastrena = ingredients.filter((i) => i.station === 'mastrena');
  const cbs = ingredients.filter((i) => i.station === 'cbs');
  const condiment = ingredients.filter((i) => i.station === 'condiment');
  const others = ingredients.filter((i) => i.station === 'others');

  const mastrenaAmbient = mastrena.filter((i) => i.subStationZone === 'ambient');
  const mastrenaCold = mastrena.filter((i) => i.subStationZone === 'refrigerated');
  const cbsAmbient = cbs.filter((i) => i.subStationZone === 'ambient');
  const cbsCold = cbs.filter((i) => i.subStationZone === 'refrigerated');

  const ambientLabel = locale === 'vi' ? 'Nhiệt độ phòng (Ambient)' : 'Ambient · Room Temperature';
  const coldLabel = locale === 'vi' ? 'Tủ mát (Refrigerated)' : 'Refrigerated · Cold Storage';

  // SVG Icons with accessible titles
  const MastrenaIcon = (
    <svg
      className="w-5 h-5 text-[#006241] dark:text-[#34C759]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Mastrena icon"
    >
      <title>Mastrena icon</title>
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  );

  const CbsIcon = (
    <svg
      className="w-5 h-5 text-[#006241] dark:text-[#34C759]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="CBS icon"
    >
      <title>CBS icon</title>
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="12" y1="2" x2="12" y2="5" />
    </svg>
  );

  const CondimentIcon = (
    <svg
      className="w-5 h-5 text-[#8E8E93]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Condiment bar icon"
    >
      <title>Condiment bar icon</title>
      <rect width="8" height="12" x="8" y="8" rx="2" />
      <path d="M10 8V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v3" />
      <line x1="10" y1="13" x2="14" y2="13" />
    </svg>
  );

  const OthersIcon = (
    <svg
      className="w-5 h-5 text-[#8E8E93]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Storage reserve icon"
    >
      <title>Storage reserve icon</title>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );

  const hasMastrena = mastrena.length > 0;
  const hasCbs = cbs.length > 0;
  const hasCondiment = condiment.length > 0;
  const hasOthers = others.length > 0;

  if (!hasMastrena && !hasCbs && !hasCondiment && !hasOthers) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm font-medium text-[#8E8E93] dark:text-[#98989D]">
          No ingredients match your query.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Primary Stations 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-start">
        {/* MASTRENA STATION */}
        {hasMastrena && (
          <section className="bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] rounded-2xl p-[1.1rem] sm:p-5 lg:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
            <header className="pb-3 mb-3.5 sm:pb-4 sm:mb-5 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {MastrenaIcon}
                  <h2 className="text-sm sm:text-base font-bold tracking-tight text-[#1C1C1E] dark:text-[#FFFFFF]">
                    Mastrena Station
                  </h2>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-[#8E8E93] dark:text-[#98989D] font-mono-num">
                  {mastrena.length} items
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#8E8E93] dark:text-[#98989D] mt-0.5 pl-7">
                Hot Espresso Bar, Core Syrups & Dairy
              </p>
            </header>

            {mastrenaAmbient.length > 0 && (
              <div className="bg-[#F9F9FB] dark:bg-[#252528] rounded-xl p-2.5 sm:p-4 lg:p-5 mb-3.5 sm:mb-5 border border-black/[0.04] dark:border-white/[0.06]">
                <div className="text-xs font-bold text-[#1C1C1E] dark:text-[#FFFFFF] flex items-center gap-2 mb-2.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-amber-500 inline-block" />
                  <span>{ambientLabel}</span>
                </div>
                <StationTable items={mastrenaAmbient} locale={locale} />
              </div>
            )}

            {mastrenaCold.length > 0 && (
              <div className="bg-[#F9F9FB] dark:bg-[#252528] rounded-xl p-2.5 sm:p-4 lg:p-5 border border-black/[0.04] dark:border-white/[0.06]">
                <div className="text-xs font-bold text-[#1C1C1E] dark:text-[#FFFFFF] flex items-center gap-2 mb-2.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-cyan-500 inline-block" />
                  <span>{coldLabel}</span>
                </div>
                <StationTable items={mastrenaCold} locale={locale} />
              </div>
            )}
          </section>
        )}

        {/* CBS STATION */}
        {hasCbs && (
          <section className="bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] rounded-2xl p-[1.1rem] sm:p-5 lg:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
            <header className="pb-3 mb-3.5 sm:pb-4 sm:mb-5 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {CbsIcon}
                  <h2 className="text-sm sm:text-base font-bold tracking-tight text-[#1C1C1E] dark:text-[#FFFFFF]">
                    CBS Station
                  </h2>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-[#8E8E93] dark:text-[#98989D] font-mono-num">
                  {cbs.length} items
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#8E8E93] dark:text-[#98989D] mt-0.5 pl-7">
                Cold Beverage Station, Refreshers & Frappuccinos
              </p>
            </header>

            {cbsAmbient.length > 0 && (
              <div className="bg-[#F9F9FB] dark:bg-[#252528] rounded-xl p-2.5 sm:p-4 lg:p-5 mb-3.5 sm:mb-5 border border-black/[0.04] dark:border-white/[0.06]">
                <div className="text-xs font-bold text-[#1C1C1E] dark:text-[#FFFFFF] flex items-center gap-2 mb-2.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-amber-500 inline-block" />
                  <span>{ambientLabel}</span>
                </div>
                <StationTable items={cbsAmbient} locale={locale} />
              </div>
            )}

            {cbsCold.length > 0 && (
              <div className="bg-[#F9F9FB] dark:bg-[#252528] rounded-xl p-2.5 sm:p-4 lg:p-5 border border-black/[0.04] dark:border-white/[0.06]">
                <div className="text-xs font-bold text-[#1C1C1E] dark:text-[#FFFFFF] flex items-center gap-2 mb-2.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-cyan-500 inline-block" />
                  <span>{coldLabel}</span>
                </div>
                <StationTable items={cbsCold} locale={locale} />
              </div>
            )}
          </section>
        )}
      </div>

      {/* Auxiliary Stations */}
      {(hasCondiment || hasOthers) && (
        <div className="pt-4 border-t border-black/[0.08] dark:border-white/[0.1]">
          <h3 className="text-xs font-bold text-[#8E8E93] dark:text-[#98989D] mb-3 sm:mb-4">
            Auxiliary & Storage Stations
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-start">
            {hasCondiment && (
              <section className="bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] rounded-2xl p-[1.1rem] sm:p-5 lg:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
                <header className="pb-3 mb-3.5 sm:pb-4 sm:mb-5 border-b border-black/[0.06] dark:border-white/[0.08]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {CondimentIcon}
                      <h2 className="text-sm sm:text-base font-bold tracking-tight text-[#1C1C1E] dark:text-[#FFFFFF]">
                        Condiment Bar
                      </h2>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-[#8E8E93] dark:text-[#98989D] font-mono-num">
                      {condiment.length} items
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#8E8E93] dark:text-[#98989D] mt-0.5 pl-7">
                    Sugar Jars, Powders & Self-Serve Station
                  </p>
                </header>
                <div className="bg-[#F9F9FB] dark:bg-[#252528] rounded-xl p-2.5 sm:p-4 lg:p-5 border border-black/[0.04] dark:border-white/[0.06]">
                  <StationTable items={condiment} locale={locale} />
                </div>
              </section>
            )}

            {hasOthers && (
              <section className="bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] rounded-2xl p-[1.1rem] sm:p-5 lg:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
                <header className="pb-3 mb-3.5 sm:pb-4 sm:mb-5 border-b border-black/[0.06] dark:border-white/[0.08]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {OthersIcon}
                      <h2 className="text-sm sm:text-base font-bold tracking-tight text-[#1C1C1E] dark:text-[#FFFFFF]">
                        Others & Storage
                      </h2>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-[#8E8E93] dark:text-[#98989D] font-mono-num">
                      {others.length} items
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#8E8E93] dark:text-[#98989D] mt-0.5 pl-7">
                    Cadence Brewed Coffee, Filter Bags & Bulk Beans
                  </p>
                </header>
                <div className="bg-[#F9F9FB] dark:bg-[#252528] rounded-xl p-2.5 sm:p-4 lg:p-5 border border-black/[0.04] dark:border-white/[0.06]">
                  <StationTable items={others} locale={locale} />
                </div>
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
