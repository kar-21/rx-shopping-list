import React from "react";
import "./App.scss";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Core } from "./core/Core";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import {
  setIsLoggedInAction,
  setJwtTokenAction,
  setUserIDAction,
} from "./redux/actionCreator";
import { DecodedTokenType } from "./redux/model.interface";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const mapProps = (state) => {
  return {
    isDarkColorMode: state.isDarkColorMode,
  };
};

const App = (props) => {
  useEffect(() => {
    const cookie = new Cookies();
    const token = cookie.get("token");
    if (token) {
      const decodedToken: DecodedTokenType = jwt_decode(token);
      props.dispatch(setUserIDAction(decodedToken?.userId));
      props.dispatch(setIsLoggedInAction(true));
      props.dispatch(setJwtTokenAction(token));
    }
  }, [props]);
  const classes = useStyles();

  const colortheme = createMuiTheme({
    palette: {
      type: props.isDarkColorMode ? "dark" : "light",
      primary: {
        main: "#5c6e91",
      },
      secondary: {
        main: "#dd9866",
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
      background: {
        default: props.isDarkColorMode ? "#393e46" : "#eeeded",
        paper: props.isDarkColorMode ? "#424242" : "#fff",
      },
    },
    typography: {
      fontFamily: ["Verdana", "Arial", "Helvetica", "sans-serif"].join(","),
    },
  });

  return (
    <ThemeProvider theme={colortheme}>
      <div className={classes.root}>
        <CssBaseline />
        <BrowserRouter>
          <Core />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

export default connect(mapProps)(App);
