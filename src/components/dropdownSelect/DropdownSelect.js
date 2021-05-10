import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

const DropdownSelect = ({ value, regions, handleSelect }) => {
  return (
    <div className='location'>
      <FormControl className='city-select'>
        <InputLabel htmlFor='grouped-select'>City</InputLabel>
        <Select value={value} id='grouped-select' onChange={handleSelect}>
          {regions.map((region) => (
            <MenuItem value={region} key={region}>
              {region}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DropdownSelect;
