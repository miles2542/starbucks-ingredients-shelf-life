import type React from 'react';
import type { Ingredient, LocaleMode } from '../types/ingredient.ts';
import { formatDayDot } from '../utils/dayDot.ts';
import { formatDosingTool } from '../utils/dosingTool.ts';

interface IngredientRowProps {
  ingredient: Ingredient;
  locale: LocaleMode;
}

export const IngredientRow: React.FC<IngredientRowProps> = ({
  ingredient,
  locale,
}): React.JSX.Element => {
  const dayDot = formatDayDot(ingredient.shelfLifeDays, ingredient.shelfLifeDisplay);
  const dosingToolDisplay = formatDosingTool(ingredient.dosingTool, locale);

  let nameDisplay: React.JSX.Element;
  if (locale === 'en') {
    nameDisplay = (
      <div className="text-xs font-semibold text-[#1C1C1E] dark:text-[#FFFFFF] leading-snug">
        {ingredient.nameEn}
      </div>
    );
  } else if (locale === 'vi') {
    nameDisplay = (
      <div className="text-xs font-semibold text-[#1C1C1E] dark:text-[#FFFFFF] leading-snug">
        {ingredient.nameVi || ingredient.nameEn}
      </div>
    );
  } else {
    // Dual display
    nameDisplay = (
      <div>
        <div className="text-xs font-semibold text-[#1C1C1E] dark:text-[#FFFFFF] leading-snug">
          {ingredient.nameEn}
        </div>
        {ingredient.nameVi ? (
          <div className="text-[11px] text-[#636366] dark:text-[#AEAEB2] leading-snug mt-0.5 font-normal">
            {ingredient.nameVi}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <tr className="border-b border-black/[0.05] dark:border-white/[0.06] hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors group">
      <td className="py-2.5 sm:py-3 px-2 sm:px-3 pr-2 sm:pr-4 align-middle">{nameDisplay}</td>
      <td className="py-2.5 sm:py-3 px-2 sm:px-3 whitespace-nowrap align-middle text-left font-mono-num text-xs font-bold text-[#1C1C1E] dark:text-[#F2F2F7]">
        {ingredient.shelfLifeDisplay}
      </td>
      <td className="py-2.5 sm:py-3 px-2 sm:px-3 whitespace-nowrap align-middle text-left text-xs text-[#636366] dark:text-[#AEAEB2]">
        {dosingToolDisplay}
      </td>
      <td className="py-2.5 sm:py-3 px-2 sm:px-3 whitespace-nowrap align-middle text-right">
        {dayDot ? (
          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-xs font-medium font-mono-num bg-[#006241]/10 text-[#006241] dark:bg-[#34C759]/15 dark:text-[#34C759] inline-block">
            {dayDot}
          </span>
        ) : (
          <span className="text-black/25 dark:text-white/25 font-medium select-none">–</span>
        )}
      </td>
    </tr>
  );
};
