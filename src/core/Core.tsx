import React from "react";
import { Switch, Route } from "react-router-dom";
import FeaturePage from "./FeaturePage";
import LandingPage from "./LandingPage";
import Login from "./Login";

export const Core = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={() => <LandingPage />} />
      <Route path="/feature" component={() => <FeaturePage />} />
      <Route exact path="/login" component={() => <Login />} />
      <Route path="/login/:token" render={() => <Login />} />
    </Switch>
  );
};
