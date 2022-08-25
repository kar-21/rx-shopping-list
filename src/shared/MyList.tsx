import React, { ChangeEvent, MouseEventHandler } from 'react';
import {
  Card,
  CardHeader,
  Checkbox,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  FormControl,
  Select,
  MenuItem,
  Input,
  InputAdornment,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomInIcon from '@material-ui/icons/ZoomIn';

import {
  EnglishKannadaLookupType,
  FilterType,
  Grocery,
  GroceryList,
  Language,
  LanguageKeyValue,
  Measurement,
  RootState,
} from '../redux/model.interface';
import { intersection } from '../services/grocery.helper';
import engKaLookupJson from '../assets/eng-ka-lookup.json';

const engKaLookup: EnglishKannadaLookupType = engKaLookupJson;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  list: {
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    height: 'calc(100vh - 220px)',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 218px)',
    },
    [theme.breakpoints.down('xs')]: {
      height: 'calc(50vh - 173px)',
    },
  },
  expandedShoppingListGrid: {
    width: '95%',
  },
  expandedMyListGrid: {
    width: '95%',
  },
  expandedShoppingListContainer: {
    height: 'calc(100vh - 280px)',
    overflow: 'auto',
  },
  expandedMyListContainer: {
    height: 'calc(100vh - 280px)',
  },
  expandButton: {
    marginRight: '25px',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(1),
  },
  textField: {
    width: '10ch',
  },
  selectField: {
    width: '10ch',
  },
  inputField: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  leftSideList: {
    minWidth: '55%',
  },
  rightSideList: {
    width: '35%',
  },
  buttonContainer: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hideGrid: {
    display: 'none',
  },
  rowButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonGridContainer: {
    minWidth: '30%',
  },
  formControl: {},
  selectEmpty: {},
}));

interface MyListInterface {
  myListItems: GroceryList;
  checked: GroceryList;
  myListText: LanguageKeyValue;
  isMyListExpand: boolean;
  myListSearchValue: string;
  setMyListSearchValue: (value: string) => void;
  handleMyListZoom: (value: boolean) => void;
  searchAndFilter: (
    itemObject: Grocery,
    searchValue: string,
    filterValue: FilterType | undefined,
  ) => void;
  handleToggle: (
    value: string,
  ) => MouseEventHandler<HTMLButtonElement> | undefined;
  handleInputValueAdd: (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>,
    item: string,
  ) => void;
  handleToggleAll: (
    value: GroceryList,
  ) => MouseEventHandler<HTMLButtonElement> | undefined;
  handleSelectValueChange: (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>,
    item: string,
  ) => void;
}

const MyList = ({
  myListItems,
  checked,
  myListText,
  isMyListExpand,
  myListSearchValue,
  setMyListSearchValue,
  handleMyListZoom,
  searchAndFilter,
  handleToggle,
  handleInputValueAdd,
  handleToggleAll,
  handleSelectValueChange,
}: MyListInterface) => {
  const classes = useStyles();

  const { language } = useSelector((state: RootState) => state.reducer);

  const numberOfChecked = (items: GroceryList) =>
    intersection(checked, items).length;

  return (
    <Card>
      <div className={classes.cardHeader}>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Checkbox
              onClick={handleToggleAll(myListItems)}
              checked={
                numberOfChecked(myListItems) ===
                  Object.keys(myListItems).length &&
                Object.keys(myListItems).length !== 0
              }
              indeterminate={
                numberOfChecked(myListItems) !==
                  Object.keys(myListItems).length &&
                numberOfChecked(myListItems) !== 0
              }
              disabled={Object.keys(myListItems).length === 0}
              inputProps={{ 'aria-label': 'all myListItems selected' }}
            />
          }
          title={myListText[language]}
          subheader={`${numberOfChecked(myListItems)}/${
            Object.keys(myListItems).length
          } ${language === Language.english ? 'selected' : 'ಆರಿಸಲಾಗಿದೆ'}`}
        />
        {isMyListExpand ? (
          <>
            <TextField
              key="Mylist-fliter-input"
              id="outlined-required"
              label="Filter"
              value={myListSearchValue}
              onChange={(e) => setMyListSearchValue(e.target.value)}
              variant="outlined"
              autoFocus
            />
            <Button
              variant="contained"
              color="secondary"
              size="small"
              className={classes.expandButton}
              onClick={() => handleMyListZoom(false)}
              aria-label="move selected left"
            >
              <ZoomOutIcon />
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            className={classes.expandButton}
            onClick={() => handleMyListZoom(true)}
            aria-label="move selected left"
          >
            <ZoomInIcon />
          </Button>
        )}
      </div>
      <Divider />
      <List
        className={
          isMyListExpand ? classes.expandedMyListContainer : classes.list
        }
        dense
        component="div"
        role="list"
      >
        {Object.entries(myListItems)
          .filter(
            ([, value]) =>
              !isMyListExpand ||
              searchAndFilter(
                value,
                myListSearchValue.toLowerCase(),
                undefined,
              ),
          )
          .map(([key, value]) => {
            const labelId = `transfer-list-all-item-${key}-label`;

            return (
              <ListItem key={key} role="listitem">
                <ListItemIcon>
                  <Checkbox
                    checked={!!checked[key]}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    onClick={handleToggle(key)}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value.name[language]} />
                <ListItemText className={classes.inputField}>
                  {value.measurement === Measurement.quantity ? (
                    <FormControl
                      className={clsx(
                        classes.margin,
                        classes.withoutLabel,
                        classes.selectField,
                      )}
                    >
                      <Select
                        value={value.sizeValue}
                        onChange={(
                          e: ChangeEvent<{
                            name?: string | undefined;
                            value: unknown;
                          }>,
                        ) => handleSelectValueChange(e, key)}
                        displayEmpty
                        className={classes.selectEmpty}
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        {value.size?.map((text) => (
                          <MenuItem key={text} value={text}>
                            {engKaLookup[Measurement.quantity][text][language]}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : null}
                  <FormControl
                    className={clsx(
                      classes.margin,
                      classes.withoutLabel,
                      classes.textField,
                    )}
                  >
                    <Input
                      error={!+value.value}
                      key={`${key}-input`}
                      id="standard-adornment-weight"
                      value={value.value}
                      onChange={(
                        e: ChangeEvent<{
                          name?: string | undefined;
                          value: unknown;
                        }>,
                      ) => handleInputValueAdd(e, key)}
                      endAdornment={
                        <InputAdornment position="end">
                          {engKaLookup.measurement[value.measurement][language]}
                        </InputAdornment>
                      }
                      aria-describedby="standard-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                    />
                  </FormControl>
                </ListItemText>
              </ListItem>
            );
          })}
      </List>
    </Card>
  );
};

export default MyList;
