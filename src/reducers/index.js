import { combineReducers } from "redux";
import filter from "./filter";
import gigDetails from "./gigDetails";
import gigs from "./gigs";
import lookup from "./lookup";
import myGigs from "./myGigs";
import user from "./user";

export default combineReducers({
  filter,
  gigDetails,
  gigs,
  lookup,
  myGigs,
  user,
});
