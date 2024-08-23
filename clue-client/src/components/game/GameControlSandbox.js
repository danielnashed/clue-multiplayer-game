import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import NotepadSidebar from "./notepad/NotepadSidebar";
import BoardDisplay from "./board/BoardDisplay";
import ActionSidebar from "./ActionSidebar/ActionSidebar";
import { useParams } from "react-router-dom";

const GameControlSandbox = (props) => {
   const id = props.id;

   return (
      <>
         <NotepadSidebar />
         <BoardDisplay id={id} />
         <ActionSidebar id={id} />
      </>
   );
};

export default GameControlSandbox;
