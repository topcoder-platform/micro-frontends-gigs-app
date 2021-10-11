import { createActions } from "redux-actions";
import * as ACTION_TYPE from "./types";

const actions = createActions(
  {},
  ACTION_TYPE.GET_REFERRAL_ID_ERROR,
  ACTION_TYPE.GET_REFERRAL_ID_SUCCESS,
  ACTION_TYPE.LOAD_PROFILE_ERROR,
  ACTION_TYPE.LOAD_PROFILE_PENDING,
  ACTION_TYPE.LOAD_PROFILE_SUCCESS,
  { prefix: "USER", namespace: "--" }
);

export default actions;
