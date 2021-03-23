import { combineReducers} from "redux";
import authen from "./reducerAuthentification";
import message from "./reducerMessage";

export default combineReducers({authen,message});