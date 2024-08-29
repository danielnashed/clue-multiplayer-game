import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

//IMPORT COMPONENTS
import GuessSection from "./guessing/GuessSection";

//IMPORT TEST DATA
import weapons from "../../../../data/weapons";
import characters from "../../../../data/characters";
import rooms from "../../../../data/rooms";


const AccusationButton = (props) => {
   const enable = props.enableButton
   const [show, setShow] = React.useState(false);
   const [weapon, setWeapon] = React.useState("");
   const [character, setCharacter] = React.useState("");
   const [room, setRoom] = React.useState("");
   const [submitEnabled, setSubmitEnabled] = React.useState(false);


   

   useEffect(() => {
      if (weapon !== "" && character !== "" && room !== "") {
         setSubmitEnabled(true);
      } else {
         setSubmitEnabled(false);
      }
   }, [weapon, character, room]);

   const addWeapon = (v) => {
      console.log(v);
      setWeapon(v);
   };

   const addSuspect = (v) => {
      console.log(v);
      setCharacter(v);
   };

   const addRoom = (v) => {
      console.log(v);
      setRoom(v);
   };

   const makeGuess = () => {
      setShow(false);
      const guessString = `I think it was ${character} in the ${room} with the ${weapon}!`;
      alert(guessString);
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
               fontSize: "1.5em",
               fontFamily: "Jockey One",
               boxShadow: "10px 10px 30px #111111",
            }}
            onClick={() => setShow(true)}
            disabled ={enable}
         >
            Make an Accusation
         </Button>

         <Modal
            show={show}
            size="xl"
            onHide={() => setShow(false)}
            aria-labelledby="contained-modal-title-vcenter"
         >
            <Modal.Header closeButton>
               <Modal.Title>
                  <h2>Make an Accusation</h2>
                  <p>Choose a weapon, suspect, and room.</p>
               </Modal.Title>
            </Modal.Header>
            <Modal.Body
               className="grid-example"
               style={{ backgroundColor: "#444444" }}
            >
               <Container>
                  <Row>
                     <Col>
                        <GuessSection
                           title="Weapon"
                           items={weapons}
                           stateFunction={addWeapon}
                        />
                     </Col>
                     <Col>
                        <GuessSection
                           title="Suspect"
                           items={characters}
                           stateFunction={addSuspect}
                        />
                     </Col>
                     <Col>
                        <GuessSection
                           title="Room"
                           items={rooms}
                           stateFunction={addRoom}
                        />
                     </Col>
                  </Row>
               </Container>
            </Modal.Body>
            <Modal.Footer>
               <Button
                  variant="primary"
                  disabled={!submitEnabled}
                  onClick={makeGuess}
               >
                  Make an Accusation
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default AccusationButton;
