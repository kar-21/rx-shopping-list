import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LibraryAdd from "@material-ui/icons/LibraryAdd";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import InfoIcon from "@material-ui/icons/Info";
import Switch from "@material-ui/core/Switch";
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";
import { connect } from "react-redux";
import { setLanguageAction, setIsDarkColorModeAction } from "../redux/action";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  langDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
  },
}));

const lightModeText = "Light Mode";
const lightModeTextKA = "ಬೆಳಕಿನ ಹಿನ್ನೆಲೆ";
const DarkModeText = "Dark Mode";
const DarkModeTextKA = "ಕತ್ತಲೆ ಹಿನ್ನೆಲೆ";

const mapLanguageAndIsDarkMode = (state) => {
  return {
    lang: state.lang,
    isDarkColorMode: state.isDarkColorMode,
  };
};

const DrawerContent = (props) => {
  const classes = useStyles();
  const [colorModeText, setColorModeText] = useState(lightModeText);
  const [currentRoute, setCurrentRouter] = useState("/");

  useEffect(() => {
    setCurrentRouter(props.location.pathname);
  }, [currentRoute, props.location]);

  useEffect(() => {
    if (props.isDarkColorMode && props.lang === "eng") {
      setColorModeText(DarkModeText);
    } else if (!props.isDarkColorMode && props.lang === "eng") {
      setColorModeText(lightModeText);
    } else if (props.isDarkColorMode && props.lang === "ka") {
      setColorModeText(DarkModeTextKA);
    } else if (!props.isDarkColorMode && props.lang === "ka") {
      setColorModeText(lightModeTextKA);
    }
  }, [props.isDarkColorMode, props.lang]);

  const toggleColorMode = () => {
    props.dispatch(setIsDarkColorModeAction(!props.isDarkColorMode));
  };

  const handleLangChange = (event) => {
    props.dispatch(setLanguageAction(event.target.value));
  };

  const handleRoute = (path) => {
    props.history.push(path);
  };

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon>
            <Switch
              checked={props.isDarkColorMode}
              onChange={toggleColorMode}
              color="default"
            />
          </ListItemIcon>
          <ListItemText primary={colorModeText} />
        </ListItem>
        <ListItem className={classes.langDiv}>
          <span>
            <Radio
              checked={props.lang === "eng"}
              onChange={handleLangChange}
              value="eng"
              name="radio-button-demo"
              inputProps={{ "aria-label": "English" }}
            />
            English
          </span>
          <span>
            <Radio
              checked={props.lang === "ka"}
              onChange={handleLangChange}
              value="ka"
              name="radio-button-demo"
              inputProps={{ "aria-label": "ಕನ್ನಡ" }}
            />
            ಕನ್ನಡ
          </span>
        </ListItem>
      </List>
      <Divider />
      <List>
        {[
          {
            text: props.lang === "eng" ? "New List" : "ಹೊಸ ಪಟ್ಟಿ",
            icon: <LibraryAdd />,
            path: "/feature",
          },
          {
            text: props.lang === "eng" ? "Saved Lists" : "ಉಳಿಸಿದ ಪಟ್ಟಿಗಳು",
            icon: <LibraryBooks />,
            path: "/feature/savedLists",
          },
        ].map((list) => (
          <ListItem
            button
            key={list.text}
            color="primary"
            selected={list.path === currentRoute}
            onClick={() => handleRoute(list.path)}
          >
            <ListItemIcon>{list.icon}</ListItemIcon>
            <ListItemText primary={list.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[
          {
            text: props.lang === "eng" ? "About Us" : "ನಮ್ಮ ಬಗ್ಗೆ",
            icon: <InfoIcon />,
            path: "/feature/about",
          },
        ].map((list) => (
          <ListItem
            button
            key={list.text}
            selected={list.path === currentRoute}
            onClick={() => handleRoute(list.path)}
          >
            <ListItemIcon>{list.icon}</ListItemIcon>
            <ListItemText primary={list.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default connect(mapLanguageAndIsDarkMode)(withRouter(DrawerContent));
