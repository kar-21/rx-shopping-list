import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import TransferList from "../shared/TransferList";
import { Language, RootState } from "../redux/model.interface";

const useStyles = makeStyles((theme) => ({
  Heading: {
    margin: "0.4rem",
    fontSize: "1.4rem",
  },
}));

const newListText = {
  [Language.english]: "New List",
  [Language.kannada]: "ಹೊಸ ಪಟ್ಟಿ",
};

const NewList = () => {
  const classes = useStyles();

  const { language, myList, groceryList } = useSelector(
    (state: RootState) => state.reducer
  );

  return (
    <>
      <h1 className={classes.Heading}>{newListText[language]}</h1>
      <TransferList
        myList={myList}
        initialName={""}
        groceryList={groceryList}
      />
    </>
  );
};
export default NewList;
