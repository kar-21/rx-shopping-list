import React, { useState, useEffect, ChangeEvent } from "react";
import clsx from "clsx";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import GetAppIcon from "@material-ui/icons/GetApp";
import SaveFlieDialog from "./SaveFlieDialog";
import { useSelector } from "react-redux";
import store from "../redux/store";
import {
  addToMyListAction,
  removeFromMyListAction,
  updateValueInMyListAction,
  updateSizeValueInMyListAction,
  resetMyListAction,
} from "../redux/actionCreator";
import engKaLookupJson from "../assets/eng-ka-lookup.json";
import {
  EnglishKannadaLookupType,
  FilterType,
  Grocery,
  GroceryList,
  Language,
  Measurement,
  RootState,
} from "../redux/model.interface";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  list: {
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
    height: "calc(100vh - 220px)",
    [theme.breakpoints.down("sm")]: {
      height: "calc(100vh - 218px)",
    },
    [theme.breakpoints.down("xs")]: {
      height: "calc(50vh - 173px)",
    },
  },
  expandedShoppingListGrid: {
    width: "95%",
  },
  expandedMyListGrid: {
    width: "95%",
  },
  expandedShoppingListContainer: {
    height: "calc(100vh - 280px)",
    overflow: "auto",
  },
  expandedMyListContainer: {
    height: "calc(100vh - 280px)",
  },
  expandButton: {
    marginRight: "25px",
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
    width: "10ch",
  },
  selectField: {
    width: "10ch",
  },
  inputField: {
    display: "flex",
    justifyContent: "flex-end",
  },
  leftSideList: {
    minWidth: "55%",
  },
  rightSideList: {
    width: "35%",
  },
  buttonContainer: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hideGrid: {
    display: "none",
  },
  rowButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonGridContainer: {
    minWidth: "30%",
  },
  formControl: {},
  selectEmpty: {},
}));

function not(a: GroceryList, b: GroceryList) {
  const keys = Object.keys(a).filter(
    (value) => Object.keys(b).indexOf(value) === -1
  );
  let object = {};
  keys.forEach((value) => {
    object = { ...object, [value]: a[value] };
  });
  return object;
}

function intersection(a: GroceryList, b: GroceryList) {
  return Object.keys(a).filter({}.hasOwnProperty.bind(b));
}

function union(a: GroceryList, b: GroceryList) {
  return { ...a, ...not(b, a) };
}

const listText = {
  [Language.english]: "Available Grocery List",
  [Language.kannada]: "ಲಭ್ಯವಿರುವ ದಿನಸಿ ಪಟ್ಟಿ",
};

const myListText = {
  [Language.english]: "My List",
  [Language.kannada]: "ನನ್ನ ಪಟ್ಟಿ",
};

const engKaLookup: EnglishKannadaLookupType = engKaLookupJson;

interface TransferListType {
  initialName: string;
  groceryList: GroceryList;
  myList: GroceryList;
}

