import { combineReducers } from "redux";
import filter from "./filter";
import gigs from "./gigs";
import lookup from "./lookup";
import myGigs from "./myGigs";

export default combineReducers({
  filter,
  gigs,
  lookup,
  myGigs,
});
