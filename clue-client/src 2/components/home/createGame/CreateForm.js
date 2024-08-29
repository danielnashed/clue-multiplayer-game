/**
 * Form to create a game. Will appear in a modal.
 * Input fields include:
 * - Title
 * - Code: generated or custom
 * - Maximum number of players
 * - Closed/Public
 * - Your Character
 *
 * On submission, should use a service function to send a POST request
 * to the API.
 *
 * On successful submission, should redirect to the game session page. If not
 * successful, should display an error message from the API.
 */

import React, { useState } from "react";
import { Button, Form, Modal, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import updateService from "../../../services/updateService";
import gameService from "../../../services/gameService";
import characterService from "../../../services/characterService";

import CharacterSelectModal from "../characterSelect/CharacterSelectModal";

const CreateForm = ({ show, handleClose }) => {
   const [characters, setCharacters] = useState([]);
   const [modalShow, setModalShow] = useState(false);
   const [selectedCharacter, setSelectedCharacter] =
      useState("Colonel Mustard");

   const handleCreateForm = async (e) => {
      e.preventDefault();
      console.log("Submitted");

      var submissionConfirmation = await gameService.postNewGame();
      console.log(submissionConfirmation);
      
      setModalShow(true);
   };


   const selectClicked = async (e) => {
      e.preventDefault();
      console.log("Clicked");
      characterService.selectCharacter(selectedCharacter);
      setModalShow(false);
   };

   return (
      <>
         <style type="text/css">
            {`
        .placeholder-color::placeholder {
        color: #FFFFFF54;
opacity: .8;       }
        `}
         </style>
         <div
            className="p-4"
            style={{
               borderRadius: "1em",
               backgroundColor: "#222222",
               height: "100%",
               width: "80%",
               margin: "auto",
               boxShadow: "10px 10px 30px #111111",
            }}
         >
            <Form onSubmit={handleCreateForm}>
               <Form.Group controlId="formBasicName">
                  <Form.Label
                     style={{
                        color: "white",
                        fontSize: "4em",
                        textAlign: "center",
                     }}
                  >
                     Create a game!
                  </Form.Label>
                  <Form.Control
                     type="id"
                     placeholder="Does nothing right now."
                     style={{
                        backgroundColor: "#D9D9D95E",
                        color: "#FFFFFF54",
                     }}
                     className="placeholder-color"
                  />
                  <Form.Text style={{ color: "white", fontSize: "2em" }}>
                     No fields currently.
                  </Form.Text>
               </Form.Group>
               <Button
                  style={{
                     marginTop: "15px",
                     fontSize: "2em",
                     backgroundColor: "#D9D9D9",
                     border: "none",
                     margin: ".5em 5%",
                     color: "#CE0000",
                     width: "90%",
                     fontSize: "2.5em",
                  }}
                  type="submit"
               >
                  Create
               </Button>
            </Form>

            <CharacterSelectModal
               show={modalShow}
               characters={characters}
               onHide={() => setModalShow(false)}
               selectClicked={selectClicked}
            />
         </div>
      </>
   );
};

export default CreateForm;