const TransferList = (props: TransferListType) => {
  const classes = useStyles();
  const [checked, setChecked] = useState<GroceryList>({});
  const [myListName, setMyListName] = useState(props.initialName);
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [isShoppingListExpand, setIsShoppingList] = useState(false);
  const [isMyListExpand, setIsMyList] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState(true);
  const [shoppingListFilterValue, setShoppingListFilterValue] =
    useState<FilterType>();
  const [shoppingListSearchValue, setShoppingListSearchValue] = useState("");
  const [myListSearchValue, setMyListSearchValue] = useState("");

  const leftCheckedKeys = intersection(checked, props.myList);
  const rightCheckedKeys = intersection(checked, props.groceryList);

  const { language } = useSelector((state: RootState) => state.reducer);

  useEffect(() => {
    const valueArray: Grocery[] = Object.values(props.myList);
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
  }, [props.myList]);

  const handleToggle = (value: string) => () => {
    const currentIndex = Object.keys(checked).indexOf(value);
    let newChecked: GroceryList = { ...checked };
    if (currentIndex === -1) {
      newChecked = props.myList.hasOwnProperty(value)
        ? { ...newChecked, [value]: { ...props.myList[value] } }
        : { ...newChecked, [value]: { ...props.groceryList[value] } };
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
    item: string
  ) => {
    store.dispatch(
      updateValueInMyListAction({
        item: item,
        value: event.target.value as string,
      })
    );
  };

  const handleSelectValueChange = (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>,
    item: string
  ) => {
    store.dispatch(
      updateSizeValueInMyListAction({
        item: item,
        value: event.target.value as string,
      })
    );
  };

  const handleShoppingListZoom = (isExpanded: boolean) => {
    setIsShoppingList(isExpanded);
    setShoppingListFilterValue(undefined);
    setIsMyList(false);
  };

  const handleMyListZoom = (isExpanded: boolean) => {
    setIsShoppingList(false);
    setMyListSearchValue("");
    setIsMyList(isExpanded);
  };

  const handleAddToCart = () => {
    setIsDialogOpened(true);
  };

  const resetMyList = () => {
    store.dispatch(resetMyListAction());
    setChecked({});
    setMyListName(props.initialName);
    setIsDialogOpened(false);
    setIsShoppingList(false);
    setIsMyList(false);
  };

  const searchAndFilter = (
    itemObject: Grocery,
    searchValue: string,
    filterValue: FilterType | undefined
  ) => {
    if (searchValue.length < 2) {
      return true;
    } else if (
      searchValue &&
      !filterValue &&
      (itemObject.name[Language.english].toLowerCase().includes(searchValue) ||
        itemObject.name[Language.kannada].toLowerCase().includes(searchValue) ||
        engKaLookup.category[itemObject.category].english
          .toLowerCase()
          .includes(searchValue) ||
        engKaLookup.category[itemObject.category].kannada
          .toLowerCase()
          .includes(searchValue) ||
        engKaLookup.subCategory[itemObject.subCategory].english
          .toLowerCase()
          .includes(searchValue) ||
        engKaLookup.subCategory[itemObject.subCategory].kannada
          .toLowerCase()
          .includes(searchValue) ||
        engKaLookup.measurement[itemObject.measurement].english
          .toLowerCase()
          .includes(searchValue) ||
        engKaLookup.measurement[itemObject.measurement].kannada
          .toLowerCase()
          .includes(searchValue))
    ) {
      return true;
    } else if (
      searchValue &&
      filterValue &&
      filterValue !== FilterType.name &&
      filterValue !== FilterType.quantity
    ) {
      const typeValue = itemObject[filterValue];
      const languageKeyValuePair = Object.entries(
        engKaLookup[filterValue]
      ).find(([key]) => key === typeValue);
      if (languageKeyValuePair) {
        return (
          languageKeyValuePair[1].english.toLowerCase().includes(searchValue) ||
          languageKeyValuePair[1].kannada.toLowerCase().includes(searchValue)
        );
      }
    } else if (
      searchValue &&
      filterValue &&
      filterValue === FilterType.name &&
      (itemObject.name[Language.english].toLowerCase().includes(searchValue) ||
        itemObject.name[Language.kannada].toLowerCase().includes(searchValue))
    ) {
      return true;
    }
    return false;
  };

  const customList = (title: string, items: GroceryList) => (
    <Card>
      <div className={classes.cardHeader}>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Checkbox
              onClick={handleToggleAll(items)}
              checked={
                numberOfChecked(items) === Object.keys(items).length &&
                Object.keys(items).length !== 0
              }
              indeterminate={
                numberOfChecked(items) !== Object.keys(items).length &&
                numberOfChecked(items) !== 0
              }
              disabled={Object.keys(items).length === 0}
              inputProps={{ "aria-label": "all items selected" }}
            />
          }
          title={title}
          subheader={`${numberOfChecked(items)}/${Object.keys(items).length} ${
            language === Language.english ? "selected" : "ಆರಿಸಲಾಗಿದೆ"
          }`}
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
                    }>
                  ) => setShoppingListFilterValue(e.target.value as FilterType)}
                  displayEmpty
                  className={classes.selectEmpty}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem key={"none"} value="">
                    None
                  </MenuItem>
                  <MenuItem key={"name"} value="name">
                    Name
                  </MenuItem>
                  <MenuItem key={"category"} value="category">
                    Catogory
                  </MenuItem>
                  <MenuItem key={"subCategory"} value="subCategory">
                    Sub-Catogory
                  </MenuItem>
                  <MenuItem key={"measurement"} value="measurement">
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
        {Object.entries(items)
          .filter(
            (value) =>
              !isShoppingListExpand ||
              searchAndFilter(
                value[1],
                shoppingListSearchValue.toLowerCase(),
                shoppingListFilterValue
              )
          )
          .map(([key, value]) => {
            const labelId = `transfer-list-all-item-${key}-label`;

            return (
              <ListItem
                key={key}
                role="listitem"
                button
                onClick={handleToggle(key)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.hasOwnProperty(key)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
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

  const myListGrid = (items: GroceryList) => (
    <Card>
      <div className={classes.cardHeader}>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Checkbox
              onClick={handleToggleAll(items)}
              checked={
                numberOfChecked(items) === Object.keys(items).length &&
                Object.keys(items).length !== 0
              }
              indeterminate={
                numberOfChecked(items) !== Object.keys(items).length &&
                numberOfChecked(items) !== 0
              }
              disabled={Object.keys(items).length === 0}
              inputProps={{ "aria-label": "all items selected" }}
            />
          }
          title={myListText[language]}
          subheader={`${numberOfChecked(items)}/${Object.keys(items).length} ${
            language === Language.english ? "selected" : "ಆರಿಸಲಾಗಿದೆ"
          }`}
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
        {Object.entries(items)
          .filter(
            ([key, value]) =>
              !isMyListExpand ||
              searchAndFilter(value, myListSearchValue.toLowerCase(), undefined)
          )
          .map(([key, value]) => {
            const labelId = `transfer-list-all-item-${key}-label`;

            return (
              <ListItem key={key} role="listitem">
                <ListItemIcon>
                  <Checkbox
                    checked={checked.hasOwnProperty(key)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
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
                        classes.selectField
                      )}
                    >
                      <Select
                        value={value.sizeValue}
                        onChange={(
                          e: ChangeEvent<{
                            name?: string | undefined;
                            value: unknown;
                          }>
                        ) => handleSelectValueChange(e, key)}
                        displayEmpty
                        className={classes.selectEmpty}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        {value.size?.map((text) => (
                          <MenuItem key={text} value={text}>
                            {engKaLookup[Measurement.quantity][text][language]}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <></>
                  )}
                  <FormControl
                    className={clsx(
                      classes.margin,
                      classes.withoutLabel,
                      classes.textField
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
                        }>
                      ) => handleInputValueAdd(e, key)}
                      endAdornment={
                        <InputAdornment position="end">
                          {engKaLookup.measurement[value.measurement][language]}
                        </InputAdornment>
                      }
                      aria-describedby="standard-weight-helper-text"
                      inputProps={{
                        "aria-label": "weight",
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

  return (
    <>
      <Grid
        container
        spacing={2}
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid
          item
          className={clsx(
            isShoppingListExpand
              ? classes.expandedShoppingListGrid
              : classes.rightSideList,
            isMyListExpand ? classes.hideGrid : ""
          )}
        >
          {customList(listText[language], props.groceryList)}
        </Grid>
        <Grid
          item
          className={
            isMyListExpand || isShoppingListExpand
              ? classes.buttonGridContainer
              : ""
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
                : ""
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
            isShoppingListExpand ? classes.hideGrid : ""
          )}
          item
        >
          {myListGrid(props.myList)}
        </Grid>
      </Grid>
      <SaveFlieDialog
        opened={isDialogOpened}
        setIsDialogOpened={(value) => setIsDialogOpened(value)}
        resetMyList={() => resetMyList()}
        fileName={myListName}
      />
    </>
  );
};

export default TransferList;
