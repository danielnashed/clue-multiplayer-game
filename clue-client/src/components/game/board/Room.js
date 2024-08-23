import React from "react";
import { Container, Row, Col, Image, Button, Card, CardHeader, CardBody } from "react-bootstrap";
import userService from "../../../services/userService";
import characters from "./../../../data/characters.js";

const Room = (props) => {
   const roomName = props.name;
   const roomKey = props.rKey;
   const roomImage = props.image;
   const stateInfo = props.states;
   var characterID = -1;
   const sessionId = window.localStorage.getItem("sessionId");

//this is where we set the room color to the character color if present, otherwise its that
var occupantCharID = null;
var rmStatusColor = "#505050";

//console.log(stateInfo);
if(stateInfo != null){
   stateInfo.forEach(u => {
      if(u.room == roomKey){
         characters.forEach((c) => {
            if(c.character_id == u.character){
               characterID = u.character;
               rmStatusColor=c.color;
            }
         })
      }
      if(u.session_id==sessionId){
         characterID = u.character;
      }

   });
}
   

   //console.log(stateInfo);
   return(
      <Button 
         style={{
               backgroundColor: "#0F0F0F",
               borderColor: rmStatusColor,
               borderWidth: "5px",
               boxShadow: "5px 5px 5px #111111"
            }}  
         onClick={ () => {
            console.log("****ROOM MOVE REQUEST MADE****"); 
            console.log(stateInfo);
            console.log("sessionId: " + sessionId);
            console.log("roomKey: " + roomKey);
            console.log("characterID: "+characterID);
            { userService.moveCharacter(sessionId, roomKey, null, characterID )}
         }}   
      >
         <Image key={roomName} src={roomImage} width={"100%"} rounded/> 
      </Button>
      
   );
};

export default Room;



/*
//REFERENCE
<Col style={{ padding: '0rem' }} > 
   

   <Card
      border="dark"
      style={{ width: "12 rem", cursor: "pointer"}}
      key={"Study"}
      onClick= {handleClick}
   >
      <Card.Img variant="center" src={"./Clue_C.png"} />
      <Card.ImgOverlay>
      <Card.Text
         as="h1"
         class="d-flex justify-content-center align-content-center flex-wrap"
         style={{
            verticalAlign: "middle",
            textAlign: "middle",
            color: "#B0B0B0",
            font: "Jockey One",
            
         }}
      >
      
      {"Study"}
      
      </Card.Text>
      </Card.ImgOverlay>
   </Card>
</Col>
      */