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
import { DecodedTokenType } from "../redux/model.interace";

const mapProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  jwt: state.jwt,
});

const Login = (props) => {
  useEffect(() => {
    const cookie = new Cookies();
    if (props.match.params.token) {
      const decodedToken: DecodedTokenType = jwt_decode(props.match.params.token);
      props.dispatch(
        setUserIDAction(decodedToken.userId)
      );
      cookie.set("token", props.match.params.token, {
        path: "/",
        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      });
      props.dispatch(
        setUserIDAction(decodedToken.userId)
      );
      props.dispatch(setIsLoggedInAction(true));
      props.dispatch(setJwtTokenAction(props.match.params.token));
      setTimeout(() => {
        props.history.push("/feature");
      });
    } else {
      const token = cookie.get("token");
      console.log(token);
      if (token) {
        const decodedToken: DecodedTokenType = jwt_decode(token)
        props.dispatch(setUserIDAction(decodedToken.userId));
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
