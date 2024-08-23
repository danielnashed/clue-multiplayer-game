import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";


//IMPORT OTHER COMPONENTS
import GuessItem from "../ActionSidebar/actions/guessing/GuessItem";
import NotepadItem from "./NotepadItem";

const NotepadSection = (props) => {
   const items = props.items;
   const title = props.title;

   return (
      <div 
         style={{
            //height: "33%",
            margin: "5% 5%",
            color: "white",
         }}
      >
         <h3>{title}</h3>

         <div
            style={{
               marginLeft: "5%",
               marginTop: "2%",
               height: "80%",
               width: "95%",
               display: "flex",
               flexWrap: "wrap",
               backgroundColor: "#707070",
               borderRadius: "15px",
               boxShadow: "10px 10px 30px #111111"
            }}
         >
            {items.map((item) => (
               <NotepadItem name={item.name} image={item.image_resource} />
            ))}
         </div>
      </div>
   );
};

export default NotepadSection;
