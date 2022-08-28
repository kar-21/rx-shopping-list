import React, { useState, useEffect, ChangeEvent } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';

import SaveFileDialog from './SaveFileDialog';
import store from '../redux/store';
import {
  updateValueInMyListAction,
  updateSizeValueInMyListAction,
  resetMyListAction,
} from '../redux/actionCreator';
import {
  Grocery,
  GroceryList,
  Language,
  Measurement,
  RootState,
} from '../redux/model.interface';
import { addToMyListAction, removeFromMyListAction } from '../redux/action';
import { intersection, not, union } from '../services/grocery.helper';
import GroceryListComponent from './GroceryListComponent';
import MyListComponent from './MyListComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  expandedShoppingListGrid: {
    width: '95%',
  },
  expandedMyListGrid: {
    width: '95%',
  },
  button: {
    margin: theme.spacing(0.5, 0),
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
}));

const listText = {
  [Language.english]: 'Available Grocery List',
  [Language.kannada]: 'ಲಭ್ಯವಿರುವ ದಿನಸಿ ಪಟ್ಟಿ',
};

const myListText = {
  [Language.english]: 'My List',
  [Language.kannada]: 'ನನ್ನ ಪಟ್ಟಿ',
};

interface TransferListType {
  initialName: string;
  groceryList: GroceryList;
  myList: GroceryList;
}

const TransferList = ({
  initialName,
  myList,
  groceryList,
}: TransferListType): JSX.Element => {
  const classes = useStyles();
  const [checked, setChecked] = useState<GroceryList>({});
  const [myListName, setMyListName] = useState(initialName);
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [isShoppingListExpand, setIsShoppingList] = useState(false);
  const [isMyListExpand, setIsMyList] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState(true);

  const leftCheckedKeys = intersection(checked, myList);
  const rightCheckedKeys = intersection(checked, groceryList);

  const { language } = useSelector((state: RootState) => state.reducer);

  useEffect(() => {
    const valueArray: Grocery[] = Object.values(myList);
    let returnValue = false;
    if (valueArray.length) {
      valueArray.forEach((value) => {
        if (value.measurement === Measurement.quantity && !value.value) {
          returnValue = true;
        } else if (!+value.value) {
          returnValue = true;
        }
      });
    } else {
      returnValue = true;
    }
    setIsFormInvalid(returnValue);
  }, [myList]);

  const handleToggle = (value: string) => () => {
    const currentIndex = Object.keys(checked).indexOf(value);
    let newChecked: GroceryList = { ...checked };
    if (currentIndex === -1) {
      newChecked = myList[value]
        ? { ...newChecked, [value]: { ...myList[value] } }
        : { ...newChecked, [value]: { ...groceryList[value] } };
    } else {
      delete newChecked[value];
    }
    setChecked(newChecked);
  };

  const numberOfChecked = (items: GroceryList) =>
    intersection(checked, items).length;

  const handleToggleAll = (items: GroceryList) => () => {
    if (numberOfChecked(items) === Object.keys(items).length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    let leftChecked = {};
    leftCheckedKeys.forEach((value) => {
      leftChecked = { ...leftChecked, [value]: checked[value] };
    });
    store.dispatch(removeFromMyListAction(Object.keys(leftChecked)));
    setChecked(not(checked, leftChecked));
    handleMyListZoom(false);
  };

  const handleCheckedLeft = () => {
    let rightChecked = {};
    rightCheckedKeys.forEach((value) => {
      rightChecked = { ...rightChecked, [value]: checked[value] };
    });
    store.dispatch(addToMyListAction(Object.keys(rightChecked)));
    setChecked(not(checked, rightChecked));
    handleShoppingListZoom(false);
  };

  const handleInputValueAdd = (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>,
    item: string,
  ) => {
    store.dispatch(
      updateValueInMyListAction({
        item,
        value: event.target.value as string,
      }),
    );
  };

  const handleSelectValueChange = (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>,
    item: string,
  ) => {
    store.dispatch(
      updateSizeValueInMyListAction({
        item,
        value: event.target.value as string,
      }),
    );
  };

  const handleShoppingListZoom = (isExpanded: boolean) => {
    setIsShoppingList(isExpanded);
    setIsMyList(false);
  };

  const handleMyListZoom = (isExpanded: boolean) => {
    setIsShoppingList(false);
    setIsMyList(isExpanded);
  };

  const handleAddToCart = () => {
    setIsDialogOpened(true);
  };

  const resetMyList = () => {
    store.dispatch(resetMyListAction());
    setChecked({});
    setMyListName(initialName);
    setIsDialogOpened(false);
    setIsShoppingList(false);
    setIsMyList(false);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid
          item
          className={clsx(
            isShoppingListExpand
              ? classes.expandedShoppingListGrid
              : classes.rightSideList,
            isMyListExpand ? classes.hideGrid : '',
          )}
        >
          <GroceryListComponent
            heading={listText[language]}
            groceryListItems={groceryList}
            checked={checked}
            isShoppingListExpand={isShoppingListExpand}
            handleShoppingListZoom={handleShoppingListZoom}
            handleToggle={handleToggle}
            handleToggleAll={handleToggleAll}
          />
        </Grid>
        <Grid
          item
          className={
            isMyListExpand || isShoppingListExpand
              ? classes.buttonGridContainer
              : ''
          }
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            className={clsx(
              classes.buttonContainer,
              isMyListExpand || isShoppingListExpand
                ? classes.rowButtonContainer
                : '',
            )}
          >
            <Button
              variant="contained"
              color="secondary"
              size="small"
              className={classes.button}
              onClick={handleCheckedLeft}
              disabled={rightCheckedKeys.length === 0}
              aria-label="move selected left"
            >
              <AddIcon />
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              className={classes.button}
              onClick={handleCheckedRight}
              disabled={leftCheckedKeys.length === 0}
              aria-label="move selected right"
            >
              <DeleteIcon />
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              className={classes.button}
              onClick={handleAddToCart}
              disabled={isFormInvalid}
              aria-label="move selected to cart"
            >
              <GetAppIcon />
            </Button>
          </Grid>
        </Grid>
        <Grid
          className={clsx(
            isMyListExpand ? classes.expandedMyListGrid : classes.leftSideList,
            isShoppingListExpand ? classes.hideGrid : '',
          )}
          item
        >
          <MyListComponent
            myListItems={myList}
            checked={checked}
            myListText={myListText}
            isMyListExpand={isMyListExpand}
            handleMyListZoom={handleMyListZoom}
            handleToggle={handleToggle}
            handleInputValueAdd={handleInputValueAdd}
            handleToggleAll={handleToggleAll}
            handleSelectValueChange={handleSelectValueChange}
          />
        </Grid>
      </Grid>
      <SaveFileDialog
        opened={isDialogOpened}
        setIsDialogOpened={(value) => setIsDialogOpened(value)}
        resetMyList={() => resetMyList()}
        fileNameProp={myListName}
      />
    </>
  );
};

export default TransferList;
