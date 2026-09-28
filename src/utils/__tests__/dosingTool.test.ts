import { describe, expect, it } from 'vitest';
import { formatDosingTool } from '../dosingTool.ts';

describe('formatDosingTool', () => {
  it('handles empty or dash spoons in all locales', () => {
    expect(formatDosingTool('–', 'dual')).toBe('–');
    expect(formatDosingTool('–', 'en')).toBe('–');
    expect(formatDosingTool('–', 'vi')).toBe('–');
  });

  it('keeps tbsp spoons English across all locales', () => {
    expect(formatDosingTool('1 tbsp', 'dual')).toBe('1 tbsp');
    expect(formatDosingTool('1 tbsp', 'en')).toBe('1 tbsp');
    expect(formatDosingTool('1 tbsp', 'vi')).toBe('1 tbsp');

    expect(formatDosingTool('2 tbsp', 'dual')).toBe('2 tbsp');
    expect(formatDosingTool('2 tbsp', 'en')).toBe('2 tbsp');
    expect(formatDosingTool('2 tbsp', 'vi')).toBe('2 tbsp');
  });

  it('formats bilingual spoons correctly with capitalization for Vietnamese', () => {
    // 15ml spoon
    expect(formatDosingTool('15ml spoon (thìa 15ml)', 'dual')).toBe('15ml spoon (thìa 15ml)');
    expect(formatDosingTool('15ml spoon (thìa 15ml)', 'en')).toBe('15ml spoon');
    expect(formatDosingTool('15ml spoon (thìa 15ml)', 'vi')).toBe('Thìa 15ml');

    // Holed spoon
    expect(formatDosingTool('Holed spoon (thìa lỗ)', 'dual')).toBe('Holed spoon (thìa lỗ)');
    expect(formatDosingTool('Holed spoon (thìa lỗ)', 'en')).toBe('Holed spoon');
    expect(formatDosingTool('Holed spoon (thìa lỗ)', 'vi')).toBe('Thìa lỗ');

    // Matcha spoon with special capitalization
    expect(formatDosingTool('Matcha spoon (thìa Matcha)', 'dual')).toBe(
      'Matcha spoon (thìa Matcha)',
    );
    expect(formatDosingTool('Matcha spoon (thìa Matcha)', 'en')).toBe('Matcha spoon');
    expect(formatDosingTool('Matcha spoon (thìa Matcha)', 'vi')).toBe('Thìa Matcha');
  });
});
