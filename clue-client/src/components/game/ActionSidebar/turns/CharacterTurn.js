import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import "./turns.css";

const CharacterTurn = (props) => {
   const cImg = props.cCharImg;
   const pTurn = props.playersTurn;
   const cName = props.cCharName;

   var msg= pTurn ? "It is your turn" : "It is not your turn.";
  


   return (
      <div
         style={{
            backgroundColor: "#737373",
            bottom: "0",
            width: "97%",
            borderRadius: ".5em",
            marginRight: "auto",
            marginLeft: "auto",
            fontFamily: "Jockey One",
            fontSize: "1em",
            textAlign: "center",
            color: "white",
            boxShadow: "2px 4px 6px 1px rgba(0, 0, 0, 0.7) ",
            marginBottom: "1em",
         }}
      >
         <Row>
            <Col md={6}>
               <div
                  style={{
                     marginTop: ".5em",
                     marginBottom: ".5em",
                  }}
               >
                  <div>{cName}'s Turn</div>
                  <br />
                  <div
                     style={{
                        marginTop: ".5em",
                        marginBottom: ".5em",
                        fontSize: "2rem",
                     }}
                  >
                  
                     {msg}
                  </div>
               </div>
            </Col>
            <Col>
               <img
                  src={cImg}
                  style={{
                     borderRadius: ".5em",
                     objectFit: "contain",
                     marginTop: ".5em",
                     marginBottom: ".5em",
                     maxWidth: "80%",
                     boxShadow: "2px 4px 6px 1px rgba(0, 0, 0, 0.7) ",
                  }}
               ></img>
            </Col>
         </Row>
      </div>
   );
};

export default CharacterTurn;
