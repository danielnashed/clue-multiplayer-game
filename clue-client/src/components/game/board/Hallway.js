import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button, Card, CardHeader, CardBody } from "react-bootstrap";
import updateService from "../../../services/updateService";
import characters from "./../../../data/characters.js";
import userService from "../../../services/userService";


const Hallway = (props) => {
   const hallwayKey = props.hKey;
   const middleRow=props.mid;
   const stateInfo= props.states;
   
   const hallwayInnerColor = "#8C8470";

   //this will be where we set the hallway color to the character color if present, otherwise its that
   var occupantCharID = null;
   var ocptColor= "#505050";
   var hallwayTextColor = "#B0B0B0";
   var characterID = -1;
   const sessionId = window.localStorage.getItem("sessionId");

   if(stateInfo != null){
      stateInfo.forEach(u => {
         if(u.hallway == hallwayKey){
            characters.forEach((c) => {
               if(c.character_id == u.character){
                  ocptColor=c.color;
                  hallwayTextColor=c.color;
                  characterID = u.character;
               }
            })
         }
         if(u.session_id==sessionId){
            characterID = u.character;
         }
   
      });
   }

return(
   <Col className=  {middleRow ? "d-flex align-items-between justify-content-center" : "d-flex align-items-center" } >
   <Button
         style= {{ 
            width: `${middleRow ? "75px" : "100%"}`,
            height:`${middleRow ? "60px": null}`, 
            cursor: "pointer",
            backgroundColor: hallwayInnerColor, 
            borderColor: ocptColor, 
            borderWidth: "7px"}}

         key={hallwayKey}
         onClick={ () => {
            console.log("*****HALLWAY MOVE REQUEST MADE*****"); 
            console.log(stateInfo);
            console.log("sessionID: " + sessionId);
            console.log("hallwayKey: " + hallwayKey);
            console.log("characterID: " + characterID);
            {userService.moveCharacter(sessionId, null, hallwayKey, characterID )}
         }} 
         >
         <Card.Text
         as="h1"
         class="d-flex justify-content-center align-content-center flex-wrap"
         style={{
            verticalAlign: "middle",
            textAlign: "middle",
            color: hallwayTextColor,
            font: "Jockey One",
         }}
         >
      
      {hallwayKey}
      
      </Card.Text>
   </Button>
</Col>
);
};


export default Hallway;