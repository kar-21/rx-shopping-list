import React from "react";
import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { setLanguageAction, setIsDarkColorModeAction } from "../redux/action";
import googleIcon from "../assets/image/google-icon.png";

const useStyles = makeStyles((theme) => ({
  main: {
    width: "100vw",
    height: "100vh",
  },
  appBar: {
    height: "45px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container: {
    paddingTop: "45px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loginButton: {
    width: "fit-content",
    fontSize: "large",
    fontWeight: "bold",
    padding: "5px 50px",
    margin: "5px",
    color: "#5c6e91",
  },
  enterButton: {
    width: "fit-content",
    fontSize: "x-large",
    padding: "3px 20px",
    margin: "5px",
    color: "#dd9866",
    textTransform: "capitalize",
  },
  h1: {
    fontSize: "10vh",
    fontFamily: "Apple Chancery, cursive",
    [theme.breakpoints.down("xs")]: {
      fontSize: "7vh",
    },
  },
  divider: {
    height: "2px",
    width: "60%",
  },
  img: {
    width: "25px",
    height: "25px",
    marginLeft: "4px",
  },
}));

const mapProps = (state) => {
  return {
    lang: state.lang,
    isDarkColorMode: state.isDarkColorMode,
    mobileOpen: state.mobileOpen,
  };
};

const LandingPage = (props) => {
  const classes = useStyles();

  const handleRoute = (path) => {
    props.history.push(path);
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <IconButton
          aria-label=""
          edge="end"
          className={classes.button}
          onClick={() =>
            props.dispatch(
              setLanguageAction(props.lang === "eng" ? "ka" : "eng")
            )
          }
        >
          E|ಕ
        </IconButton>
        <IconButton
          aria-label=""
          edge="end"
          className={classes.button}
          onClick={() =>
            props.dispatch(setIsDarkColorModeAction(!props.isDarkColorMode))
          }
        >
          {props.isDarkColorMode ? (
            <EmojiObjectsOutlinedIcon />
          ) : (
            <EmojiObjectsIcon />
          )}
        </IconButton>
      </AppBar>
      <main className={classes.main}>
        <div className={classes.container}>
          <h1 className={classes.h1}>Shopping List</h1>
          <Divider className={classes.divider} />
          <h3>Welcome to our website.</h3>
          <div className={classes.buttonContainer}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              className={classes.loginButton}
              onClick={() => handleRoute("/login")}
              aria-label="move selected right"
              disabled={true}
              endIcon={<img className={classes.img} src={googleIcon} alt="G" />}
            >
              Login
            </Button>
            (Coming Soon..)
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              className={classes.enterButton}
              onClick={() => handleRoute("/feature")}
              aria-label="move selected right"
            >
              Enter without login
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default connect(mapProps)(withRouter(LandingPage));
