export interface ReducerState {
  isLoggedIn: boolean;
  language: Language;
  isDarkColorMode: boolean;
  mobileOpen: boolean;
  groceryList: GroceryList;
  myList: GroceryList;
  jwt: string;
  userId: string;
}

export interface RootState {
  reducer: ReducerState;
}

export interface DecodedTokenType {
  userId: string;
}
export enum Language {
  english = "english",
  kannada = "kannada",
}

export enum Measurement {
  kg = "kg",
  liter = "liter",
  quantity = "quantity",
}

export enum Quantity {
  small = "small",
  medium = "medium",
  large = "large",
  extraLarge = "extraLarge",
}

export enum Category {
  cerealGrain = "cerealGrain",
  pulses = "pulses",
  oil = "oil",
  snacks = "snacks",
  sweet = "sweet",
  noodles = "noodles",
  salt = "salt",
}

export enum SubCategory {
  rice = "rice",
  wheat = "wheat",
  dhal = "dhal",
  gram = "gram",
  sunflowerOil = "sunflowerOil",
  biscuit = "biscuit",
  sweet = "sweet",
  noodles = "noodles",
  salt = "salt",
}

export enum FilterType {
  category = "category",
  subCategory = "subCategory",
  measurement = "measurement",
  quantity = "quantity",
  name = "name",
}

export interface Grocery {
  name: LanguageKeyValue;
  [FilterType.category]: Category;
  [FilterType.subCategory]: SubCategory;
  [FilterType.measurement]: Measurement;
  value: string;
  sizeValue?: Quantity;
  size?: Quantity[];
}

export type LanguageKeyValue = {
  [key in Language]: string;
};

export type EnglishKannadaLookupType = {
  [FilterType.measurement]: {
    [key in Measurement]: LanguageKeyValue;
  };
  [FilterType.quantity]: {
    [key in Quantity]: LanguageKeyValue;
  };
  [FilterType.category]: {
    [key in Category]: LanguageKeyValue;
  };
  [FilterType.subCategory]: {
    [key in SubCategory]: LanguageKeyValue;
  };
};

export interface GroceryList {
  [key: string]: Grocery;
}

export interface UpdateGroceryListPayload {
  item: string;
  value: string;
}
