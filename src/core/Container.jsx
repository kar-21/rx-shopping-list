import React from "react";
import { Switch, Route } from "react-router-dom";

import NewList from "../new-list/NewList";
import SavedLists from "../saved-lists/SavedLists";
const Container = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={() => <NewList />} />
      <Route exact path="/savedLists" component={() => <SavedLists />} />
    </Switch>
  );
};

export default Container;
