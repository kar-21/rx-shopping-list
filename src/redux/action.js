export const EAction = {
  SET_LANG: "set selected [language]",
  SET_IS_DARK_MODE: "set boolean [is Dark Color Mode]",
  ADD_TO_MY_LIST: "add [list of items] to my list",
  REMOVE_FROM_MY_LIST: "remove [list of items] from my list",
  UPPDATE_VALUE_OF_MY_LIST: "update [value] of an item in my list",
  UPPDATE_SIZE_VALUE_OF_MY_LIST: "update [sizeValue] of an item in my list",
  RESET_ALL_LISTS: "reset [my list] and [grocery list]",
};

export const setLanguageAction = (payload) => ({
  type: EAction.SET_LANG,
  payload: payload,
});

export const setIsDarkColorModeAction = (payload) => ({
  type: EAction.SET_IS_DARK_MODE,
  payload: payload,
});

export const addToMyListAction = (payload) => ({
  type: EAction.ADD_TO_MY_LIST,
  payload: payload,
});

export const removeFromMyListAction = (payload) => ({
  type: EAction.REMOVE_FROM_MY_LIST,
  payload: payload,
});

export const updateValueInMyListAction = (payload) => ({
  type: EAction.UPPDATE_VALUE_OF_MY_LIST,
  payload: payload,
});

export const updateSizeValueInMyListAction = (payload) => ({
  type: EAction.UPPDATE_SIZE_VALUE_OF_MY_LIST,
  payload: payload,
});

export const resetMyListAction = () => ({
  type: EAction.RESET_ALL_LISTS,
});
