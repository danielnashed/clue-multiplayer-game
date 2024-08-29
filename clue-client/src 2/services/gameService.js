import axios from "axios";
const API_URL_BASE = "http://localhost:8000/api/game/";

const postNewGame = async () => {
   var responseObject = await axios.post(API_URL_BASE);
   var responseData = responseObject.data;
   console.log(typeof responseData);
   console.log(responseObject);
   window.localStorage.setItem("sessionId", responseData.session_id);
   window.localStorage.setItem("externalGameId", responseData.id);

   return responseData;
};

const startGame = async () => {
   var urlToCall = `${API_URL_BASE}${window.localStorage.getItem(
      "externalGameId"
   )}/start_game/`;
   console.log(urlToCall);
   await axios.post(urlToCall);
};

const getWhosTurn = async (id) => {
   const idAndWhoIs = id + "/whoismove"
   var urlToCall = `${API_URL_BASE}${idAndWhoIs}/`;
   var responseObject = await axios.get(urlToCall);
   var responseData = responseObject.data;
   return responseData;
}


const getGameById = async (id) => {
   var urlToCall = `${API_URL_BASE}${id}/`;
   var responseObject = await axios.get(urlToCall);
   var responseData = responseObject.data;
   return responseData;
};



const gameService = {
   postNewGame,
   startGame,
   getGameById,
   getWhosTurn,
};

export default gameService;
