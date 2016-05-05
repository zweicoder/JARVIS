import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import counter from "./counter";
import cards from "./cards";

const rootReducer = combineReducers({
  counter,
  cards,
  routing
});

export default rootReducer;
