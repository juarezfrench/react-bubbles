import React, { useState, useEffect } from "react";
import AxiosWithAuth from "./AxiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const getColors = () => {
    AxiosWithAuth()
      .get(`/api/colors`)
      .then(response => {
        console.log("get colors response", response);
        setColorList(response.data);
      })
      .catch(err => console.log("Bubble Page error: ", err.response));
  };
  useEffect(() => {
    getColors();
  }, []);
  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
