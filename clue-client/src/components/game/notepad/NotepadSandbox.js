import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import NotepadSection from "./NotepadSection";

//IMPORT TEST DATA
import characters from "../../../data/characters";
import weapons from "../../../data/weapons";
import rooms from "../../../data/rooms";

const NotepadSandbox = (props) => {
   return (
      <>
         <Container xs lg="3">
               <NotepadSection title="Weapons" items={weapons} />
               <NotepadSection title="Suspects" items={characters} />
               <NotepadSection title="Rooms" items={rooms} />
         </Container>
      </>
   );
};

export default NotepadSandbox;
