import { combineReducers } from "redux";
import filter from "./filter";
import lookup from "./lookup";
import myGigs from "./myGigs";

export default combineReducers({
  filter,
  lookup,
  myGigs,
});
