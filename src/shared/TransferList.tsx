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
import { connect } from "react-redux";
import store from "../redux/store";
import {
  addToMyListAction,
  removeFromMyListAction,
  updateValueInMyListAction,
  updateSizeValueInMyListAction,
  resetMyListAction,
} from "../redux/action";
import * as engKaLookupJson from "../assets/eng-ka-lookup.json";
import { Grocery, GroceryList } from "../redux/model.interace";

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

function not(a, b) {
  const keys = Object.keys(a).filter(
    (value) => Object.keys(b).indexOf(value) === -1
  );
  let object = {};
  keys.forEach((value) => {
    object = { ...object, [value]: a[value] };
  });
  return object;
}

function intersection(a, b) {
  return Object.keys(a).filter({}.hasOwnProperty.bind(b));
}

function union(a, b) {
  return { ...a, ...not(b, a) };
}

const listText = {
  eng: "Available Grocery List",
  ka: "ಲಭ್ಯವಿರುವ ದಿನಸಿ ಪಟ್ಟಿ",
};

const myListText = {
  eng: "My List",
  ka: "ನನ್ನ ಪಟ್ಟಿ",
};

const engKaLookup = engKaLookupJson;

const mapLanguage = (state) => {
  return {
    lang: state.lang,
    groceryList: state.groceryList,
    myList: state.myList,
  };
};

const TransferList = (props) => {
  const classes = useStyles();
  const [checked, setChecked] = useState<GroceryList>({});
  const [myListName, setMyListName] = useState(props.initialName);
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [isShoppingListExpand, setIsShoppingList] = useState(false);
  const [isMyListExpand, setIsMyList] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState(true);
  const [shoppingListFilterValue, setShoppingListFilterValue] =
    useState<string>("");
  const [shoppingListSearchValue, setShoppingListSearchValue] = useState("");
  const [myListSearchValue, setMyListSearchValue] = useState("");

  const leftCheckedKeys = intersection(checked, props.myList);
  const rightCheckedKeys = intersection(checked, props.groceryList);

  useEffect(() => {
    const valueArray: Grocery[] = Object.values(props.myList);
    let returnValue = false;
    if (valueArray.length) {
      valueArray.forEach((value) => {
        if (value.measurement === "quantity" && !value.value) {
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

  const handleToggle = (value) => () => {
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

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
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

  const handleInputValueAdd = (event, item) => {
    store.dispatch(
      updateValueInMyListAction({ item: item, value: event.target.value })
    );
  };

  const handleSelectValueChange = (event, item) => {
    store.dispatch(
      updateSizeValueInMyListAction({ item: item, value: event.target.value })
    );
  };

  const handleShoppingListZoom = (isExpanded) => {
    setIsShoppingList(isExpanded);
    setShoppingListFilterValue("");
    setIsMyList(false);
  };

  const handleMyListZoom = (isExpanded) => {
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

  const searchAndFilter = (itemObject, searchValue, filterValue) => {
    if (searchValue.length < 2) {
      return true;
    } else if (
      searchValue &&
      !filterValue &&
      (itemObject.name.eng.toLowerCase().includes(searchValue) ||
        itemObject.name.ka.toLowerCase().includes(searchValue) ||
        engKaLookup.catogory[itemObject.catogory].eng
          .toLowerCase()
          .includes(searchValue) ||
        engKaLookup.catogory[itemObject.catogory].ka
          .toLowerCase()
          .includes(searchValue) ||
        engKaLookup.subCatogory[itemObject.subCatogory].eng
          .toLowerCase()
          .includes(searchValue) ||
        engKaLookup.subCatogory[itemObject.subCatogory].ka
          .toLowerCase()
          .includes(searchValue) ||
        engKaLookup.measurement[itemObject.measurement].eng
          .toLowerCase()
          .includes(searchValue) ||
        engKaLookup.measurement[itemObject.measurement].ka
          .toLowerCase()
          .includes(searchValue))
    ) {
      return true;
    } else if (
      searchValue &&
      filterValue &&
      filterValue !== "name" &&
      (engKaLookup[filterValue][itemObject[filterValue]].eng
        .toLowerCase()
        .includes(searchValue) ||
        engKaLookup[filterValue][itemObject[filterValue]].ka
          .toLowerCase()
          .includes(searchValue))
    ) {
      return true;
    } else if (
      searchValue &&
      filterValue &&
      filterValue === "name" &&
      (itemObject.name.eng.toLowerCase().includes(searchValue) ||
        itemObject.name.ka.toLowerCase().includes(searchValue))
    ) {
      return true;
    }
    return false;
  };

  const customList = (title, items: GroceryList) => (
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
            props.lang === "eng" ? "selected" : "ಆರಿಸಲಾಗಿದೆ"
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
                  ) => setShoppingListFilterValue(e.target.value as string)}
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
                  <MenuItem key={"catogory"} value="catogory">
                    Catogory
                  </MenuItem>
                  <MenuItem key={"subCatogory"} value="subCatogory">
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
                  primary={value.name[props.lang]}
                  secondary={`${
                    engKaLookup.catogory[value.catogory][props.lang]
                  } > ${
                    engKaLookup.subCatogory[value.subCatogory][props.lang]
                  }`}
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
          title={myListText[props.lang]}
          subheader={`${numberOfChecked(items)}/${Object.keys(items).length} ${
            props.lang === "eng" ? "selected" : "ಆರಿಸಲಾಗಿದೆ"
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
              searchAndFilter(value, myListSearchValue.toLowerCase(), "")
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
                <ListItemText
                  id={labelId}
                  primary={value.name[props.lang]}
                />
                <ListItemText className={classes.inputField}>
                  {value.measurement === "quantity" ? (
                    <FormControl
                      className={clsx(
                        classes.margin,
                        classes.withoutLabel,
                        classes.selectField
                      )}
                    >
                      <Select
                        value={value.sizeValue}
                        onChange={(e) => handleSelectValueChange(e, key)}
                        displayEmpty
                        className={classes.selectEmpty}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        {value.size?.map((text) => (
                          <MenuItem key={text} value={text}>
                            {engKaLookup.quantity[text][props.lang]}
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
                      error={!+value[1].value}
                      key={`${value[0]}-input`}
                      id="standard-adornment-weight"
                      value={value[1].value}
                      onChange={(e) => handleInputValueAdd(e, value[0])}
                      endAdornment={
                        <InputAdornment position="end">
                          {
                            engKaLookup.measurement[value[1].measurement][
                              props.lang
                            ]
                          }
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
          {customList(listText[props.lang], props.groceryList)}
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

export default connect(mapLanguage)(TransferList);
