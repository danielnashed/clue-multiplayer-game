import React, { useEffect, useState } from "react";
import {
   Button,
   Form,
   Card,
   Modal,
   Container,
   Row,
   Col,
} from "react-bootstrap";
import characterService from "../../../services/characterService";

//Import the character selection modal
import CharacterSelectModal from "./CharacterSelectModal";

//create character button array
//async function CreateCharacterButtonArray () {

const CharacterSelectWrapper = () => {
   const [characters, setCharacters] = useState([]);
   const [modalShow, setModalShow] = useState(false);
   const [selectedCharacter, setSelectedCharacter] = useState("Colonel Mustard");

   /**
    * useEffect so that when the component first renders, it will call the backend to return the list of available characters.
    */

   useEffect(() => {
      fetchCharacters();
      console.log(characters[0]);
   }, []);

   const fetchCharacters = async () => {
      var characterList = await characterService.getAllCharacters();
      console.log(characterList);

      var charsToSet = [];

      characterList.map((character) => {
         var characterObject = {
            name: character.name,
            id: character.id,
         };
         charsToSet.push(characterObject);
      });

      console.log(charsToSet);

      setCharacters(charsToSet);
   };

   const selectClicked = async (e) => {
      e.preventDefault();
      console.log("Clicked");
      characterService.selectCharacter(selectedCharacter);
      setModalShow(false);
   };

   // if (characters.length === 0) {
   //    return <div>Loading...</div>;
   // }

   return (
      <>
         <Button variant="primary" onClick={() => setModalShow(!modalShow)}>
            {" "}
            Open Modal{" "}
         </Button>

         <CharacterSelectModal
            show={modalShow}
            characters={characters}
            onHide={() => setModalShow(false)}
            selectClicked={selectClicked}
         />
      </>
   );
};

export default CharacterSelectWrapper;
