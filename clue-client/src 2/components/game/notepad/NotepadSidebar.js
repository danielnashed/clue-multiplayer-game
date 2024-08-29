import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import NotepadSandbox from "./NotepadSandbox";

const NotepadSidebar = (props) => {
   return (
      <div
         style={{
            width: "21vw",
            height: "97Vh",
            backgroundColor: "#222222",
            borderRadius: "2em",
            margin: ".5em",
            marginRight: "0%",
            marginLeft: "2%",
            float: "left",
            fontFamily: "Jockey One",
            boxShadow: "10px 10px 30px #111111"

         }}
      >
        <NotepadSandbox/>
      </div>
   );
};

export default NotepadSidebar;
