import { createAction } from 'typesafe-actions';

import {
  SET_JWT,
  SET_USER_ID,
  SET_LANG,
  SET_IS_DARK_MODE,
  SET_MOBILE_OPEN,
  RESET_ALL_LISTS,
  SET_IS_LOGGED_IN,
  UPDATE_SIZE_VALUE_OF_MY_LIST,
  UPDATE_VALUE_OF_MY_LIST,
  UPDATE_MY_LIST_GROCERY_LIST,
} from './actionType';
import {
  UpdateGroceryListPayload,
  Language,
  GroceryList,
} from './model.interface';

export const setIsLoggedInAction = createAction(SET_IS_LOGGED_IN)<boolean>();

export const setJwtTokenAction = createAction(SET_JWT)<string>();

export const setUserIDAction = createAction(SET_USER_ID)<string>();

export const setLanguageAction = createAction(SET_LANG)<Language>();

export const setIsDarkColorModeAction =
  createAction(SET_IS_DARK_MODE)<boolean>();

export const setMobileOpenAction = createAction(SET_MOBILE_OPEN)<boolean>();

export const updateMyListAndGroceryList = createAction(UPDATE_MY_LIST_GROCERY_LIST)<{
  myList: GroceryList;
  groceryList: GroceryList;
}>();

export const updateValueInMyListAction = createAction(
  UPDATE_VALUE_OF_MY_LIST,
)<UpdateGroceryListPayload>();

export const updateSizeValueInMyListAction = createAction(
  UPDATE_SIZE_VALUE_OF_MY_LIST,
)<UpdateGroceryListPayload>();

export const resetMyListAction = createAction(RESET_ALL_LISTS)();
