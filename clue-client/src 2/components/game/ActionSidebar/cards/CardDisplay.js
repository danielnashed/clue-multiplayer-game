import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import NotepadSection from "../../notepad/NotepadSection";
//IMPORT TEST DATA
import characters from "../../../../data/characters";
import weapons from "../../../../data/weapons";
import rooms from "../../../../data/rooms";

const CardDisplay = (props) => {
   const givenCharacters = [characters[0], characters[1]];
   const givenWeapons = [weapons[0], weapons[1], weapons[4]];
   const givenRooms = [rooms[0], rooms[1], rooms[3], rooms[4]];

   return (
      <>
         <div
            style={{
               width: "90%",
               display: "flex",
               flexWrap: "wrap",
               margin: "auto",
            }}
         >
            <img
               style={{
                  objectFit: "contain",
                  width: "33%",
                  maxwidth: "30%",
                  filter: `none`,
                  borderRadius: "2em",
               }}
               src="/character-images/col-mustard.png"
               alt="card"
            />
            <img
               style={{
                  objectFit: "contain",
                  filter: `none`,
                  borderRadius: "2em",
                  width: "33%",
                  maxwidth: "30%",

               }}
               src="/knife.webp"
               alt="card"
            />
            <img
               style={{
                  objectFit: "contain",
                  filter: `none`,
                  borderRadius: "2em",
                  width: "33%",
                  maxwidth: "30%",

               }}
               src="/character-images/green.png"
               alt="card"
            />
            <img
               style={{
                  objectFit: "contain",
                  filter: `none`,
                  borderRadius: "2em",
                  width: "33%",
                  maxwidth: "30%",

               }}
               src="/knife.webp"
               alt="card"
            />
         </div>
      </>
   );
};

export default CardDisplay;
