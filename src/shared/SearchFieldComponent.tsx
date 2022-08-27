import React from 'react';
import { TextField } from '@material-ui/core';

interface SearchFieldInterface {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const SearchFieldComponent = ({
  searchValue,
  setSearchValue,
}: SearchFieldInterface) => (
  <TextField
    key="Mylist-fliter-input"
    id="outlined-required"
    label="Filter"
    value={searchValue}
    onChange={(e) => setSearchValue(e.target.value)}
    variant="outlined"
    autoFocus
  />
);

export default SearchFieldComponent;
