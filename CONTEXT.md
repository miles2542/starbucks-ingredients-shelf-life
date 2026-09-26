# Starbucks Ingredients Shelf Life — Domain Glossary

This glossary defines the authoritative domain language and structural relationships for the Starbucks Ingredients Shelf Life project.

## Stations & Spatial Architecture

- **Station**: The physical workstation where ingredients are stored and prepped.
  - **Mastrena**: Primary hot espresso bar. Subdivided into **Ambient** and **Refrigerated**.
  - **CBS (Cold Beverage Station)**: Cold bar station for blended drinks, refreshers, and iced teas. Subdivided into **Ambient** and **Refrigerated**.
  - **Condiment Bar**: Customer and counter bar condiment station with powders and syrups.
  - **Others**: Store-wide, back-of-house, batch brewed, and bulk beans.
- **Station Spatial Layout (Desktop)**: 
  - Primary stations: Mastrena (Left column) and CBS (Right column).
  - Auxiliary stations: Condiment Bar and Others positioned below as visually distinct, dedicated sections.
  - Mobile layout: Low-friction unified layout with sticky quick-jump navigation and zero redundant clicks.

## Storage Conditions

- **Ambient (A)**: Room temperature storage.
- **Refrigerated (R)**: Cold storage (under-counter fridge, upright fridge, or iced well).
- *Note:* In the primary Physical Station view, explicit storage badges are omitted because subsections already partition items into Ambient and Refrigerated.

## Shelf Life & Rotation

- **Shelf Life**: Duration from opening/preparation to required discard.
- **Day-Dot**: Physical rotation sticker showing expiration day of week and date.
  - Multi-day format: `[Day of week · Date]` (e.g. `Mon · 28/9`, `Wed · 30/9`). Day abbreviation remains English globally (`Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`, `Sun`).
  - Sub-day / Immediate items: Kept blank with a subtle en-dash (`–`), indicating no multi-day day-dot sticker is required.
  - Calculation: Strictly calculated from live real-time clock (`Today + N days`).
- **Dosing Tool (Spoon / Pump)**: Utensil or hardware for dosing (e.g., `15ml spoon`, `holed spoon`, `matcha spoon`, `1 tbsp`, `2 tbsp`, `half-dose pump`). Displays subtle en-dash (`–`) when not applicable. Visible across all views.

## Locales & Search

- **Display Modes**:
  - **Dual Display (Default)**: English primary title with secondary Vietnamese translation underneath when available.
  - **English Only**: Displays English names exclusively.
  - **Vietnamese Only**: Displays Vietnamese names where available; falls back to English when no Vietnamese translation exists.
- **Search Behavior**:
  - Unaccented, case-insensitive fuzzy matching across both English and Vietnamese terms simultaneously.
  - In-place search: Preserves the active spatial layout and sections; matches remain visible while non-matching items and empty subsections collapse seamlessly.

## Grouping Lenses

1. **Physical Station (Default)**: Mastrena | CBS | Condiment Bar | Others.
2. **Category (Reference Image)**: CBS, Other Bev Ingredients, Sauce, Coffee and Tea, Milk, Syrup, Tea, Condiment Bar, Inclusion, Powder, Syrup Base, Topping.
3. **Shelf Life Duration**: Buckets from immediate/sub-day up to months.
4. **Storage Condition**: Ambient vs. Refrigerated.
