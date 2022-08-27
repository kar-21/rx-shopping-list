import React, { ChangeEvent, MouseEventHandler } from 'react';
import {
  ListItem,
  ListItemIcon,
  Checkbox,
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

import {
  EnglishKannadaLookupType,
  Grocery,
  GroceryList,
  Measurement,
  RootState,
} from '../redux/model.interface';
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

interface ListItemInterface {
  listType: 'myList' | 'groceryList';
  keyValue: [string, Grocery];
  checked: GroceryList;
  handleToggle: (
    value: string,
  ) => MouseEventHandler<HTMLButtonElement> | undefined;
  handleSelectValueChange?: (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>,
    item: string,
  ) => void;
  handleInputValueAdd?: (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>,
    item: string,
  ) => void;
}

const ListItemComponent = ({
  listType,
  keyValue,
  checked,
  handleToggle,
  handleSelectValueChange,
  handleInputValueAdd,
}: ListItemInterface): JSX.Element => {
  const classes = useStyles();

  const [key, value] = keyValue;

  const labelId = `transfer-list-all-item-${key}-label`;

  const { language } = useSelector((state: RootState) => state.reducer);

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
      {listType === 'myList' && (
        <>
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
                  ) =>
                    handleSelectValueChange && handleSelectValueChange(e, key)
                  }
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
                ) => handleInputValueAdd && handleInputValueAdd(e, key)}
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
        </>
      )}
      {listType === 'groceryList' && (
        <ListItemText
          id={labelId}
          primary={value.name[language]}
          secondary={`${engKaLookup.category[value.category][language]} > ${
            engKaLookup.subCategory[value.subCategory][language]
          }`}
        />
      )}
    </ListItem>
  );
};

ListItemComponent.defaultProps = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleSelectValueChange: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleInputValueAdd: () => {},
};

export default ListItemComponent;
