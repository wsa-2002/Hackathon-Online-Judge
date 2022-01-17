import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Typography, LinearProgress, makeStyles,
} from '@material-ui/core';

function LinearProgressWithLabel(props) {
  const useStyles = makeStyles(() => ({
    bar: {
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
    },
    colorPrimary: {
      height: 10,
      borderRadius: 5,
      backgroundColor: '#d32f2f', // red
    },
    barColorPrimary: {
      backgroundColor: '#388e3c', // green
    },
  }));
  const classes = useStyles();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: 280, minWidth: 200, mr: 2 }}>
        <LinearProgress
          classes={{
            bar: classes.bar,
            colorPrimary: classes.colorPrimary,
            barColorPrimary: classes.barColorPrimary,
          }}
          variant="determinate"
          value={props.value}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body1" color={props.value === 100 ? 'secondary' : 'error'}>
          {`${Math.round(props.value)} %`}
        </Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default LinearProgressWithLabel;
