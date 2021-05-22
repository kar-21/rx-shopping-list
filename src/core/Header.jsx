import React, { useState } from "react";
import store from "../redux/store";

const headerText = {
  eng: "Shopping List",
  ka: "ಖರೀದಿ ಪಟ್ಟಿ",
};

const Header = () => {
  const [header, setHeader] = useState(headerText.eng);

  store.subscribe(() => {
    setHeader(headerText[store.getState().lang]);
  });

  return (
    <>
      <div>{header}</div>
    </>
  );
};

export default Header;
