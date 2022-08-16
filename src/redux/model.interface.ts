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
