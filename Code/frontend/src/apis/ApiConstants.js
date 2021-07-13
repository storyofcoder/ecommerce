import axios from "axios";
import config from "../constants/config";

const initialStateSchema = {
  authToken: ""
};

let initialState = initialStateSchema;

const stateLocal = localStorage.getItem("authToken");
if (stateLocal && stateLocal !== undefined) {
  try {
    initialState.authToken = stateLocal;
  } catch (e) {
    initialState = initialStateSchema;
  }
}

axios.defaults.headers.common.Authorization = initialState.authToken;

const instance = axios.create({
  baseURL: config.accountsUrl,
  headers: {
    "Content-Type": "application/json"
  }
});

export default instance;
