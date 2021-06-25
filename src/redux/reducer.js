import { EAction } from "./action";
import * as GroceryList from "../assets/grocery-list.json";

const initialState = {
  lang: "eng",
  isDarkColorMode: false,
  groceryList: { ...GroceryList.default },
  myList: {},
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case EAction.SET_LANG:
      return { ...state, lang: action.payload };

    case EAction.SET_IS_DARK_MODE:
      return { ...state, isDarkColorMode: action.payload };

    case EAction.ADD_TO_MY_LIST:
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

    case EAction.REMOVE_FROM_MY_LIST:
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

    case EAction.UPPDATE_VALUE_OF_MY_LIST:
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

    case EAction.UPPDATE_SIZE_VALUE_OF_MY_LIST:
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

    case EAction.RESET_ALL_LISTS:
      return {
        ...state,
        myList: {},
        groceryList: { ...GroceryList.default },
      };

    default:
      return state;
  }
};

export default Reducer;
