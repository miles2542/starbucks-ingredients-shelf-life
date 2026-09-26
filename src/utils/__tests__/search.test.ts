import { describe, expect, it } from 'vitest';
import { INGREDIENTS } from '../../data/ingredients.ts';
import { filterIngredients, normalizeSearchText } from '../search.ts';

describe('search normalization', () => {
  it('strips Vietnamese accents and transforms đ/Đ', () => {
    expect(normalizeSearchText('Sữa đặc')).toBe('sua dac');
    expect(normalizeSearchText('Kem muối')).toBe('kem muoi');
    expect(normalizeSearchText('Thanh Long Xoài Sấy')).toBe('thanh long xoai say');
    expect(normalizeSearchText('Đường nước')).toBe('duong nuoc');
  });

  it('filters ingredients by unaccented query', () => {
    const results = filterIngredients(INGREDIENTS, 'sua dac');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((item) => item.id === 'ad-sauce')).toBe(true);
  });

  it('filters ingredients by English name query', () => {
    const results = filterIngredients(INGREDIENTS, 'pumpkin');
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('pumpkin-spice-sauce');
  });

  it('filters ingredients by dosing spoon query', () => {
    const results = filterIngredients(INGREDIENTS, 'holed spoon');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((item) => item.id === 'pomegranate-pearls')).toBe(true);
  });

  it('returns all items on empty query', () => {
    const results = filterIngredients(INGREDIENTS, '');
    expect(results.length).toBe(INGREDIENTS.length);
  });
});
