import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, IconButton, Divider, Button } from '@material-ui/core';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

import {
  setLanguageAction,
  setIsDarkColorModeAction,
} from '../redux/actionCreator';
import googleIcon from '../assets/image/google-icon.png';
import { Language, RootState } from '../redux/model.interface';

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100vw',
    height: '100vh',
  },
  appBar: {
    height: '45px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    paddingTop: '45px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  loginButton: {
    width: 'fit-content',
    fontSize: 'large',
    fontWeight: 'bold',
    padding: '5px 50px',
    margin: '5px',
    color: '#5c6e91',
  },
  enterButton: {
    width: 'fit-content',
    fontSize: 'x-large',
    padding: '3px 20px',
    margin: '5px',
    color: '#dd9866',
    textTransform: 'capitalize',
  },
  h1: {
    fontSize: '10vh',
    fontFamily: 'Apple Chancery, cursive',
    [theme.breakpoints.down('xs')]: {
      fontSize: '7vh',
    },
  },
  divider: {
    height: '2px',
    width: '60%',
  },
  img: {
    width: '25px',
    height: '25px',
    marginLeft: '4px',
  },
  button: {},
}));

const LandingPage = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isDarkColorMode, language } = useSelector(
    (state: RootState) => state.reducer,
  );

  const handleRoute = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <IconButton
          aria-label=""
          edge="end"
          className={classes.button}
          onClick={() =>
            dispatch(
              setLanguageAction(
                language === Language.english
                  ? Language.kannada
                  : Language.english,
              ),
            )
          }
        >
          E|ಕ
        </IconButton>
        <IconButton
          aria-label=""
          edge="end"
          className={classes.button}
          onClick={() => dispatch(setIsDarkColorModeAction(!isDarkColorMode))}
        >
          {isDarkColorMode ? (
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
              onClick={() => handleRoute('/login')}
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
              onClick={() => handleRoute('/feature')}
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

export default LandingPage;
