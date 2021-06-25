import React from "react";
import { connect } from "react-redux";

const headerText = {
  eng: "Shopping List",
  ka: "ಖರೀದಿ ಪಟ್ಟಿ",
};

const mapLanguage = (state) => {
  return {
    lang: state.lang,
  };
};

const Header = (props) => {
  return (
    <>
      <div>{headerText[props.lang]}</div>
    </>
  );
};

export default connect(mapLanguage)(Header);
