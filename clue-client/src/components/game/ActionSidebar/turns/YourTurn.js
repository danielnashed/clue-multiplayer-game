import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import "./turns.css";


const YourTurn = (props) => {
   const [turnBoolean, setTurnBoolean] = useState(false);



   return (
    <>
   {turnBoolean ? (
   
    <div 
         style={{
            backgroundColor: "#737373",
            bottom: "0",
            width: "97%",
            borderRadius: ".5em",
            marginRight: "auto",
            marginLeft: "auto",
            height: "26%",
            fontFamily: "Jockey One",
            color: "#4ff725",
            textAlign: "center",
            boxShadow: "2px 4px 6px 1px rgba(0, 0, 0, 0.7) ",
         }}
      >
         It is your turn.
      </div>) : (
            <div 
            style={{
                backgroundColor: "#737373",
                bottom: "0",
                width: "97%",
                borderRadius: ".5em",
                marginRight: "auto",
                marginLeft: "auto",
                height: "26%",
                fontFamily: "Jockey One",
                color: "white",
                textAlign: "center",
                boxShadow: "2px 4px 6px 1px rgba(0, 0, 0, 0.7) ",
            }}
            >
                It is not your turn.
            </div>
        )
            }        
            </>
   );}

export default YourTurn;