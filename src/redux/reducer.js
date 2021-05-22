import { EAction } from "./action";

const initialState = {
  lang: "eng",
  isDarkColorMode: false,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case EAction.SET_LANG:
      return { ...state, lang: action.payload };
    case EAction.SET_IS_DARK_MODE:
      return { ...state, isDarkColorMode: action.payload };
    default:
      return state;
  }
};

export default Reducer;
