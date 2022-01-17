import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Sidebar from '../../components/Sidebar';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    alignItems: 'stretch',
    marginTop: 30,
  },
  noProblemText: {
    width: '70%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 100,
  },
}));

export default function TAHome() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.main}>
        <Sidebar />
        <Typography variant="h4" className={classes.noProblemText}>Please select or add a problem.</Typography>
      </div>
    </>
  );
}
