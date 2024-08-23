//NODE MODULES
import React, { useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";

//OTHER COMPONENTS
import GameInfo from "./GameInfo";
import TurnTab from "./turns/TurnTab";
import StartGame from "./actions/StartGame";
import SuggestionButton from "./actions/SuggestionButton";
import AccusationButton from "./actions/AccusationButton";
import CardDisplay from "./cards/CardDisplay";

//IMPORT SERVICES
import gameService from "../../../services/gameService";

const ActionSidebar = (props) => {
   const [gameInSession, setGameInSession] = React.useState(false);
   const [joinCode, setJoinCode] = React.useState("");
   const [turnStateInfo, setTurnState] = React.useState([]);
   const [gameStateInfo, setGameState] = React.useState([]);

   

   var { id } = useParams();

   useEffect(() => {
      const interval = setInterval(() => {
         gameSetup();
         turnSetup();
      }, 1000);

      return () => clearInterval(interval);
   }, []);

   const gameSetup = async () => {
      const gameInfo = await gameService.getGameById(id);
      if (gameInfo.game.is_started) {
         setGameInSession(true);
      }
      setGameState(gameInfo);
      //console.log(gameInfo)
      setJoinCode(gameInfo.game.join_code);
   };

   
   const turnSetup = async() => {
      const turnInfo = await gameService.getWhosTurn(id);
      setTurnState(turnInfo);
   }

   const gameIsStarted = () => {
      setGameInSession(true);
   };



   //check if room_id is null to disable the make an accusation button
   //unable to use useState for this because it caused an infinate loop somehow
   var enableButton = false;
   var playersTurn = false;
   //console.log(turnStateInfo.is_turn);
   //console.log(turnStateInfo.room);
   //console.log(gameStateInfo.users)

   const sessionID = window.localStorage.getItem("sessionId");
      if(turnStateInfo.session_id==sessionID ){
         playersTurn = true;
      }else{playersTurn = false;}


   enableButton = !((turnStateInfo.room != null) && playersTurn)


   return (
      <>
         <div
            style={{
               width: "23vw",
               height: "97vh",
               backgroundColor: "#222222",
               borderRadius: ".8em",
               padding: ".5em",
               margin: ".5em",
               float: "left",
               boxShadow: "10px 10px 30px #111111",
            }}
         >
            <GameInfo joinCode={joinCode} />
            {!gameInSession ? (
               <>
                  <StartGame start={gameIsStarted} />
               </>
            ) : (
               <>
                  <TurnTab charTurnInfo={turnStateInfo} playersTurn={playersTurn}/>
                  <SuggestionButton enableButton={enableButton} />
                  <AccusationButton enableButton={enableButton}/>
                  <CardDisplay/>
               </>
            )}
         </div>
      </>
   );
};

export default ActionSidebar;
