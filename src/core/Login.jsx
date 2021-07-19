import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import axios from "axios";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import {
  setIsLoggedInAction,
  setJwtTokenAction,
  setUserIDAction,
} from "../redux/action";

const mapProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  jwt: state.jwt,
});

const Login = (props) => {
  useEffect(() => {
    const cookie = new Cookies();
    if (props.match.params.token) {
      props.dispatch(
        setUserIDAction(jwt_decode(props.match.params.token).userId)
      );
      cookie.set("token", props.match.params.token, {
        path: "/",
        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      });
      props.dispatch(
        setUserIDAction(jwt_decode(props.match.params.token).userId)
      );
      props.dispatch(setIsLoggedInAction(true));
      props.dispatch(setJwtTokenAction(true));
      setTimeout(() => {
        props.history.push("/feature");
      });
    } else {
      const token = cookie.get("token");
      console.log(token);
      if (token) {
        props.dispatch(setUserIDAction(jwt_decode(token).userId));
        props.dispatch(setIsLoggedInAction(true));
        props.dispatch(setJwtTokenAction(token));
        props.history.push("/feature");
      } else {
        axios
          .get("http://localhost:3500/login")
          .then((data) => {
            window.location.replace(data.data.redirectURI);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [props]);
  return <></>;
};

export default connect(mapProps)(withRouter(Login));
