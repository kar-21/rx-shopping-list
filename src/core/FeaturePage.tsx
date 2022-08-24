import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, createTheme } from '@material-ui/core/styles';
import { Outlet } from 'react-router-dom';

import DrawerContent from './DrawerContent';
import { setMobileOpenAction } from '../redux/actionCreator';
import { RootState } from '../redux/model.interface';
import Header from './Header';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    marginTop: '64px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '56px',
    },
  },
}));

const FeaturePage = ():JSX.Element => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { isDarkColorMode, mobileOpen } = useSelector(
    (state: RootState) => state.reducer,
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  const handleDrawerToggle = () => {
    dispatch(setMobileOpenAction(!mobileOpen));
  };

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
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <Header />
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Box sx={{ display: { md: 'none', sm: 'block' } }}>
          <Drawer
            container={container}
            variant="temporary"
            anchor={colorTheme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <DrawerContent />
          </Drawer>
        </Box>
        <Box sx={{ display: { md: 'block', sm: 'none' } }}>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <DrawerContent />
          </Drawer>
        </Box>
      </nav>
      <main className={classes.content}>
        <Outlet />
      </main>
    </>
  );
};

export default FeaturePage;
