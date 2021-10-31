import { createActions } from "redux-actions";
import * as ACTION_TYPE from "./types";

const actions = createActions(
  {},
  ACTION_TYPE.INIT_PROFILE_DATA,
  ACTION_TYPE.RESET_APPLICATION,
  ACTION_TYPE.RESET_FORM,
  ACTION_TYPE.SEND_APPLICATION_ERROR,
  ACTION_TYPE.SEND_APPLICATION_PENDING,
  ACTION_TYPE.SEND_APPLICATION_SUCCESS,
  ACTION_TYPE.SET_AGREED_DURATION,
  ACTION_TYPE.SET_AGREED_TERMS,
  ACTION_TYPE.SET_AGREED_TIMEZONE,
  ACTION_TYPE.SET_CITY,
  ACTION_TYPE.SET_COUNTRY,
  ACTION_TYPE.SET_PAYMENT,
  ACTION_TYPE.SET_PHONE,
  ACTION_TYPE.SET_REFERRAL,
  ACTION_TYPE.SET_RESUME,
  ACTION_TYPE.SET_SKILLS,
  ACTION_TYPE.TOUCH_AGREED_DURATION,
  ACTION_TYPE.TOUCH_AGREED_TERMS,
  ACTION_TYPE.TOUCH_AGREED_TIMEZONE,
  ACTION_TYPE.TOUCH_CITY,
  ACTION_TYPE.TOUCH_PAYMENT,
  ACTION_TYPE.TOUCH_PHONE,
  ACTION_TYPE.TOUCH_RESUME,
  ACTION_TYPE.TOUCH_SKILLS,
  ACTION_TYPE.VALIDATE_CITY,
  ACTION_TYPE.VALIDATE_COUNTRY,
  ACTION_TYPE.VALIDATE_PAYMENT,
  ACTION_TYPE.VALIDATE_PHONE,
  ACTION_TYPE.VALIDATE_RESUME,
  ACTION_TYPE.VALIDATE_SKILLS,
  ACTION_TYPE.VALIDATE_UNTOUCHED,
  { prefix: "GIG-APPLY", namespace: "--" }
);

export default actions;
