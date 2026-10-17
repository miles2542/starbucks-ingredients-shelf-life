import type { Ingredient } from '../types/ingredient.ts';

/**
 * Normalizes input text for fast, accent-insensitive and case-insensitive search.
 * Strips Vietnamese diacritics using Unicode NFD decomposition, converts đ/Đ to d,
 * replaces non-alphanumeric punctuation with spaces, and collapses whitespace.
 */
export function normalizeSearchText(text: string): string {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Splits query string into separate lowercase, diacritic-free search tokens.
 */
export function tokenizeQuery(query: string): string[] {
  const normalized = normalizeSearchText(query);
  if (!normalized) return [];
  return normalized.split(' ').filter(Boolean);
}

/**
 * Common duration shorthands used by baristas in both English & Vietnamese.
 */
const DURATION_ALIASES: Record<string, readonly string[]> = {
  '24 hours': ['24h', '24 gio', '24gio', '24 tieng', '24tieng', '24hours', '1 ngay'],
  '1 day': ['1d', '1 ngay', '1ngay', 'hom nay', 'today', 'same day', 'trong ngay'],
  '2 days': ['2d', '2 ngay', '2ngay'],
  '3 days': ['3d', '3 ngay', '3ngay'],
  '5 days': ['5d', '5 ngay', '5ngay'],
  '7 days': ['7d', '7 ngay', '7ngay', '1 tuan', '1 week'],
  '14 days': ['14d', '14 ngay', '14ngay', '2 tuan', '2 weeks'],
  '1 month': ['1m', '1 thang', '1thang', '30d', '30 ngay', '1 month'],
  '3 months': ['3m', '3 thang', '3thang', '90d', '90 ngay', '3 months'],
  '8 hours': ['8h', '8 gio', '8gio', '8 tieng', '8tieng', '8 hours'],
  '60 minutes': ['60m', '60p', '60 phut', '60phut', '60 mins', '1h', '1 gio'],
  Immediate: ['immediate', 'ngay lap tuc', 'tuc thi', 'ngay'],
};

/**
 * Station name equivalents in Vietnamese & colloquial English.
 */
const STATION_ALIASES: Record<string, readonly string[]> = {
  mastrena: ['mastrena', 'hot bar', 'espresso', 'bar nong', 'quay nong'],
  cbs: ['cbs', 'cold bar', 'bar lanh', 'quay lanh', 'frappuccino', 'blended'],
  condiment: ['condiment', 'condiment bar', 'quay gia vi', 'gia vi', 'ban gia vi'],
  others: [
    'others',
    'tea',
    'brewed',
    'quay tra',
    'tra',
    'ca phe loc',
    'food',
    'warming',
    'boh',
    'back of house',
    'kho',
  ],
};

/**
 * Storage condition terms in Vietnamese & English.
 */
const STORAGE_ALIASES: Record<string, readonly string[]> = {
  ambient: ['ambient', 'nhiet do phong', 'phong', 'thuong', 'ben ngoai'],
  refrigerated: ['refrigerated', 'tu lanh', 'tu mat', 'lanh', 'cold', 'fridge'],
};

/**
 * Dosing tool keywords and synonyms.
 */
const DOSING_ALIASES: Record<string, readonly string[]> = {
  '15ml spoon (thìa 15ml)': ['15ml', 'thia 15ml', 'muong 15ml', 'thia', 'muong'],
  'Holed spoon (thìa lỗ)': ['holed spoon', 'thia lo', 'muong lo', 'thia', 'muong', 'lo'],
  'Matcha spoon (thìa Matcha)': ['matcha spoon', 'thia matcha', 'muong matcha', 'thia', 'muong'],
  '1 tbsp': ['1 tbsp', '1tbsp', 'tablespoon'],
  '2 tbsp': ['2 tbsp', '2tbsp', 'tablespoon'],
};

/**
 * Domain-specific abbreviations, nicknames, and bilingual synonyms for ingredients.
 */
const INGREDIENT_SYNONYMS: Record<string, readonly string[]> = {
  'ad-sauce': ['sua dac', 'ad sauce', 'condensed milk', 'sauce ad', 'ong tho'],
  'mocha-sauce': ['sot socola', 'chocolate sauce', 'sot chocolate', 'mocha'],
  'pumpkin-spice-sauce': ['psl', 'pumpkin', 'sot bi do'],
  'caramel-sauce': ['caramel drizzle', 'sot caramel', 'sauce caramel'],
  'caramel-syrup-cbs': ['siro caramel', 'syrup caramel'],
  'classic-syrup-mastrena': [
    'duong nuoc',
    'duong dai',
    'pump dai',
    'duong nuoc pump dai',
    'classic syrup',
  ],
  'classic-syrup-cbs': ['duong nuoc', 'duong ngan', 'pump ngan', 'duong nuoc pump ngan'],
  'classic-sugar-jar': ['lo duong nuoc', 'duong nuoc', 'sugar jar', 'classic jar', 'hu duong'],
  'whole-milk': ['sua tuoi', 'sua thanh trung', 'sua nguyen kem', 'fresh milk'],
  'heavy-cream': ['kem beo', 'heavy whipping cream'],
  'whipping-cream': ['kem danh', 'kem whipping', 'whipped cream', 'binh kem'],
  'half-and-half-milk': ['sua half', 'half half', 'half and half'],
  vsccb: ['vsc', 'vsccb', 'kem ngot', 'sweet cream', 'kem vani'],
  'scde-foam': ['kem muoi', 'scde', 'foam muoi', 'salted caramel cream cold foam'],
  'signature-chocolate': ['socola signature', 'bot socola nong'],
  'chai-tea-concentrate': ['tra chai', 'cot tra chai', 'chai concentrate'],
  'cold-brew-concentrate': ['cb', 'cold brew', 'cot ca phe cold brew', 'cot cold brew'],
  'black-tea': ['tra den', 'black tea'],
  'green-tea': ['tra xanh', 'green tea'],
  'hibiscus-tea': ['tra thao moc', 'tra dam but', 'tra do', 'hibiscus'],
  'pure-matcha-powder': ['pure matcha', 'matcha nguyen chat', 'bot pure matcha', 'matcha'],
  'green-tea-powder': ['bot tra xanh', 'matcha ngot'],
  'hojicha-powder': ['bot hojicha', 'tra rang hojicha'],
  'frappuccino-roast': ['nuoc ca phe', 'frap roast', 'fr', 'frap'],
  'frappuccino-chips': ['socola vien', 'frap chip', 'chocolate chips', 'socola hat'],
  'dried-strawberry': [
    'dau say',
    'strawberry slice',
    'dried strawberry',
    'dau',
    'strawberry inclusion',
  ],
  'dried-mango-dragonfruit': [
    'xoai say',
    'thanh long say',
    'thanh long xoai say',
    'mango slice',
    'dragonfruit inclusion',
  ],
  'cream-base': ['frap base', 'base kem', 'cream base'],
  'coffee-base': ['frap base', 'base ca phe', 'coffee base'],
  'lemonade-base': ['cot chanh', 'nuoc chanh', 'lemonade'],
  'strawberry-base': ['cot dau acai', 'strawberry acai', 'sar'],
  'mango-dragonfruit-base': ['cot xoai thanh long', 'mango dragonfruit', 'mdr'],
  'coconut-base': ['cot dua', 'sua dua', 'coconut base'],
  'mango-passionfruit-juice': ['cot xoai chanh leo', 'mango passionfruit'],
  'raspberry-base': ['cot mam xoi', 'raspberry'],
  'coconut-water': ['nuoc dua'],
  'coconut-cream': ['kem dua'],
  'strawberry-sauce': ['sot dau', 'strawberry puree'],
  'pomegranate-pearls': ['hat no luu', 'tran chau luu', 'pearls'],
  'white-tea-pearls': ['tran chau trang'],
  'black-tea-pearls': ['tran chau den'],
  'coffee-jelly': ['thach ca phe', 'jelly ca phe'],
  'blood-orange-pearls': ['hat no cam', 'tran chau cam'],
  'earl-grey-jelly': ['thach ba tuoc', 'thach earl grey'],
  'lychee-rose-sauce': ['sot vai', 'sot vai hoa hong'],
  'matcha-sauce': ['kem tra xanh', 'sot matcha'],
  'chocolate-powder-shaker': [
    'lo bot rac socola',
    'bot socola',
    'bot cacao',
    'rac socola',
    'chocolate shaker',
    'cacao shaker',
  ],
  'cinnamon-powder-shaker': ['lo bot rac que', 'bot que', 'rac que', 'cinnamon shaker', 'lo que'],
  'vanilla-powder-shaker': [
    'lo bot rac vanilla',
    'bot vani',
    'rac vani',
    'vanilla shaker',
    'lo vani',
  ],
  'brewed-coffee': ['ca phe u nong', 'cadence', 'brewed coffee'],
  'espresso-shot': ['ca phe espresso', 'shot espresso'],
  'iced-coffee': ['ca phe da u', 'iced coffee'],
  'tea-filter-bags': ['tui loc tra teavana', 'goi tra'],
  'whole-bean-bags': ['hat ca phe nguyen hat', 'whole bean', 'ca phe hat'],
};

interface SearchDocument {
  nameEn: string;
  nameVi: string;
  nameEnWords: readonly string[];
  nameViWords: readonly string[];
  category: string;
  station: string;
  storage: string;
  dosingTool: string;
  shelfLife: string;
  extraTerms: readonly string[];
  allText: string;
}

const documentCache = new WeakMap<Ingredient, SearchDocument>();

/**
 * Builds or retrieves the normalized, multi-field search document for an ingredient.
 */
export function getSearchDocument(item: Ingredient): SearchDocument {
  const cached = documentCache.get(item);
  if (cached) return cached;

  const nameEn = normalizeSearchText(item.nameEn);
  const nameVi = normalizeSearchText(item.nameVi);
  const category = normalizeSearchText(item.category);
  const station = normalizeSearchText(item.station);
  const storage = normalizeSearchText(item.storage);
  const dosingTool = normalizeSearchText(item.dosingTool);
  const shelfLife = normalizeSearchText(item.shelfLifeDisplay);

  const durationAliases = DURATION_ALIASES[item.shelfLifeDisplay] ?? [];
  const stationAliases = STATION_ALIASES[item.station] ?? [];
  const storageAliases = STORAGE_ALIASES[item.storage] ?? [];
  const dosingAliases = DOSING_ALIASES[item.dosingTool] ?? [];
  const itemSynonyms = INGREDIENT_SYNONYMS[item.id] ?? [];

  const extraTerms = [
    ...durationAliases,
    ...stationAliases,
    ...storageAliases,
    ...dosingAliases,
    ...itemSynonyms,
  ].map(normalizeSearchText);

  const allText = [
    nameEn,
    nameVi,
    category,
    station,
    storage,
    dosingTool,
    shelfLife,
    ...extraTerms,
  ].join(' ');

  const doc: SearchDocument = {
    nameEn,
    nameVi,
    nameEnWords: nameEn.split(' ').filter(Boolean),
    nameViWords: nameVi.split(' ').filter(Boolean),
    category,
    station,
    storage,
    dosingTool,
    shelfLife,
    extraTerms,
    allText,
  };

  documentCache.set(item, doc);
  return doc;
}

/**
 * Computes a fine-grained relevance score for an ingredient against the search query.
 */
export function scoreIngredient(
  item: Ingredient,
  tokens: readonly string[],
  fullNormalizedQuery: string,
): number {
  const doc = getSearchDocument(item);
  let score = 0;

  // Exact full-phrase match on primary names
  if (doc.nameEn === fullNormalizedQuery || doc.nameVi === fullNormalizedQuery) {
    score += 2000;
  } else if (
    doc.nameEn.startsWith(fullNormalizedQuery) ||
    doc.nameVi.startsWith(fullNormalizedQuery)
  ) {
    score += 1000;
  } else if (doc.extraTerms.some((term) => term === fullNormalizedQuery)) {
    score += 800;
  } else if (doc.nameEn.includes(fullNormalizedQuery) || doc.nameVi.includes(fullNormalizedQuery)) {
    score += 600;
  } else if (doc.extraTerms.some((term) => term.includes(fullNormalizedQuery))) {
    score += 400;
  }

  // Token-level precision bonuses
  for (const token of tokens) {
    const enWordPrefix = doc.nameEnWords.some((w) => w.startsWith(token));
    const viWordPrefix = doc.nameViWords.some((w) => w.startsWith(token));
    if (enWordPrefix || viWordPrefix) {
      score += 250;
    } else if (doc.nameEn.includes(token) || doc.nameVi.includes(token)) {
      score += 120;
    }

    const enWordExact = doc.nameEnWords.some((w) => w === token);
    const viWordExact = doc.nameViWords.some((w) => w === token);
    if (enWordExact || viWordExact) {
      score += 100;
    }

    if (doc.category.includes(token)) score += 40;
    if (doc.station.includes(token) || doc.storage.includes(token)) score += 30;
    if (doc.dosingTool.includes(token) || doc.shelfLife.includes(token)) score += 20;
    if (doc.extraTerms.some((term) => term.includes(token))) score += 15;
  }

  return score;
}

/**
 * Checks if an ingredient matches the query using multi-token AND matching.
 */
export function matchesIngredient(item: Ingredient, normalizedQuery: string): boolean {
  if (!normalizedQuery) return true;
  const tokens = tokenizeQuery(normalizedQuery);
  if (tokens.length === 0) return true;

  const doc = getSearchDocument(item);
  return tokens.every((token) => doc.allText.includes(token));
}

/**
 * Filters and ranks a list of ingredients using tokenized, accent-insensitive search.
 */
export function filterIngredients(items: readonly Ingredient[], query: string): Ingredient[] {
  const normalized = normalizeSearchText(query);
  if (!normalized) {
    return [...items];
  }

  const tokens = tokenizeQuery(normalized);
  if (tokens.length === 0) {
    return [...items];
  }

  const matchesWithScores: { item: Ingredient; score: number }[] = [];

  for (const item of items) {
    const doc = getSearchDocument(item);
    const isMatch = tokens.every((token) => doc.allText.includes(token));
    if (isMatch) {
      const score = scoreIngredient(item, tokens, normalized);
      matchesWithScores.push({ item, score });
    }
  }

  // Sort descending by score, preserving original order as stable fallback
  matchesWithScores.sort((a, b) => b.score - a.score);

  return matchesWithScores.map((entry) => entry.item);
}
