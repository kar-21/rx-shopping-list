import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { RootState } from "../redux/model.interface";

const headerText = {
  eng: "Shopping List",
  ka: "ಖರೀದಿ ಪಟ್ಟಿ",
};

const Header = () => {
  const { jwt, lang, userId } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (userId) {
      const bearerString = `Bearer ${jwt}`;
      axios
        .get(`http://localhost:3500/users/${userId}`, {
          headers: { authorization: bearerString },
        })
        .then((data) => {
          console.log(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId, jwt]);

  return (
    <>
      <div>{headerText[lang]}</div>
    </>
  );
};

export default Header;
