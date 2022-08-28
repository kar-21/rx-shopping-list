import React, { ChangeEvent, MouseEventHandler, useState } from 'react';
import {
  Card,
  CardHeader,
  Checkbox,
  Button,
  Divider,
  List,
  makeStyles,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomInIcon from '@material-ui/icons/ZoomIn';

import {
  GroceryList,
  Language,
  LanguageKeyValue,
  RootState,
} from '../redux/model.interface';
import { intersection, searchAndFilter } from '../services/grocery.helper';
import ListItemComponent from './ListItemsComponent';
import SearchFieldComponent from './SearchFieldComponent';

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
  expandedMyListContainer: {
    height: 'calc(100vh - 280px)',
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

interface MyListInterface {
  myListItems: GroceryList;
  checked: GroceryList;
  myListText: LanguageKeyValue;
  isMyListExpand: boolean;
  handleMyListZoom: (value: boolean) => void;
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

const MyListComponent = ({
  myListItems,
  checked,
  myListText,
  isMyListExpand,
  handleMyListZoom,
  handleToggle,
  handleInputValueAdd,
  handleToggleAll,
  handleSelectValueChange,
}: MyListInterface): JSX.Element => {
  const classes = useStyles();

  const [myListSearchValue, setMyListSearchValue] = useState('');

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
            <SearchFieldComponent
              searchValue={myListSearchValue}
              setSearchValue={setMyListSearchValue}
            />
            <Button
              variant="contained"
              color="secondary"
              size="small"
              className={classes.expandButton}
              onClick={() => {
                handleMyListZoom(false);
                setMyListSearchValue('');
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
          .map(([key, value]) => (
            <ListItemComponent
              key={key}
              listType="myList"
              keyValue={[key, value]}
              checked={checked}
              handleToggle={handleToggle}
              handleSelectValueChange={handleSelectValueChange}
              handleInputValueAdd={handleInputValueAdd}
            />
          ))}
      </List>
    </Card>
  );
};

export default MyListComponent;
