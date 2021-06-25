import React, { useState } from "react";
import "./App.scss";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Header from "./core/Header";
import Container from "./core/Container";
import DrawerContent from "./core/DrawerContent";
import store from "./redux/store";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
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
    [theme.breakpoints.down("sm")]: {
      marginTop: '56px',
    }
  },
}));

const App = (props) => {
  const { window } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDarkColorMode, setIsDarkColorMode] = useState(false);

  store.subscribe(() => {
    setIsDarkColorMode(store.getState().isDarkColorMode);
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const colortheme = createMuiTheme({
    palette: {
      type: isDarkColorMode ? "dark" : "light",
      primary: {
        main: "#5c6e91",
      },
      secondary: {
        main: "#dd9866",
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
      background: {
        default: isDarkColorMode ? "#393e46" : "#eeeded",
        paper: isDarkColorMode ? "#424242" : "#fff",
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
            <Hidden mdUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                anchor={colortheme.direction === "rtl" ? "right" : "left"}
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
            </Hidden>
            <Hidden smDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                <DrawerContent />
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            <Container />
          </main>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

export default connect(null)(App);
