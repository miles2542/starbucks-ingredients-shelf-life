# Specification: Starbucks Ingredients Shelf Life & Day-Dot Matrix

## Problem Statement

Starbucks baristas in Vietnam need to quickly verify ingredient shelf lives, dosing tools (spoons/pumps), and expiration day-dots during fast-paced shifts and closing prep. The existing printed store laminated reference sheets are single-perspective (only categorized by ingredient type, not physical bar stations), static (cannot be searched quickly, require manual day-of-week mental calculation), lack bilingual accessibility, and cannot be referenced away from the bar.

## Solution

A high-performance, mobile-first, 100% offline-capable Progressive Web App (PWA) deployable on Vercel. It features:
- **Default Physical Station architecture:** 2-column split (Mastrena on left, CBS on right, each partitioned into Ambient and Refrigerated zones; Condiment Bar and Others anchored below).
- **Alternate grouping lenses:** One-tap toggle between Physical Station, Reference Category, Shelf Life Duration, and Storage Condition.
- **Automated live Day-Dot calculation:** Evaluates `Today + N days` in real time, formatting as `[Day of week · Date]` (e.g. `Mon · 28/9`) with sub-day items marked with an en-dash (`–`).
- **Accent-insensitive, bilingual instant search:** Live in-place filtering across English and Vietnamese names simultaneously without blowing away the barista's spatial layout.
- **Dual-locale display:** English primary with secondary Vietnamese translation, switchable to English-only or Vietnamese-only.
- **Light & dark themes:** Defaulting to light mode with a high-contrast dark mode for low-light bar environments.

## User Stories

1. As a barista at Mastrena, I want to view all espresso bar ingredients grouped by Ambient and Refrigerated storage, so that I can check expiration rules without leaving my station.
2. As a cold bar barista at CBS, I want to see dosing spoons (e.g., `15ml spoon`, `holed spoon`, `2 tbsp`) alongside each ingredient, so that I don't use the wrong portioning utensil.
3. As a closing barista prepping backup containers, I want to see the exact Day-Dot date (e.g., `Mon · 28/9`) computed for today's date, so that I don't make mental calculation errors while writing physical rotation stickers.
4. As a Vietnamese barista, I want to search for ingredients by typing unaccented Vietnamese (e.g., `kem muoi`, `sua dac`), so that I can look up items in under two seconds.
5. As an English-speaking barista, I want to search in English (e.g., `whipping cream`, `chai`), so that the tool works regardless of my native language.
6. As a barista in a walk-in cold storage area with poor Wi-Fi, I want the web app to load and function completely offline as an installed PWA, so that lack of internet connection never blocks store operations.
7. As a barista, I want to toggle between Physical Station view, Reference Category view, Shelf Life view, and Storage Condition view, so that I can cross-reference items however my current task requires.
8. As a barista working an evening shift, I want to toggle between light and dark themes, so that the screen is comfortable to look at in varying store lighting conditions.
9. As a barista searching for an item, I want the active station layout to remain intact while non-matching items collapse in-place, so that I do not lose my spatial awareness of where ingredients belong on the physical bar.

## Implementation Decisions

### 1. Technology Stack
- **Framework:** Vite + React 19 + TypeScript. Chosen for instant static builds, zero server latency, minimal bundle footprint (<60KB gzipped), and seamless static hosting on Vercel.
- **Styling:** Tailwind CSS with semantic dark mode support (`dark:` classes).
- **PWA & Offline:** `vite-plugin-pwa` with CacheFirst Workbox service worker caching all assets and static bundles for offline execution.
- **Linting & Code Quality:** Biome for strict TypeScript formatting and linting.

### 2. Data Model (`src/data/ingredients.ts`)
```typescript
export type StationId = 'mastrena' | 'cbs' | 'condiment' | 'others';
export type StorageCondition = 'ambient' | 'refrigerated';

export interface Ingredient {
  id: string;
  en: string;
  vi: string;
  station: StationId;
  subStationZone: StorageCondition;
  category: string;
  storage: StorageCondition;
  shelfLifeDays: number; // 0 for sub-day / immediate
  shelfLifeDisplay: string; // e.g. "1 day", "7 days", "14 days", "60 minutes"
  dosingTool: string; // e.g. "15ml spoon (thìa 15ml)", or "–"
}
```

### 3. Day-Dot Calculation Engine (`src/utils/dayDot.ts`)
- Pure function taking `shelfLifeDays: number` and `baseDate: Date = new Date()`.
- If `shelfLifeDays <= 0`, returns `null` (rendered as `–`).
- Target date: `target = new Date(baseDate.getTime() + shelfLifeDays * 86400000)`.
- Format: `${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][target.getDay()]} · ${target.getDate()}/${target.getMonth() + 1}`.

### 4. Search & Normalization Engine (`src/utils/search.ts`)
- Normalized text cache using Unicode NFD decomposition:
  `.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase()`.
- Multi-field matching across `en`, `vi`, `category`, `station`, and `dosingTool`.

### 5. UI Layout Architecture (`src/components/`)
- `StationGrid`: Desktop 2-column layout (Mastrena left, CBS right) with bottom auxiliary section for Condiment Bar and Others.
- `CategoryGrid`: Reference image grouping layout.
- `DurationGrid`: Shelf-life duration bucket layout.
- `StorageGrid`: Ambient vs. Refrigerated layout.
- `HeaderBar`: Contains search bar, view selector chips, locale selector (Dual / EN / VI), and dark/light toggle.

## Testing Decisions

- Unit tests with Vitest for:
  - Day-Dot date calculation across month and leap-year boundaries.
  - Sub-day day-dot exclusion returning `–`.
  - Vietnamese accent stripping and search filtering accuracy.
  - Category, station, and storage partitioning completeness.
