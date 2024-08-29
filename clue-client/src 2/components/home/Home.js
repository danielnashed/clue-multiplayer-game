import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
   Button,
   Card,
   Form,
   Modal,
   Container,
   Row,
   Col,
} from "react-bootstrap";
import JoinForm from "./joinGame/JoinGame";
import CreateForm from "./createGame/CreateForm";

const Home = () => {
   return (
      <>
         <div
            style={{
               backgroundColor: "#222222",
               width: "auto",
               height: "38vh",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               verticalAlign: "top",
               borderRadius: "5vw",
               marginTop: "7vh",
               marginLeft: "5%",
               marginRight: "5%",
               boxShadow: "10px 10px 30px #11111"

            }}
         >
            <img src="/title-logo.png" style={{ width: "70%" }}></img>
         </div>
         <br />
         <br />
         <Row
            style={{
               fontFamily: "Jockey One",
               textAlign: "center",
            }}
         >
            <Col xs={12} md={6}>
               <JoinForm />
            </Col>
            <Col xs={12} md={6}>
               <CreateForm />
            </Col>
         </Row>
      </>
      // </div>
   );
};

export default Home;
