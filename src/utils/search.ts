import type { Ingredient } from '../types/ingredient.ts';

/**
 * Normalizes input text for fast, accent-insensitive and case-insensitive search.
 * Strips Vietnamese diacritics using Unicode NFD decomposition and converts đ/Đ to d.
 */
export function normalizeSearchText(text: string): string {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .toLowerCase()
    .trim();
}

/**
 * Checks if an ingredient matches the query across English name, Vietnamese name,
 * category, dosing tool, shelf-life display, and station.
 */
export function matchesIngredient(item: Ingredient, normalizedQuery: string): boolean {
  if (!normalizedQuery) return true;

  const enMatch = normalizeSearchText(item.nameEn).includes(normalizedQuery);
  const viMatch = normalizeSearchText(item.nameVi).includes(normalizedQuery);
  const catMatch = normalizeSearchText(item.category).includes(normalizedQuery);
  const toolMatch = normalizeSearchText(item.dosingTool).includes(normalizedQuery);
  const shelfMatch = normalizeSearchText(item.shelfLifeDisplay).includes(normalizedQuery);
  const stationMatch = normalizeSearchText(item.station).includes(normalizedQuery);

  return enMatch || viMatch || catMatch || toolMatch || shelfMatch || stationMatch;
}

/**
 * Filters a list of ingredients in-place using the query string.
 */
export function filterIngredients(items: readonly Ingredient[], query: string): Ingredient[] {
  const normalized = normalizeSearchText(query);
  if (!normalized) {
    return [...items];
  }
  return items.filter((item) => matchesIngredient(item, normalized));
}
