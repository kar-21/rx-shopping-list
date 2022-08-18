import { ActionType } from 'typesafe-actions';

import { GroceryList, ReducerState, Language } from './model.interface';
import GroceryListJson from '../assets/grocery-list.json';
import {
  SET_IS_LOGGED_IN,
  SET_JWT,
  SET_USER_ID,
  SET_LANG,
  SET_IS_DARK_MODE,
  SET_MOBILE_OPEN,
  ADD_TO_MY_LIST,
  REMOVE_FROM_MY_LIST,
  RESET_ALL_LISTS,
  UPDATE_SIZE_VALUE_OF_MY_LIST,
  UPDATE_VALUE_OF_MY_LIST,
} from './actionType';
import * as actionCreators from './actionCreator';

const initialState: ReducerState = {
  isLoggedIn: false,
  language: Language.english,
  isDarkColorMode: false,
  mobileOpen: false,
  groceryList: { ...GroceryListJson } as unknown as GroceryList,
  myList: {},
  jwt: '',
  userId: '',
};

type Action = ActionType<typeof actionCreators>;

const Reducer = (state: ReducerState = initialState, action: Action) => {
  switch (action.type) {
    case SET_IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.payload };

    case SET_JWT:
      return { ...state, jwt: action.payload };

    case SET_USER_ID:
      return { ...state, userId: action.payload };

    case SET_LANG:
      return { ...state, language: action.payload };

    case SET_IS_DARK_MODE:
      return { ...state, isDarkColorMode: action.payload };

    case SET_MOBILE_OPEN:
      return { ...state, mobileOpen: action.payload };

    case ADD_TO_MY_LIST:
      action.payload.forEach((item) => {
        if (state.groceryList.hasOwnProperty(item)) {
          state = {
            ...state,
            myList: { ...state.myList, [item]: state.groceryList[item] },
          };
          delete state.groceryList[item];
        }
      });
      return state;

    case REMOVE_FROM_MY_LIST:
      action.payload.forEach((item) => {
        if (state.myList.hasOwnProperty(item)) {
          state = {
            ...state,
            groceryList: { ...state.groceryList, [item]: state.myList[item] },
          };
          delete state.myList[item];
        }
      });
      return state;

    case UPDATE_VALUE_OF_MY_LIST:
      return {
        ...state,
        myList: {
          ...state.myList,
          [action.payload.item]: {
            ...state.myList[action.payload.item],
            value: action.payload.value,
          },
        },
      };

    case UPDATE_SIZE_VALUE_OF_MY_LIST:
      return {
        ...state,
        myList: {
          ...state.myList,
          [action.payload.item]: {
            ...state.myList[action.payload.item],
            sizeValue: action.payload.value,
          },
        },
      };

    case RESET_ALL_LISTS:
      return {
        ...state,
        myList: {},
        groceryList: { ...GroceryListJson },
      };

    default:
      return state;
  }
};

export default Reducer;
