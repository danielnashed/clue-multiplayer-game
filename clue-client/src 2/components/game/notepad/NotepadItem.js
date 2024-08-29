import React, { useState } from "react";
import {
   Button,
   Card,
   Form,
   Modal,
   Container,
   Row,
   Col,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import updateService from "../../../services/updateService";

const NotepadItem = ({ name, image }) => {
   const [clicked, setClicked] = useState(() => {
      return localStorage.getItem(`${name}`) === "true";
   });

   const handleClick = async () => {
      setClicked(!clicked);
      localStorage.setItem(`${name}`, !clicked);
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
               filter: `${clicked ? "blur(4px)" : "none"}`,
               cursor: "pointer",
               borderRadius: "2em",
               opacity: `${clicked ? "45%" : "100%"}`,
               //boxShadow: "10px 10px 30px #11111177",

            }}
            src={image}
            alt={name}
            onClick={handleClick}
         />
      </div>
   );
};

export default NotepadItem;
