import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

import gameService from "../../../../services/gameService";

const StartGame = (props) => {
   const [show, setShow] = React.useState(false);

   const gameId = window.localStorage.getItem("externalGameId");

   const startGame = async () => {
      await gameService.startGame(gameId);
      props.start();
   };

   return (
      <>
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
               fontFamily: "Jockey One",
               boxShadow: "10px 10px 30px #111111",
            }}
            onClick={() => setShow(true)}
         >
            Start Game
         </Button>

         <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
         >
            <Modal.Header closeButton>
               <Modal.Title>
                  <h2>Start Game</h2>
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <h4>Are you sure you want to start the game?</h4>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={() => setShow(false)}>
                  Cancel
               </Button>
               <Button variant="primary" onClick={() => startGame()}>
                  Start Game
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default StartGame;
