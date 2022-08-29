import { ActionType, getType } from 'typesafe-actions';

import { GroceryList, ReducerState, Language, EnglishKannadaLookupType } from './model.interface';
import GroceryListJson from '../assets/grocery-list.json';
import engKaLookupJson from '../assets/eng-ka-lookup.json';
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
  engKaLookup: { ...engKaLookupJson } as unknown as EnglishKannadaLookupType,
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

    case getType(actionCreators.updateMyListAndGroceryList):
      return {
        ...state,
        myList: { ...action.payload.myList },
        groceryList: { ...action.payload.groceryList },
      };

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
