import { Dispatch } from 'redux';

import {
  updateMyListAndGroceryList,
} from './actionCreator';
import store from './store';

export const addToMyListAction =
  (addToMyListKeys: string[]) => (dispatch: Dispatch) => {
    const { myList, groceryList } = store.getState().reducer;
    let modifiedMyList = myList;
    const modifiedGroceryList = groceryList;

    addToMyListKeys.forEach((item) => {
      if (modifiedGroceryList[item]) {
        modifiedMyList = {
          ...modifiedMyList,
          [item]: modifiedGroceryList[item],
        };
        delete modifiedGroceryList[item];
      }
    });

    dispatch(
      updateMyListAndGroceryList({
        myList: modifiedMyList,
        groceryList: modifiedGroceryList,
      }),
    );
  };

export const removeFromMyListAction =
  (removeFromMyListKeys: string[]) => (dispatch: Dispatch) => {
    const { myList, groceryList } = store.getState().reducer;
    const modifiedMyList = myList;
    let modifiedGroceryList = groceryList;

    removeFromMyListKeys.forEach((item) => {
      if (modifiedMyList[item]) {
        modifiedGroceryList = {
          ...modifiedGroceryList,
          [item]: modifiedMyList[item],
        };
        delete modifiedMyList[item];
      }
    });

    dispatch(
        updateMyListAndGroceryList({
          myList: modifiedMyList,
          groceryList: modifiedGroceryList,
        }),
      );
  };
