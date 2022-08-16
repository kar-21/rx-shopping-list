import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { Switch, Route } from "react-router-dom";
import { setMobileOpenAction } from "../redux/action";

import Header from "./Header";
import DrawerContent from "./DrawerContent";
import NewList from "../new-list/NewList";
import SavedLists from "../saved-lists/SavedLists";
import { connect } from "react-redux";
import About from "../about/About";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
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
    marginTop: "64px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "56px",
    },
  },
}));

const mapProps = (state) => {
  return {
    isDarkColorMode: state.isDarkColorMode,
    mobileOpen: state.mobileOpen,
  };
};

const FeaturePage = (props) => {
  const { window } = props;
  const classes = useStyles();
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    props.dispatch(setMobileOpenAction(!props.mobileOpen));
  };

  const colorTheme = createMuiTheme({
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
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={colorTheme.direction === "rtl" ? "right" : "left"}
            open={props.mobileOpen}
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
        <Switch>
          <Route exact path="/feature/" component={() => <NewList />} />
          <Route path="/feature/savedLists/" component={() => <SavedLists />} />
          <Route path="/feature/about" component={() => <About />} />
        </Switch>
      </main>
    </>
  );
};

export default connect(mapProps)(FeaturePage);
