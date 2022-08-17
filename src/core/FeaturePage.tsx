import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Routes, Route } from "react-router-dom";

import { setMobileOpenAction } from "../redux/actionCreator";
import Header from "./Header";
import DrawerContent from "./DrawerContent";
import NewList from "../new-list/NewList";
import SavedLists from "../saved-lists/SavedLists";
import { connect, useDispatch, useSelector } from "react-redux";
import About from "../about/About";
import { RootState } from "../redux/model.interface";

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

const FeaturePage = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { isDarkColorMode, lang, mobileOpen } = useSelector(
    (state: RootState) => state
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  const handleDrawerToggle = () => {
    dispatch(setMobileOpenAction(!mobileOpen));
  };

  const colorTheme = createMuiTheme({
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
        <Box sx={{ display: { md: "none", sm: "block" } }}>
          <Drawer
            container={container}
            variant="temporary"
            anchor={colorTheme.direction === "rtl" ? "right" : "left"}
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
        <Box sx={{ display: { md: "block", sm: "none" } }}>
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
        <Routes>
          <Route path="/feature/" element={<NewList />} />
          <Route path="/feature/savedLists/" element={<SavedLists />} />
          <Route path="/feature/about" element={<About />} />
        </Routes>
      </main>
    </>
  );
};

export default FeaturePage;
