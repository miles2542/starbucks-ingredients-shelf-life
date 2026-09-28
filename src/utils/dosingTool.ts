import type { LocaleMode } from '../types/ingredient.ts';

/**
 * Formats a dosing tool string according to the selected locale:
 * - 'dual': Returns the original string as is (e.g. "15ml spoon (thìa 15ml)").
 * - 'en': Returns only the English portion (e.g. "15ml spoon", "1 tbsp", "–").
 * - 'vi': Returns only the Vietnamese portion with capitalized first letter
 *         (e.g. "Thìa 15ml", "Thìa lỗ", "Thìa Matcha"), or English for tbsp/untranslated items.
 */
export function formatDosingTool(dosingTool: string, locale: LocaleMode): string {
  if (!dosingTool || dosingTool === '–') {
    return '–';
  }

  if (locale === 'dual') {
    return dosingTool;
  }

  // Spoons with tbsp suffix only have English
  if (dosingTool.includes('tbsp')) {
    return dosingTool;
  }

  // Extract English and Vietnamese parts from "English (vietnamese)" format
  const match = dosingTool.match(/^(.*?)\s*\((.*?)\)$/);
  if (match) {
    const en = match[1].trim();
    let vi = match[2].trim();

    if (locale === 'en') {
      return en;
    }

    // Capitalize first letter for Vietnamese display
    if (vi.length > 0) {
      vi = vi.charAt(0).toUpperCase() + vi.slice(1);
    }
    return vi;
  }

  return dosingTool;
}
