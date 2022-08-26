import React, { ChangeEvent, MouseEventHandler } from 'react';
import {
  Card,
  CardHeader,
  Checkbox,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomInIcon from '@material-ui/icons/ZoomIn';

import {
  EnglishKannadaLookupType,
  FilterType,
  GroceryList,
  Language,
  RootState,
} from '../redux/model.interface';
import { intersection, searchAndFilter } from '../services/grocery.helper';
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

interface GroceryListInterface {
  heading: string;
  groceryListItems: GroceryList;
  checked: GroceryList;
  isShoppingListExpand: boolean;
  shoppingListSearchValue: string;
  shoppingListFilterValue: FilterType | undefined;
  setShoppingListSearchValue: (value: string) => void;
  setShoppingListFilterValue: (value: FilterType) => void;
  handleShoppingListZoom: (value: boolean) => void;
  handleToggle: (
    value: string,
  ) => MouseEventHandler<HTMLButtonElement> | undefined;
  handleToggleAll: (
    value: GroceryList,
  ) => MouseEventHandler<HTMLButtonElement> | undefined;
}

const GroceryListComponent = ({
  heading,
  groceryListItems,
  checked,
  isShoppingListExpand,
  shoppingListSearchValue,
  shoppingListFilterValue,
  setShoppingListSearchValue,
  setShoppingListFilterValue,
  handleShoppingListZoom,
  handleToggle,
  handleToggleAll,
}: GroceryListInterface) => {
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
              onClick={handleToggleAll(groceryListItems)}
              checked={
                numberOfChecked(groceryListItems) ===
                  Object.keys(groceryListItems).length &&
                Object.keys(groceryListItems).length !== 0
              }
              indeterminate={
                numberOfChecked(groceryListItems) !==
                  Object.keys(groceryListItems).length &&
                numberOfChecked(groceryListItems) !== 0
              }
              disabled={Object.keys(groceryListItems).length === 0}
              inputProps={{ 'aria-label': 'all items selected' }}
            />
          }
          title={heading}
          subheader={`${numberOfChecked(groceryListItems)}/${
            Object.keys(groceryListItems).length
          } ${language === Language.english ? 'selected' : 'ಆರಿಸಲಾಗಿದೆ'}`}
        />
        {isShoppingListExpand ? (
          <>
            <div>
              <TextField
                key="shopping-fliter-input"
                id="outlined-required"
                label="Filter"
                value={shoppingListSearchValue}
                onChange={(e) => setShoppingListSearchValue(e.target.value)}
                variant="outlined"
                autoFocus
              />
              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  value={shoppingListFilterValue}
                  onChange={(
                    e: ChangeEvent<{
                      name?: string | undefined;
                      value: unknown;
                    }>,
                  ) => setShoppingListFilterValue(e.target.value as FilterType)}
                  displayEmpty
                  className={classes.selectEmpty}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem key="none" value="">
                    None
                  </MenuItem>
                  <MenuItem key="name" value="name">
                    Name
                  </MenuItem>
                  <MenuItem key="category" value="category">
                    Category
                  </MenuItem>
                  <MenuItem key="subCategory" value="subCategory">
                    Sub-Category
                  </MenuItem>
                  <MenuItem key="measurement" value="measurement">
                    Measurement
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              className={classes.expandButton}
              onClick={() => handleShoppingListZoom(false)}
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
            onClick={() => handleShoppingListZoom(true)}
            aria-label="move selected left"
          >
            <ZoomInIcon />
          </Button>
        )}
      </div>
      <Divider />
      <List
        className={
          isShoppingListExpand
            ? classes.expandedShoppingListContainer
            : classes.list
        }
        dense
        component="div"
        role="list"
      >
        {Object.entries(groceryListItems)
          .filter(
            (value) =>
              !isShoppingListExpand ||
              searchAndFilter(
                value[1],
                shoppingListSearchValue.toLowerCase(),
                shoppingListFilterValue,
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
                <ListItemText
                  id={labelId}
                  primary={value.name[language]}
                  secondary={`${
                    engKaLookup.category[value.category][language]
                  } > ${engKaLookup.subCategory[value.subCategory][language]}`}
                />
              </ListItem>
            );
          })}
        <ListItem />
      </List>
    </Card>
  );
};

export default GroceryListComponent;
