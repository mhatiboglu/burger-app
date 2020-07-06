import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-f1e27.firebaseio.com/",
});

export default instance;
