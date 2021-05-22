import React, { useState } from "react";
import TransferList from "../shared/TransferList";
import { makeStyles } from "@material-ui/core/styles";
import store from "../redux/store";

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

const NewList = (props) => {
  const classes = useStyles();
  const [heading, setHeading] = useState(newListText.eng);

  store.subscribe(() => {
    setHeading(newListText[store.getState().lang]);
  });
  return (
    <>
      <h1 className={classes.Heading}>{heading}</h1>
      <TransferList initialState={{}} initialName={""} lang={props.lang} />
    </>
  );
};
export default NewList;
