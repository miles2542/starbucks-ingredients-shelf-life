import { describe, expect, it } from 'vitest';
import { INGREDIENTS } from '../../data/ingredients.ts';
import { filterIngredients, normalizeSearchText, tokenizeQuery } from '../search.ts';

describe('search normalization & tokenization', () => {
  it('strips Vietnamese accents and transforms đ/Đ', () => {
    expect(normalizeSearchText('Sữa đặc')).toBe('sua dac');
    expect(normalizeSearchText('Kem muối')).toBe('kem muoi');
    expect(normalizeSearchText('Thanh Long Xoài Sấy')).toBe('thanh long xoai say');
    expect(normalizeSearchText('Đường nước')).toBe('duong nuoc');
  });

  it('tokenizes multi-word query into clean tokens', () => {
    expect(tokenizeQuery('  bột   quế  ')).toEqual(['bot', 'que']);
    expect(tokenizeQuery('Lọ bột rắc quế')).toEqual(['lo', 'bot', 'rac', 'que']);
    expect(tokenizeQuery('')).toEqual([]);
  });
});

describe('multi-token & non-consecutive matching', () => {
  it('matches "Lọ bột rắc quế" when searching "bot que" and ranks it at top', () => {
    const results = filterIngredients(INGREDIENTS, 'bot que');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe('cinnamon-powder-shaker');
  });

  it('matches "Lọ bột rắc socola" when searching "bot socola"', () => {
    const results = filterIngredients(INGREDIENTS, 'bot socola');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe('chocolate-powder-shaker');
  });

  it('handles token order independence (e.g. "que bot")', () => {
    const results = filterIngredients(INGREDIENTS, 'que bot');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe('cinnamon-powder-shaker');
  });

  it('handles accented and unaccented queries identically', () => {
    const unaccented = filterIngredients(INGREDIENTS, 'bot que');
    const accented = filterIngredients(INGREDIENTS, 'bột quế');
    expect(accented.map((i) => i.id)).toEqual(unaccented.map((i) => i.id));
  });
});

describe('domain synonyms & shorthands', () => {
  it('matches barista acronyms like "vsc" and "vsccb"', () => {
    const vscResults = filterIngredients(INGREDIENTS, 'vsc');
    expect(vscResults.some((item) => item.id === 'vsccb')).toBe(true);

    const vsccbResults = filterIngredients(INGREDIENTS, 'vsccb');
    expect(vsccbResults[0].id).toBe('vsccb');
  });

  it('matches "scde" to SCDE Foam', () => {
    const results = filterIngredients(INGREDIENTS, 'scde');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe('scde-foam');
  });

  it('matches "sua dac" to AD Sauce', () => {
    const results = filterIngredients(INGREDIENTS, 'sua dac');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe('ad-sauce');
  });

  it('matches "dau say" to Dried Strawberry Inclusion', () => {
    const results = filterIngredients(INGREDIENTS, 'dau say');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe('dried-strawberry');
  });

  it('matches "xoai say" to Dried Mango & Dragonfruit', () => {
    const results = filterIngredients(INGREDIENTS, 'xoai say');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe('dried-mango-dragonfruit');
  });
});

describe('shelf life duration shorthands', () => {
  it('filters 24-hour items via "24h"', () => {
    const results = filterIngredients(INGREDIENTS, '24h');
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((item) => item.shelfLifeDisplay === '24 hours')).toBe(true);
  });

  it('filters 7-day items via "7d"', () => {
    const results = filterIngredients(INGREDIENTS, '7d');
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((item) => item.shelfLifeDisplay === '7 days')).toBe(true);
  });

  it('combines duration shorthand with item name e.g. "24h milk"', () => {
    const results = filterIngredients(INGREDIENTS, '24h milk');
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((item) => item.shelfLifeDisplay === '24 hours')).toBe(true);
    expect(results.some((item) => item.id === 'whole-milk')).toBe(true);
  });
});

describe('cross-field & dosing tool search', () => {
  it('filters by Vietnamese dosing spoon shorthand e.g. "thia lo"', () => {
    const results = filterIngredients(INGREDIENTS, 'thia lo');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((item) => item.id === 'pomegranate-pearls')).toBe(true);
  });

  it('filters by English dosing spoon e.g. "holed spoon"', () => {
    const results = filterIngredients(INGREDIENTS, 'holed spoon');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((item) => item.id === 'pomegranate-pearls')).toBe(true);
  });

  it('matches cross-field query e.g. "cbs matcha"', () => {
    const results = filterIngredients(INGREDIENTS, 'cbs matcha');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((item) => item.id === 'pure-matcha-powder')).toBe(true);
  });

  it('returns all items on empty query', () => {
    const results = filterIngredients(INGREDIENTS, '');
    expect(results.length).toBe(INGREDIENTS.length);
  });
});
