import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, CardHeader, CardBody } from "react-bootstrap";
import { useHistory, useNavigate, useParams } from "react-router-dom";
import rooms from "../../../data/rooms";
import Room from "./Room";
import Hallway from "./Hallway";

//IMPORT SERVICES
import gameService from "../../../services/gameService";


const BoardDisplay = (props) => {

   const ROOMS = rooms.rooms
   const Hallr2=[3,4,5]
   const Hallr4=[8,9,10]
   const [turnStateInfo, setTurnState] = React.useState([]);


   const processCharInfo = () =>{

      window.localStorage.getItem("gameID");
      return 
   }

   const handleClick = (e) => {
      const value = e.currentTarget.getAttribute("value");
      //console.log(value);
      alert(e.currentTarget);
   };

   var { id } = useParams();

   useEffect(() => {
      const interval = setInterval(() => {
         
         locationSetup(id);

      }, 1000);

      return () => clearInterval(interval);
   }, []);


   const locationSetup = async() => {
      const stateInfo = await gameService.getGameById(id);
      //console.log(stateInfo.users);
      setTurnState(stateInfo.users);
   }

   return (
      <div class="d-flex justify-content-center align-content-center flex-wrap"
         style={{
            width: "47vw",
            height: "97vh",
            backgroundColor: "#222222",
            borderRadius: "2em",
            margin: ".5em",
            marginRight: "2%",
            marginLeft: "2%",
            float: "left",
            boxShadow: "10px 10px 30px #111111"
         }}
      >
      <div 
         style={{
            borderRadius: "em",
            margin: ".5em",
            marginRight: "2%",
            marginLeft: "2%",
            padding: '0.5rem',
            zIndex: "1",
            top:"50%",
            
         }}
      >
         
      <Container>
         <Row xs={5} lg={5} >
            <Room name="Study" rKey={1} image="../room-images/Study.png" states={turnStateInfo}/>
            <Hallway hKey= {1} states={turnStateInfo}/>
            <Room name="Hall" rKey={3} image="../room-images/Hall.png" states={turnStateInfo}/>
            <Hallway hKey= {2} states={turnStateInfo}/>
            <Room name="Lounge" rKey={4} image="../room-images/Lounge.png" states={turnStateInfo}/>
         </Row>
         <Row xs={3} lg={3}>
            {Hallr2.map((hall) => (
               <Hallway hKey= {hall} mid={true} states={turnStateInfo}/>
            ))}
         </Row>
         <Row xs={5} lg={5}>
            <Room name="Library" rKey={8} image="../room-images/Library.png" states={turnStateInfo}/>
            <Hallway hKey= {6} states={turnStateInfo}/>
            <Room name="Billiard Room" rKey={9} image="../room-images/Billiards.png" states={turnStateInfo}/>
            <Hallway hKey= {7} states={turnStateInfo}/>
            <Room name="Dining Room" rKey={6} image="../room-images/Dining Room.png" states={turnStateInfo}/>
         </Row>
         <Row xs={3} lg={3}>
            {Hallr4.map((hall) => (
               <Hallway hKey= {hall} mid={true} states={turnStateInfo}/>
            ))}
         </Row>      
         <Row xs={5} lg={5}>
            <Room name="Conservatory" rKey={5} image="../room-images/Conservatory.png" states={turnStateInfo}/>
            <Hallway hKey= {11} states={turnStateInfo}/>
            <Room name="Ballroom" rKey={7} image="../room-images/Ballroom.png" states={turnStateInfo}/>
            <Hallway hKey= {12} states={turnStateInfo}/>
            <Room name="Kitchen" rKey={2} image="../room-images/Kitchen.png" states={turnStateInfo}/>
         </Row>
      </Container>
      </div>

   </div>

   );
};

export default BoardDisplay;
