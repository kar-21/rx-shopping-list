import React from "react";
import TransferList from "../shared/TransferList";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  Heading: {
    margin: "0.4rem",
    fontSize: "1.4rem",
  },
}));

const newListText = {
  eng: "New List",
  ka: "ಹೊಸ ಪಟ್ಟಿ",
};

const mapLanguage = (state) => {
  return {
    lang: state.lang,
  };
};

const NewList = (props) => {
  const classes = useStyles();

  return (
    <>
      <h1 className={classes.Heading}>{newListText[props.lang]}</h1>
      <TransferList initialState={{}} initialName={""} />
    </>
  );
};
export default connect(mapLanguage)(NewList);
