import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

//IMPORT TEST DATA
import weapons from "../../../../../data/weapons";
import characters from "../../../../../data/characters";

const GuessItem = ({ name, image, stateFunction }) => {
   const [clicked, setClicked] = useState(() => {
      return localStorage.getItem(`${name}`) === "true";
   });
   const [selected, setSelected] = useState(false);

   const passUpStateOnClick = (e) => {
      const value = e.currentTarget.getAttribute("alt");
      setSelected(!selected);
      console.log(value);
      stateFunction(value);
   };

   return (
      <div
         style={{
            flexBasis: "33.333333%",
            maxWidth: "33.333333%",
            position: "relative",
         }}
      >
         <img
            style={{
               width: "100%",
               height: "100%",
               objectFit: "contain",
               padding: "10px",
               filter: `${clicked ? "blur(3px)" : ""}${selected ? "brightness(50%)" : ""}`,
               cursor: "pointer",
               borderRadius: "2em",

            }}
            src={image}
            alt={name}
            onClick={passUpStateOnClick}
         />
      </div>
   );
};

export default GuessItem;
