import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';

import './App.scss';
import jwtDecode from 'jwt-decode';
import Cookies from 'universal-cookie';
import Core from './core/Core';
import {
  setIsLoggedInAction,
  setJwtTokenAction,
  setUserIDAction,
} from './redux/actionCreator';
import { DecodedTokenType, RootState } from './redux/model.interface';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

const App = (): JSX.Element => {
  const dispatch = useDispatch();

  const { isDarkColorMode } = useSelector((state: RootState) => state.reducer);

  useEffect(() => {
    const cookie = new Cookies();
    const token = cookie.get('token');
    if (token) {
      const decodedToken: DecodedTokenType = jwtDecode(token);
      dispatch(setUserIDAction(decodedToken?.userId));
      dispatch(setIsLoggedInAction(true));
      dispatch(setJwtTokenAction(token));
    }
  }, [dispatch]);
  const classes = useStyles();

  const colorTheme = createTheme({
    palette: {
      type: isDarkColorMode ? 'dark' : 'light',
      primary: {
        main: '#5c6e91',
      },
      secondary: {
        main: '#dd9866',
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
      background: {
        default: isDarkColorMode ? '#393e46' : '#eeeded',
        paper: isDarkColorMode ? '#424242' : '#fff',
      },
    },
    typography: {
      fontFamily: ['Verdana', 'Arial', 'Helvetica', 'sans-serif'].join(','),
    },
  });

  return (
    <ThemeProvider theme={colorTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <BrowserRouter>
          <Core />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

export default App;
