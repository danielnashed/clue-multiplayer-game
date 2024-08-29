import axios from 'axios'

//const API_URL_BASE = 'https://jsonplaceholder.typicode.com/posts'
const API_URL_BASE = 'http://localhost:8000/api/'

const getAllPosts = async () => {
  var responseObject = await axios.get(`${API_URL_BASE}`)
  var responseData = responseObject.data

  return responseData
}



const individualPost = async id => {
  var responseObject = await axios.get(`${API_URL_BASE}/${id}`)

  var responseData = responseObject.data

  return responseData
}

const createPost = async postText => {

  const post = {
    title: "Foo",
    body: postText,
    userId: 1
  }

  var responseObject = await axios.post(`${API_URL_BASE}`, post)

  var responseData = responseObject.data;


  return responseData
}

//Retrieve the available characters


const getAllCharacters = async () => {
  
  
  var responseObject = await axios.get('http://localhost:8000/api/characters/')
  var responseData = responseObject.result

  //console.log(typeof responseData)
  //console.log(responseObject)

  return responseData
}

//GET /api/game/<id>/
const getLocations = async () => {
  var gameId = localStorage.getItem("externalGameId");
  var url = 'http://localhost:8000/api/game/' + gameId + '/'
  var responseObject = await axios.get(url);
  var responseData = responseObject.data
  //console.log(responseData);
  return responseData
}

//send selection of character
const sendCharSelect = async char =>{

}

const updateService = {
  getAllPosts,
  individualPost,
  createPost,
  getAllCharacters,
  getLocations
}






export default updateService
