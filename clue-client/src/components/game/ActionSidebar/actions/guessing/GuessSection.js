import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import NotepadSection from "../../../notepad/NotepadSection";

//IMPORT OTHER COMPONENTS
import GuessItem from "./GuessItem";

const GuessSection = (props) => {
   const [selectedItem, setSelectedItem] = React.useState("");

   const items = props.items;
   const title = props.title;
   const stateFunction = props.stateFunction;

   useEffect(() => {
      stateFunction(selectedItem);
   }, [selectedItem]);

   const manageState = (v) => {
      if (selectedItem === v) {
         console.log(`First if chosen with ${v}`);
         setSelectedItem("");
      } else {
         if (selectedItem !== "") {
            console.log(`Second if chosen with ${v}`);
            alert(`You have already selected a ${title}!
Unselect ${selectedItem} to select a new ${title}.`);
         } else {
            console.log(`Third if chosen with ${v}`);
            setSelectedItem(v);
            console.log(selectedItem);
         }
      }
   };

   return (
      <div
         style={{
            width: "100%",
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
            }}
         >
            {items.map((item) => (
               <GuessItem
                  name={item.name}
                  image={item.image_resource}
                  stateFunction={manageState}
               />
            ))}
         </div>
      </div>
   );
};

export default GuessSection;
