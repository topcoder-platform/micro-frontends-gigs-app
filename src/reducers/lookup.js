import { handleActions } from "redux-actions";
import * as constants from "../constants";
import _ from "lodash";

const defaultState = {
  countries: [],
  gigsStatuses: _.values(constants.GIGS_FILTER_STATUSES),
};

function onGetAllCountriesDone(state, { payload }) {
  return { ...state, countries: payload };
}

export default handleActions(
  {
    GET_ALL_COUNTRIES_DONE: onGetAllCountriesDone,
  },
  defaultState
);
