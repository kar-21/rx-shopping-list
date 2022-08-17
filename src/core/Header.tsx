import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { Language, RootState } from "../redux/model.interface";

const headerText = {
  [Language.english]: "Shopping List",
  [Language.kannada]: "ಖರೀದಿ ಪಟ್ಟಿ",
};

const Header = () => {
  const { jwt, language, userId } = useSelector((state: RootState) => state.reducer);

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
      <div>{headerText[language]}</div>
    </>
  );
};

export default Header;
