import React, { MouseEventHandler, useState } from 'react';
import {
  Card,
  CardHeader,
  Checkbox,
  Button,
  Divider,
  List,
  ListItem,
  makeStyles,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomInIcon from '@material-ui/icons/ZoomIn';

import {
  FilterType,
  GroceryList,
  Language,
  RootState,
} from '../redux/model.interface';
import { intersection, searchAndFilter } from '../services/grocery.helper';
import ListItemComponent from './ListItemsComponent';
import SearchFieldComponent from './SearchFieldComponent';
import FilterFieldComponent from './FilterFieldComponent';

const useStyles = makeStyles((theme) => ({
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
  expandedShoppingListContainer: {
    height: 'calc(100vh - 280px)',
    overflow: 'auto',
  },
  expandButton: {
    marginRight: '25px',
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

interface GroceryListInterface {
  heading: string;
  groceryListItems: GroceryList;
  checked: GroceryList;
  isShoppingListExpand: boolean;
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
  handleShoppingListZoom,
  handleToggle,
  handleToggleAll,
}: GroceryListInterface) => {
  const classes = useStyles();

  const [shoppingListSearchValue, setShoppingListSearchValue] = useState('');
  const [shoppingListFilterValue, setShoppingListFilterValue] =
    useState<FilterType>();

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
              <SearchFieldComponent
                searchValue={shoppingListSearchValue}
                setSearchValue={setShoppingListSearchValue}
              />
              <FilterFieldComponent
                filterValue={shoppingListFilterValue}
                setFilterValue={setShoppingListFilterValue}
              />
            </div>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              className={classes.expandButton}
              onClick={() => {
                handleShoppingListZoom(false);
                setShoppingListFilterValue(undefined);
                setShoppingListSearchValue('');
              }}
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
          .map(([key, value]) => (
            <ListItemComponent
              key={key}
              listType="groceryList"
              keyValue={[key, value]}
              checked={checked}
              handleToggle={handleToggle}
            />
          ))}
        <ListItem />
      </List>
    </Card>
  );
};

export default GroceryListComponent;
