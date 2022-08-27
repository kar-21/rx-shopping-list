import React, { ChangeEvent } from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';

import { FilterType } from '../redux/model.interface';

interface FilterFieldInterface {
  filterValue: FilterType | undefined;
  setFilterValue: (value: FilterType) => void;
}

const FilterFieldComponent = ({
  filterValue,
  setFilterValue,
}: FilterFieldInterface) => (
  <FormControl variant="outlined">
    <Select
      value={filterValue}
      onChange={(
        e: ChangeEvent<{
          name?: string | undefined;
          value: unknown;
        }>,
      ) => setFilterValue(e.target.value as FilterType)}
      displayEmpty
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
);

export default FilterFieldComponent;
