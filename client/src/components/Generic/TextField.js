import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const GenericTextField = (props) => {
  const { value, valueChange, ...rest } = props;
  return (
    <TextField
      value={value}
      onChange={(e) => {
        valueChange(e.target.value);
      }}
      {...rest}
    />
  );
};

GenericTextField.propTypes = {
  value: PropTypes.string.isRequired,
  valueChange: PropTypes.func.isRequired,
};

export default GenericTextField;
