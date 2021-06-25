import React, { useState, useEffect, createRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { connect } from "react-redux";
import * as engKaLookupJson from "../assets/eng-ka-lookup.json";

const engKaLookup = engKaLookupJson.default;

const mapLanguage = (state) => {
  return {
    lang: state.lang,
    myList: state.myList,
  };
};

const SaveFlieDialog = (props) => {
  const refrence = createRef();
  const [fileName, setFileName] = useState(props.fileName);
  const [suffix, setSuffix] = useState("");

  useEffect(() => {
    const date = new Date(Date.now());
    let suffix = "";
    suffix += date.getDate() + "-";
    suffix +=
      date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    suffix += "-" + date.getFullYear() + "_";
    suffix += date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    suffix +=
      date.getMinutes() < 10
        ? ":0" + date.getMinutes()
        : ":" + date.getMinutes();
    suffix +=
      date.getSeconds() < 10
        ? ":0" + date.getSeconds()
        : ":" + date.getSeconds();
    setSuffix(suffix);
  }, [props.opened]);

  const handleInputValueChange = (event) => {
    setFileName(event.target.value);
  };

  const handleDialogClose = (value, fileName) => {
    console.log(value, fileName);
    if (fileName !== null) {
      let fileContent = "";
      Object.values(props.myList).forEach((item) => {
        fileContent += item.name.eng;
        for (let i = item.name.length; i < 25; i++) {
          fileContent += " ";
        }
        fileContent += "-";
        for (let i = item.value.length; i < 5; i++) {
          fileContent += " ";
        }
        fileContent +=
          item.value + " " + engKaLookup.measurement[item.measurement].eng;
        fileContent +=
          item.measurement === "quantity"
            ? " " + engKaLookup.quantity[item.sizeValue].eng + "\n"
            : "\n";
      });
      const elemenet = document.createElement("a");
      const blob = new Blob([fileContent], { type: "text/plain" });
      elemenet.href = URL.createObjectURL(blob);
      elemenet.download = fileName + "_eng.txt";
      elemenet.click();
      props.resetMyList();
    }
    props.setIsDialogOpened(false);
  };

  return (
    <>
      <Dialog
        ref={refrence}
        open={props.opened}
        onClose={() => handleDialogClose(false, null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Save As...</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your grocery list will be save in .txt formate.
            <br />
            Please enter the file name.
          </DialogContentText>
          <Input
            error={fileName === ""}
            key={fileName}
            id="standard-adornment-weight"
            value={fileName}
            onChange={(e) => handleInputValueChange(e)}
            endAdornment={
              <InputAdornment position="end">{suffix}</InputAdornment>
            }
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleDialogClose(false, null)}
          >
            cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            disabled={fileName === ""}
            onClick={() => handleDialogClose(true, fileName + "_" + suffix)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default connect(mapLanguage)(SaveFlieDialog);
