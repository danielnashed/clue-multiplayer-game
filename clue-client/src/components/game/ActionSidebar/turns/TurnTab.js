import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import characters from "./../../../../data/characters.js";

import "./turns.css";

import YourTurn from "./YourTurn";
import CharacterTurn from "./CharacterTurn";

const TurnTab = (props) => {
      const turnData = props.charTurnInfo;
      const gameData = props.gameInfo;
      const playersTurn = props.playersTurn

      
      var charTurn = turnData.character;
      var currCharName="unk";
      var currCharImg=""
     

      //console.log(turnData.session_id)


     characters.forEach((c) => {


            if(c.character_id == charTurn){
                  currCharName = c.name;
                  currCharImg = c.image_resource;
            }


      });


/*
      for(const c in characters){
            //console.log(characters[c]);
            //console.log(typeof(c.character_id));
            //console.log(typeof(charTurn))
            
            if(c.character_id == charTurn){
                  //console.log(c.name);
            }
      }
*/
   return (
        
         <CharacterTurn cCharName={currCharName} cCharImg= {currCharImg} playersTurn={playersTurn}/>
   );
};

export default TurnTab;
