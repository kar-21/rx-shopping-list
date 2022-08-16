import { createAction } from "typesafe-actions";
import {
  SET_JWT,
  SET_USER_ID,
  SET_LANG,
  SET_IS_DARK_MODE,
  SET_MOBILE_OPEN,
  ADD_TO_MY_LIST,
  REMOVE_FROM_MY_LIST,
  RESET_ALL_LISTS,
  SET_IS_LOGGED_IN,
  UPDATE_SIZE_VALUE_OF_MY_LIST,
  UPDATE_VALUE_OF_MY_LIST,
} from "./actionCreator";
import { UpdateGroceryListPayload } from "./model.interface";

export const setIsLoggedInAction = createAction(SET_IS_LOGGED_IN)<boolean>();

export const setJwtTokenAction = createAction(SET_JWT)<string>();

export const setUserIDAction = createAction(SET_USER_ID)<string>();

export const setLanguageAction = createAction(SET_LANG)<string>();

export const setIsDarkColorModeAction =
  createAction(SET_IS_DARK_MODE)<boolean>();

export const setMobileOpenAction = createAction(SET_MOBILE_OPEN)<boolean>();

export const addToMyListAction = createAction(ADD_TO_MY_LIST)<string[]>();

export const removeFromMyListAction =
  createAction(REMOVE_FROM_MY_LIST)<string[]>();

export const updateValueInMyListAction = createAction(
  UPDATE_VALUE_OF_MY_LIST
)<UpdateGroceryListPayload>();

export const updateSizeValueInMyListAction = createAction(
  UPDATE_SIZE_VALUE_OF_MY_LIST
)<UpdateGroceryListPayload>();

export const resetMyListAction = createAction(RESET_ALL_LISTS)();
