import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  setIsLoggedInAction,
  setJwtTokenAction,
  setUserIDAction,
} from '../redux/actionCreator';
import { DecodedTokenType } from '../redux/model.interface';

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const cookie = new Cookies();
    const token = searchParams.get('token');
    if (token) {
      const decodedToken: DecodedTokenType = jwtDecode(token);
      dispatch(setUserIDAction(decodedToken.userId));
      cookie.set('token', token, {
        path: '/',
        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      });
      dispatch(setUserIDAction(decodedToken.userId));
      dispatch(setIsLoggedInAction(true));
      dispatch(setJwtTokenAction(token));
      setTimeout(() => {
        navigate('/feature');
      });
    } else {
      const cookieToken = cookie.get('token');
      if (token) {
        const decodedToken: DecodedTokenType = jwtDecode(cookieToken);
        dispatch(setUserIDAction(decodedToken.userId));
        dispatch(setIsLoggedInAction(true));
        dispatch(setJwtTokenAction(cookieToken));
        navigate('/feature');
      } else {
        axios
          .get('http://localhost:3500/login')
          .then((data) => {
            window.location.replace(data.data.redirectURI);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [dispatch, navigate, searchParams]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};

export default Login;
