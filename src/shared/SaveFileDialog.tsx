import React, { useState, useEffect, createRef, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  ListItem,
  Input,
  InputAdornment,
  Radio,
} from '@material-ui/core';

import engKaLookupJson from '../assets/eng-ka-lookup.json';
import { Language, RootState } from '../redux/model.interface';

const engKaLookup = engKaLookupJson;

interface SaveFileDialogType {
  fileNameProp: string;
  opened: boolean;
  resetMyList: () => void;
  // eslint-disable-next-line no-unused-vars
  setIsDialogOpened: (value: boolean) => void;
}

const SaveFileDialog = ({
  fileNameProp,
  opened,
  resetMyList,
  setIsDialogOpened,
}: SaveFileDialogType): JSX.Element => {
  const reference = createRef();
  const [fileLanguage, setFileLanguage] = useState(Language.english);
  const [fileName, setFileName] = useState(fileNameProp);
  const [suffix, setSuffix] = useState('');

  const { myList } = useSelector((state: RootState) => state.reducer);

  useEffect(() => {
    const date = new Date(Date.now());
    let thisSuffix = '';
    thisSuffix += `${date.getDate()}-`;
    thisSuffix +=
      date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    thisSuffix += `-${date.getFullYear()}_`;
    thisSuffix +=
      date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    thisSuffix +=
      date.getMinutes() < 10
        ? `:0${date.getMinutes()}`
        : `:${date.getMinutes()}`;
    thisSuffix +=
      date.getSeconds() < 10
        ? `:0${date.getSeconds()}`
        : `:${date.getSeconds()}`;
    setSuffix(thisSuffix);
  }, [opened]);

  const handleInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
  };

  const handleLangChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFileLanguage(event.target.value as Language);
  };

  const handleDialogClose = (value: boolean, localFileName: string) => {
    if (localFileName !== null) {
      let fileContent = '';
      Object.values(myList).forEach((item) => {
        let row = `${item.name[fileLanguage]}`;
        for (let i = row.length; i < 30; i += 1) {
          row += ' ';
        }
        row += `${item.value} ${
          engKaLookup.measurement[item.measurement][fileLanguage]
        }`;
        if (item.measurement === 'quantity' && item.sizeValue) {
          row += ` ${engKaLookup.quantity[item.sizeValue][fileLanguage]}`;
        }
        fileContent += `${row}\r\n`;
      });
      const element = document.createElement('a');
      const blob = new Blob([fileContent], { type: 'text/plain' });
      element.href = URL.createObjectURL(blob);
      element.download = `${fileName}_${[fileLanguage]}.txt`;
      element.click();
      resetMyList();
    }
    setIsDialogOpened(false);
  };

  return (
    <Dialog
      ref={reference}
      open={opened}
      onClose={() => handleDialogClose(false, '')}
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
          error={fileName === ''}
          key={fileName}
          id="standard-adornment-weight"
          value={fileName}
          onChange={handleInputValueChange}
          endAdornment={
            <InputAdornment position="end">{suffix}</InputAdornment>
          }
          autoFocus
        />
        <div>
          <span>File Language</span>
          <ListItem>
            <span>
              <Radio
                checked={fileLanguage === Language.english}
                onChange={handleLangChange}
                value="eng"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'English' }}
              />
              English
            </span>
            <span>
              <Radio
                checked={fileLanguage === Language.kannada}
                onChange={handleLangChange}
                value="ka"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'ಕನ್ನಡ' }}
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
          onClick={() => handleDialogClose(false, '')}
        >
          cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          disabled={fileName === ''}
          onClick={() => handleDialogClose(true, `${fileName}_${suffix}`)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default SaveFileDialog;
