import React from "react";
import TransferList from "../shared/TransferList";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { RootState } from "../redux/model.interface";

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

const NewList = () => {
  const classes = useStyles();

  const { lang } = useSelector((state: RootState) => state);

  return (
    <>
      <h1 className={classes.Heading}>{newListText[lang]}</h1>
      <TransferList initialState={{}} initialName={""} />
    </>
  );
};
export default NewList;
