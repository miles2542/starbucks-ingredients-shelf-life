import type React from 'react';
import type { Ingredient, LocaleMode } from '../types/ingredient.ts';
import { IngredientRow } from './IngredientRow.tsx';

interface StationTableProps {
  items: readonly Ingredient[];
  locale: LocaleMode;
}

export const StationTable: React.FC<StationTableProps> = ({ items, locale }): React.JSX.Element => {
  if (items.length === 0) {
    return (
      <div className="py-4 text-center text-[#8E8E93] dark:text-[#636366] text-xs italic">
        No matching ingredients
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-black/[0.08] dark:border-white/[0.1] text-[11px] font-semibold text-[#8E8E93] dark:text-[#98989D]">
            <th className="px-3 pb-2.5 font-semibold">Ingredient</th>
            <th className="px-3 pb-2.5 font-semibold w-28">Shelf Life</th>
            <th className="px-3 pb-2.5 font-semibold w-40">Dosing Spoon</th>
            <th className="px-3 pb-2.5 font-semibold w-28 text-right">Day-Dot</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <IngredientRow key={item.id} ingredient={item} locale={locale} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
