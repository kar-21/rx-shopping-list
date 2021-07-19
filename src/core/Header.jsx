import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

const headerText = {
  eng: "Shopping List",
  ka: "ಖರೀದಿ ಪಟ್ಟಿ",
};

const mapLanguage = (state) => {
  return {
    lang: state.lang,
    jwt: state.jwt,
    userId: state.userId,
  };
};

const Header = (props) => {
  useEffect(() => {
    if (props.userId) {
      const bearerString = `Bearer ${props.jwt}`;
      axios
        .get(`http://localhost:3500/users/${props.userId}`, {
          headers: { authorization: bearerString },
        })
        .then((data) => {
          console.log(data.data );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.userId, props.jwt]);

  return (
    <>
      <div>{headerText[props.lang]}</div>
    </>
  );
};

export default connect(mapLanguage)(Header);
