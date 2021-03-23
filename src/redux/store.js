import { createStore, applyMiddleware } from "redux";
import reducers from "./reducer";
import thunk from "redux-thunk";
const middleware = [thunk];
export default createStore(reducers,applyMiddleware(...middleware));