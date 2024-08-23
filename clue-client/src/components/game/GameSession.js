import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

import GameControlSandbox from "./GameControlSandbox";

const GameSession = () => {
   var { id } = useParams();
   console.log(id);

   return (
      <>
         <GameControlSandbox
         
         id={id}/>
      </>
   );
};

export default GameSession;
