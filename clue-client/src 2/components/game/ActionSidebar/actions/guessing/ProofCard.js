import React from "react";
import { Card } from "react-bootstrap";

const ProofCard = (props) => {
   return (
      <>
         <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="/character-images/col-mustard.png" />
            <Card.Body>
               <Card.Title>Colonel Mustard</Card.Title>
               <Card.Text>
                  Make sure to cross this off on your notebook now!
               </Card.Text>
            </Card.Body>
         </Card>
      </>
   );
};

export default ProofCard;
