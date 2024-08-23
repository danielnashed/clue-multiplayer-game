import axios from "axios";
const API_URL_BASE = "http://localhost:8000/api/users/";

const joinGame = async (joinCode) => {
   var urlToCall = `${API_URL_BASE}`;
   console.log(urlToCall);
   const response = await axios({
      method: "post",
      url: urlToCall,
      data: {
         join_code: joinCode,
      },
   });
   
   window.localStorage.setItem("sessionId", response.data.session_id);
   window.localStorage.setItem("externalGameId", response.data.game_id);

};

const moveCharacter = async(id, roomID, hallwayID, charID) =>{

   var urlToCall = `${API_URL_BASE}${id}/character/${charID}/`;
   console.log(urlToCall);


   const data = roomID != null ? {"room_id":roomID} : {"hallway_id":hallwayID}

   await axios.put(urlToCall, data)
      .then(response => {
         console.log(response);
      })
      .catch(error =>{
         console.log(error);
         console.log(urlToCall);
         console.log(data);
      })
   
};

const userService = {
   joinGame,
   moveCharacter,
};

export default userService;
