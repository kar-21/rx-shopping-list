import React from "react";
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
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import SaveFlieDialog from "./SaveFlieDialog";
import * as GroceryList from "../assets/grocery-list.json";
import store from "../redux/store";

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
  eng: "Available List",
  ka: "ಲಭ್ಯವಿರುವ ಪಟ್ಟಿ",
};

const myListText = {
  eng: "My List",
  ka: "ನನ್ನ ಪಟ್ಟಿ",
};

export default function TransferList(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [myList, setMyList] = React.useState({ ...props.initialState });
  const [myListName, setMyListName] = React.useState(props.initialName);
  const [lang, setLang] = React.useState("eng");
  const [isDialogOpened, setIsDialogOpened] = React.useState(false);
  const [right, setRight] = React.useState({ ...GroceryList.default });
  const [isShoppingListExpand, setIsShoppingList] = React.useState(false);
  const [isMyListExpand, setIsMyList] = React.useState(false);
  const [isFormInvalid, setIsFormInvalid] = React.useState(true);
  const [shoppingListFilterValue, setShoppingListFilterValue] = React.useState(
    "None"
  );
  const [myListFilterValue, setMyListFilterValue] = React.useState("None");
  const [shoppingListSearchValue, setShoppingListSearchValue] = React.useState(
    ""
  );
  const [myListSearchValue, setMyListSearchValue] = React.useState("");

  store.subscribe(() => {
    setLang(store.getState().lang);
  });

  const leftCheckedKeys = intersection(checked, myList);
  const rightCheckedKeys = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = Object.keys(checked).indexOf(value);
    let newChecked = { ...checked };
    if (currentIndex === -1) {
      newChecked = myList.hasOwnProperty(value)
        ? { ...newChecked, [value]: { ...myList[value] } }
        : { ...newChecked, [value]: { ...right[value] } };
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
    setRight({ ...right, ...leftChecked });
    setMyList(not(myList, leftChecked));
    setChecked(not(checked, leftChecked));
    setIsFormInvalid(checkFormValidity(not(myList, leftChecked)));
  };

  const handleCheckedLeft = () => {
    let rightChecked = {};
    rightCheckedKeys.forEach((value) => {
      rightChecked = { ...rightChecked, [value]: checked[value] };
    });
    setMyList({ ...myList, ...rightChecked });
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    setIsFormInvalid(checkFormValidity({ ...myList, ...rightChecked }));
  };

  const handleInputValueAdd = (event, value) => {
    setMyList({
      ...myList,
      [value]: { ...myList[value], value: event.target.value },
    });
    setIsFormInvalid(
      checkFormValidity({
        ...myList,
        [value]: { ...myList[value], value: event.target.value },
      })
    );
  };

  const handleSelectValueChange = (event, value) => {
    setMyList({
      ...myList,
      [value]: { ...myList[value], sizeValue: event.target.value },
    });
    setIsFormInvalid(
      checkFormValidity({
        ...myList,
        [value]: { ...myList[value], sizeValue: event.target.value },
      })
    );
  };

  const handleShoppingListZoom = (isExpanded) => {
    setIsShoppingList(isExpanded);
    setShoppingListFilterValue("");
    setIsMyList(false);
  };

  const handleMyListZoom = (isExpanded) => {
    setIsShoppingList(false);
    setMyListFilterValue("");
    setIsMyList(isExpanded);
  };

  const handleAddToCart = () => {
    console.log(myList);
    setIsDialogOpened(true);
  };

  const resetMyList = () => {
    setChecked([]);
    setMyList({ ...props.initialState });
    setMyListName(props.initialName);
    setIsDialogOpened(false);
    setRight({ ...GroceryList.default });
    setIsShoppingList(false);
    setIsMyList(false);
    setIsFormInvalid(true);
  };

  const handleDialogClose = (value, fileName) => {
    console.log(value, fileName);
    if (fileName !== null) {
      setMyListName(fileName);
      let fileContent = "";
      Object.values(myList).forEach((item) => {
        fileContent += item.name;
        for (let i = item.name.length; i < 25; i++) {
          fileContent += " ";
        }
        fileContent += "-";
        for (let i = item.value.length; i < 5; i++) {
          fileContent += " ";
        }
        fileContent += item.value + " " + item.measurement;
        fileContent +=
          item.measurement === "Qty" ? " " + item.sizeValue + "\n" : "\n";
      });
      const elemenet = document.createElement("a");
      const blob = new Blob([fileContent], { type: "text/plain" });
      elemenet.href = URL.createObjectURL(blob);
      elemenet.download = fileName + ".txt";
      elemenet.click();
      resetMyList();
    }
    setIsDialogOpened(false);
  };

  const checkFormValidity = (list) => {
    const valueArray = Object.values(list);
    let returnValue = false;
    if (valueArray.length) {
      valueArray.forEach((value) => {
        if (value.measurement === "Qty" && !value.value) {
          returnValue = true;
        } else if (!+value.value) {
          returnValue = true;
        }
      });
    } else {
      returnValue = true;
    }
    return returnValue;
  };

  const customList = (title, items) => (
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
            lang === "eng" ? "selected" : "ಆರಿಸಲಾಗಿದೆ"
          }`}
        />
        {isShoppingListExpand ? (
          <>
            <div>
              <label>Filter</label>
              <TextField
                key="shopping-fliter-input"
                id="outlined-required"
                value={shoppingListSearchValue}
                onChange={(e) => setShoppingListSearchValue(e.target.value)}
                variant="outlined"
                autoFocus
              />
              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  native
                  value={shoppingListFilterValue}
                  onChange={(e) => setShoppingListFilterValue(e.target.value)}
                  variant="outlined"
                >
                  <option aria-label="None" value="None">
                    None
                  </option>
                  <option value={"Name"}>Name</option>
                  <option value={"Catogory"}>Catogory</option>
                  <option value={"Sub-Catogory"}>Sub-Catogory</option>
                  <option value={"Measurement"}>Measurement</option>
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
        {Object.entries(items).map((value) => {
          const labelId = `transfer-list-all-item-${value[0]}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value[0])}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.hasOwnProperty(value[0])}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={value[1].name[lang]}
                secondary={`${value[1].catogory} > ${value[1].subCatogory}`}
              />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  const myListGrid = (items) => (
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
          title={myListText[lang]}
          subheader={`${numberOfChecked(items)}/${Object.keys(items).length} ${
            lang === "eng" ? "selected" : "ಆರಿಸಲಾಗಿದೆ"
          }`}
        />
        {isMyListExpand ? (
          <>
            <TextField
              key="Mylist-fliter-input"
              id="outlined-required"
              label="Filter"
              value={myListFilterValue}
              onChange={(e) => setMyListFilterValue(e.target.value)}
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
        {Object.entries(items).map((value) => {
          const labelId = `transfer-list-all-item-${value[0]}-label`;

          return (
            <ListItem key={value[0]} role="listitem">
              <ListItemIcon>
                <Checkbox
                  checked={checked.hasOwnProperty(value[0])}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                  onClick={handleToggle(value[0])}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value[1].name} />
              <ListItemText className={classes.inputField}>
                {value[1].measurement === "Qty" ? (
                  <FormControl
                    className={clsx(
                      classes.margin,
                      classes.withoutLabel,
                      classes.selectField
                    )}
                  >
                    <Select
                      value={value[1].sizeValue}
                      onChange={(e) => handleSelectValueChange(e, value[0])}
                      displayEmpty
                      className={classes.selectEmpty}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {value[1].size.map((text) => (
                        <MenuItem key={text} value={text}>
                          {text}
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
                        {value[1].measurement}
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
            isShoppingListExpand ? classes.expandedShoppingListGrid : "",
            isMyListExpand ? classes.hideGrid : ""
          )}
        >
          {customList(listText[lang], right)}
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
              <AddShoppingCartIcon />
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
          {myListGrid(myList)}
        </Grid>
      </Grid>
      <SaveFlieDialog
        opened={isDialogOpened}
        handleDialogClose={handleDialogClose}
        fileName={myListName}
      />
    </>
  );
}
