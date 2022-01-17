import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import store from './store';
import Index from './containers';
import theme from './theme';

export default function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CssBaseline />
          <Router>
            <Index />
          </Router>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </Provider>
  );
}
