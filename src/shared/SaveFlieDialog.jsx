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
import ListItem from "@material-ui/core/ListItem";
import Radio from "@material-ui/core/Radio";
import { connect } from "react-redux";
import * as engKaLookupJson from "../assets/eng-ka-lookup.json";

const engKaLookup = engKaLookupJson.default;

const mapLanguage = (state) => {
  return {
    lang: state.lang,
    myList: state.myList,
  };
};

const SaveFileDialog = (props) => {
  const reference = createRef();
  const [fileLanguage, setFileLanguage] = useState("eng");
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

  const handleLangChange = (event) => {
    setFileLanguage(event.target.value);
  };

  const handleDialogClose = (value, fileName) => {
    if (fileName !== null) {
      let fileContent = '';
      Object.values(props.myList).forEach((item) => {
        let row = `${item.name[fileLanguage]}`;
        for (let i = row.length; i < 30; i++) {
          row += ' ';
        }
        row += `${item.value} ${
          engKaLookup.measurement[item.measurement][fileLanguage]
        }`;
        if (item.measurement === "quantity") {
          row += ` ${engKaLookup.quantity[item.sizeValue][fileLanguage]}`;
        }
        fileContent += row + "\r\n";
      });
      const element = document.createElement("a");
      const blob = new Blob([fileContent], { type: "text/plain" });
      element.href = URL.createObjectURL(blob);
      element.download = `${fileName}_${[fileLanguage]}.txt`;
      element.click();
      props.resetMyList();
    }
    props.setIsDialogOpened(false);
  };

  return (
    <>
      <Dialog
        ref={reference}
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
          <div>
            <label>File Language</label>
            <ListItem>
              <span>
                <Radio
                  checked={fileLanguage === "eng"}
                  onChange={handleLangChange}
                  value="eng"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "English" }}
                />
                English
              </span>
              <span>
                <Radio
                  checked={fileLanguage === "ka"}
                  onChange={handleLangChange}
                  value="ka"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "ಕನ್ನಡ" }}
                />
                ಕನ್ನಡ
              </span>
            </ListItem>
          </div>
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
export default connect(mapLanguage)(SaveFileDialog);
