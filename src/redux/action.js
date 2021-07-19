export const EAction = {
  SET_IS_LOGGED_IN: "set [logged in] status",
  SET_JWT: "save copuy of [JWT token] in store",
  SET_USER_ID: "set [userId] recovered from jwt token",
  SET_LANG: "set selected [language]",
  SET_IS_DARK_MODE: "set boolean [is Dark Color Mode]",
  SET_MOBILE_OPEN: "set boolean [Mobile Open]",
  ADD_TO_MY_LIST: "add [list of items] to my list",
  REMOVE_FROM_MY_LIST: "remove [list of items] from my list",
  UPPDATE_VALUE_OF_MY_LIST: "update [value] of an item in my list",
  UPPDATE_SIZE_VALUE_OF_MY_LIST: "update [sizeValue] of an item in my list",
  RESET_ALL_LISTS: "reset [my list] and [grocery list]",
};

export const setIsLoggedInAction = (payload) => ({
  type: EAction.SET_IS_LOGGED_IN,
  payload: payload,
});

export const setJwtTokenAction = (payload) => ({
  type: EAction.SET_JWT,
  payload: payload,
});

export const setUserIDAction = (payload) => ({
  type: EAction.SET_USER_ID,
  payload: payload,
});

export const setLanguageAction = (payload) => ({
  type: EAction.SET_LANG,
  payload: payload,
});

export const setIsDarkColorModeAction = (payload) => ({
  type: EAction.SET_IS_DARK_MODE,
  payload: payload,
});

export const setMobileOpenAction = (payload) => ({
  type: EAction.SET_MOBILE_OPEN,
  payload: payload,
})

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
