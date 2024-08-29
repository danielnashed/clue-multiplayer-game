/**
 * Form to input join code and submit. Submission calls a function that
 * sends the code and user information to the backend. The backend will
 * validate the code and create the user, then send a response confirming.
 * Once confirmed, the user will be redirected to the game.
 */

import React, { useState } from "react";
import { Button, Form, Modal, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import updateService from "../../../services/updateService";

import CharacterSelectModal from "../characterSelect/CharacterSelectModal";
import userService from "../../../services/userService";
import characterService from "../../../services/characterService";

const JoinForm = () => {
   const [characters, setCharacters] = useState([]);
   const [modalShow, setModalShow] = useState(false);
   const [selectedCharacter, setSelectedCharacter] =
      useState("Colonel Mustard");

   const selectClicked = async (e) => {
      e.preventDefault();
      console.log("Clicked");
      characterService.selectCharacter(selectedCharacter);
      setModalShow(false);
   };

   const joinRequest = async (e) => {
      e.preventDefault();

      var joinCode = document.getElementById("formBasicCode").value;
      console.log(joinCode);

      await userService.joinGame(joinCode);
      //console.log(submissionConfirmation);
      
      //window.localStorage.setItem("sessionId", submissionConfirmation.data.session_id);
      //window.localStorage.setItem("externalGameId", submissionConfirmation.data.game_id);
   

      setModalShow(true);
   };

   return (
      <>
         {/* <style type="text/css">
            {`
        .btn-flat {
        background-color: purple;
        color: white;
        }
        `}
         </style> */}
         <div
            className="p-4"
            style={{
               borderRadius: "1em",
               backgroundColor: "#222222",
               height: "100%",
               width: "80%",
               margin: "auto",
               textAlign: "center",
               boxShadow: "10px 10px 30px #111111",
            }}
         >
            <Form onSubmit={joinRequest}>
               <Form.Group controlId="formBasicCode">
                  <Form.Label style={{ color: "white", fontSize: "4em" }}>
                     <h2>Already have an invite code?</h2>
                     <h1>Insert Below: </h1>
                  </Form.Label>
                  <Form.Control
                     type="id"
                     placeholder="Enter join code."
                     style={{
                        backgroundColor: "#D9D9D95E",
                        color: "#FFFFFF54",
                     }}
                     className="placeholder-color"
                  />
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
                  Join
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

export default JoinForm;
