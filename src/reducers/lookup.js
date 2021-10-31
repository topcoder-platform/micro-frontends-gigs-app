import { handleActions } from "redux-actions";
import * as constants from "../constants";
import _ from "lodash";

const defaultState = {
  countries: [],
  countriesError: null,
  countriesIsLoading: true,
  countryByCode: null,
  countryOptions: [],
  gigsStatuses: _.values(constants.GIGS_FILTER_STATUSES),
};

function onGetAllCountriesInit(state) {
  return { ...state, countriesError: null, countriesIsLoading: true };
}

function onGetAllCountriesDone(state, { payload: countries }) {
  const countryByCode = {};
  const countryOptions = [];
  for (let country of countries) {
    countryByCode[country.countryCode] = country;
    countryOptions.push({ label: country.name, value: country.name });
  }
  return {
    ...state,
    countries,
    countriesIsLoading: false,
    countryByCode,
    countryOptions,
  };
}

function onGetAllCountriesFailure(state, { payload: countriesError }) {
  return { ...state, countriesError, countriesIsLoading: false };
}

export default handleActions(
  {
    GET_ALL_COUNTRIES_INIT: onGetAllCountriesInit,
    GET_ALL_COUNTRIES_DONE: onGetAllCountriesDone,
    GET_ALL_COUNTRIES_FAILURE: onGetAllCountriesFailure,
  },
  defaultState
);
