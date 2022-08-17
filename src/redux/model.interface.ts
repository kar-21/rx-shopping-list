export interface RootState {
  isLoggedIn: boolean,
  lang: string,
  isDarkColorMode: boolean,
  mobileOpen: boolean,
  groceryList: GroceryList,
  myList: GroceryList,
  jwt: string,
  userId: string,
}

export interface DecodedTokenType {
  userId: string;
}

export interface Grocery {
  name: {
    eng: string;
    ka: string;
  };
  category: string;
  subCategory: string;
  measurement: string;
  value: string;
  sizeValue?: string;
  size?: string[];
}

export interface GroceryList {
  [key: string]: Grocery;
}

export interface UpdateGroceryListPayload {
  item: string;
  value: string;
}
