import logo from "./logo.svg";
// import './App.css'
import {
   BrowserRouter as Router,
   Routes,
   Route,
   Switch,
   useParams,
} from "react-router-dom";
import { Container } from "react-bootstrap";

import GameSession from "./components/game/GameSession";
import Home from "./components/home/Home";
import CharacterSelectModal from "./components/home/characterSelect/CharacterSelectModal";
import CharacterSelectWrapper from "./components/home/characterSelect/CharacterSelectWrapper";
import GameControlSandbox from "./components/game/GameControlSandbox";

function App() {
   return (
      <>
         <Router>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/game/:id" element={<GameSession />} />
               <Route path="/characterSelect" element={<CharacterSelectModal />} />
               <Route path = "/characterSelectWrapper" element={<CharacterSelectWrapper />} />
               <Route
                  path="/gamecontrolsandbox"
                  element={<GameControlSandbox />}
               />
            </Routes>
         </Router>
      </>
   );
}

export default App;
