export type StationId = 'mastrena' | 'cbs' | 'condiment' | 'others';

export type StorageCondition = 'ambient' | 'refrigerated';

export type LocaleMode = 'dual' | 'en' | 'vi';

export type GroupingLens = 'station' | 'category' | 'shelf' | 'storage';

export interface Ingredient {
  id: string;
  nameEn: string;
  nameVi: string;
  station: StationId;
  subStationZone: StorageCondition;
  category: string;
  storage: StorageCondition;
  shelfLifeDays: number; // 0 for sub-day / immediate
  shelfLifeDisplay: string;
  dosingTool: string;
}

export interface StationDefinition {
  id: StationId;
  title: string;
  subtitle: string;
  isPrimary: boolean;
}
