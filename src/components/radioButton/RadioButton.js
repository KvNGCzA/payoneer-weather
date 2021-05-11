import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Tooltip,
  Radio,
} from '@material-ui/core';

const RadioButton = ({ value, handleChange, units }) => {
  return (
    <div className='unit'>
      <FormControl
        component='fieldset'
        className='custom-fieldset'
        data-testid='temp-selector'
      >
        <RadioGroup
          aria-label='unit'
          name='unit'
          value={value}
          onChange={handleChange}
          className='custom-radio'
        >
          {units.map(unit => (
            <Tooltip title={unit.title} key={unit.title}>
              <FormControlLabel
                value={unit.value}
                control={<Radio />}
                label={unit.title}
                data-testid={unit.title}
              />
            </Tooltip>
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default RadioButton;
