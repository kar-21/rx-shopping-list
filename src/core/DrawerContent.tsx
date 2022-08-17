import React, { useState, useEffect, ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import {
  setLanguageAction,
  setIsDarkColorModeAction,
} from "../redux/actionCreator";
import { RootState } from "../redux/model.interface";

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

const DrawerContent = () => {
  const classes = useStyles();
  const [colorModeText, setColorModeText] = useState(lightModeText);
  const [currentRoute, setCurrentRouter] = useState("/");

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isDarkColorMode, lang } = useSelector((state: RootState) => state);

  useEffect(() => {
    setCurrentRouter(location.pathname);
  }, [currentRoute, location]);

  useEffect(() => {
    if (isDarkColorMode && lang === "eng") {
      setColorModeText(DarkModeText);
    } else if (!isDarkColorMode && lang === "eng") {
      setColorModeText(lightModeText);
    } else if (isDarkColorMode && lang === "ka") {
      setColorModeText(DarkModeTextKA);
    } else if (!isDarkColorMode && lang === "ka") {
      setColorModeText(lightModeTextKA);
    }
  }, [isDarkColorMode, lang]);

  const toggleColorMode = () => {
    dispatch(setIsDarkColorModeAction(!isDarkColorMode));
  };

  const handleLangChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setLanguageAction(event.target.value));
  };

  const handleRoute = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon>
            <Switch
              checked={isDarkColorMode}
              onChange={toggleColorMode}
              color="default"
            />
          </ListItemIcon>
          <ListItemText primary={colorModeText} />
        </ListItem>
        <ListItem className={classes.langDiv}>
          <span>
            <Radio
              checked={lang === "eng"}
              onChange={handleLangChange}
              value="eng"
              name="radio-button-demo"
              inputProps={{ "aria-label": "English" }}
            />
            English
          </span>
          <span>
            <Radio
              checked={lang === "ka"}
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
            text: lang === "eng" ? "New List" : "ಹೊಸ ಪಟ್ಟಿ",
            icon: <LibraryAdd />,
            path: "/feature",
          },
          {
            text: lang === "eng" ? "Saved Lists" : "ಉಳಿಸಿದ ಪಟ್ಟಿಗಳು",
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
            text: lang === "eng" ? "About Us" : "ನಮ್ಮ ಬಗ್ಗೆ",
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

export default DrawerContent;
