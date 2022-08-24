import { ActionType, getType } from 'typesafe-actions';

import { GroceryList, ReducerState, Language } from './model.interface';
import GroceryListJson from '../assets/grocery-list.json';
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

const Reducer = (
  // eslint-disable-next-line default-param-last
  state: ReducerState = initialState,
  action: Action,
): ReducerState => {
  switch (action.type) {
    case getType(actionCreators.setIsLoggedInAction):
      return { ...state, isLoggedIn: action.payload };

    case getType(actionCreators.setJwtTokenAction):
      return { ...state, jwt: action.payload };

    case getType(actionCreators.setUserIDAction):
      return { ...state, userId: action.payload };

    case getType(actionCreators.setLanguageAction):
      return { ...state, language: action.payload };

    case getType(actionCreators.setIsDarkColorModeAction):
      return { ...state, isDarkColorMode: action.payload };

    case getType(actionCreators.setMobileOpenAction):
      return { ...state, mobileOpen: action.payload };

    case getType(actionCreators.addToMyListAction):
      // eslint-disable-next-line no-case-declarations
      let modifiedState = state;
      action.payload.forEach((item) => {
        if (state.groceryList[item]) {
          modifiedState = {
            ...state,
            myList: { ...state.myList, [item]: state.groceryList[item] },
          };
          delete modifiedState.groceryList[item];
        }
      });
      return modifiedState;

    case getType(actionCreators.removeFromMyListAction):
      // eslint-disable-next-line no-case-declarations
      let removedState = state;
      action.payload.forEach((item) => {
        if (state.myList[item]) {
          removedState = {
            ...state,
            groceryList: { ...state.groceryList, [item]: state.myList[item] },
          };
          delete removedState.myList[item];
        }
      });
      return removedState;

    case getType(actionCreators.updateValueInMyListAction):
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

    case getType(actionCreators.updateSizeValueInMyListAction):
      return {
        ...state,
        myList: {
          ...state.myList,
          [action.payload.item]: {
            ...state.myList[action.payload.item],
            sizeValue: action.payload.value,
          },
        } as GroceryList,
      };

    case getType(actionCreators.resetMyListAction):
      return {
        ...state,
        myList: {},
        groceryList: { ...GroceryListJson } as GroceryList,
      };

    default:
      return state;
  }
};

export default Reducer;
