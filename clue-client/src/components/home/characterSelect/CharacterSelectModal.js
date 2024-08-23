import { wait } from "@testing-library/user-event/dist/utils";
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
import { useHistory, useNavigate } from "react-router-dom";
import characterService from "../../../services/characterService";

import characters from "../../../data/characters";

const CharacterSelectModal = (props) => {
   const [selectedCharacter, setSelectedCharacter] = useState(0);

   const navigate = useNavigate();

   const handleClick = (e) => {
      const value = e.currentTarget.getAttribute("value");
      console.log(value);
      setSelectedCharacter(value);
   };

   /**
    * FOR THE TIME BEING SWAPPING GETCHARACTER AND SELECTCHARACTER
    * @param {} e
    */
   const selectCharacter = async (e) => {
      console.log("Clicked");
      const stringForSetCharacter = await characterService.setCharacter(selectedCharacter);
      console.log(stringForSetCharacter);
      const externalGameId = window.localStorage.getItem("externalGameId");
     

      // const stringForSelectedChar = await characterService.getCharacter(
      //    selectedCharacter
      // );
      // WHEN ACTUALLY IMPLEMENTING, CHANGE THIS TO /GAME:ID BASED ON THE EXTERNAL_GAME_ID
      // THE USER IS LINKED TO
      navigate(`/game/${externalGameId}`);
   };

   return (
      <Modal
         show={props.show}
         size="xl"
         aria-labelledby="contained-modal-title-vcenter"
         onHide={props.onHide}
      >
         <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
               Select Your Character
            </Modal.Title>
         </Modal.Header>

         <Modal.Body
            className="grid-example"
            data-bs-theme="dark"
            style={{ backgroundColor: "#444444" }}
         >
            <Container>
               <Row xs={1} md={2} lg={3} className="g-4">
                  {characters.map((character) => (
                     <Col>
                        <Card
                           border="dark"
                           style={{ width: "18rem", cursor: "pointer" }}
                           key={character.id}
                           value={character.character_id}
                           onClick={handleClick}
                        >
                           <Card.Body>
                              <Card.Title>{character.name}</Card.Title>
                           </Card.Body>
                           <Card.Img variant="bottom" src={character.image_resource} />
                        </Card>
                     </Col>
                  ))}
               </Row>
            </Container>
         </Modal.Body>

         <Modal.Footer>
            <Button onClick={selectCharacter}>Select</Button>
         </Modal.Footer>
      </Modal>
   );
};

export default CharacterSelectModal;
