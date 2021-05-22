import React from "react";
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

const SaveFlieDialog = (props) => {
  const [fileName, setFileName] = React.useState(props.fileName);
  const [suffix, setSuffix] = React.useState("");

  React.useEffect(() => {
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

  const handleInputValueChnage = (event) => {
    setFileName(event.target.value);
  };
  return (
    <>
      <Dialog
        open={props.opened}
        onClose={() => props.handleDialogClose(false, null)}
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
            onChange={(e) => handleInputValueChnage(e)}
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
            onClick={() => props.handleDialogClose(false, null)}
          >
            cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            disabled={fileName === ""}
            onClick={() =>
              props.handleDialogClose(true, fileName + "_" + suffix)
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default SaveFlieDialog;
