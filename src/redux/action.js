export const EAction = {
  SET_LANG: "set selected [language]",
  SET_IS_DARK_MODE: "set boolean [is Dark Color Mode]",
};

export const setLanguageAction = (payload) => ({
  type: EAction.SET_LANG,
  payload: payload,
});

export const setIsDarkColorModeAction = (payload) => ({
  type: EAction.SET_IS_DARK_MODE,
  payload: payload
});
