import { handleActions } from "redux-actions";
import * as ACTION_TYPE from "actions/gigDetails/types";
import { LOCATION } from "constants/gigs";

const abortControllerDummy = { abort() {} };

const initState = () => ({
  abortController: abortControllerDummy,
  details: null,
  detailsError: null,
  skillsError: null,
});

const initialState = initState();

const onLoadDetailsError = (state, { payload: detailsError }) => ({
  ...state,
  abortController: null,
  detailsError,
});

const onLoadDetailsPending = (state, { payload: abortController }) => ({
  ...state,
  abortController,
});

const onLoadDetailsSuccess = (state, { payload: details }) => {
  if (!details.location) {
    details.location = LOCATION.ANYWHERE;
  }
  return {
    ...state,
    abortController: null,
    details,
  };
};

const onResetDetails = () => initState();

export default handleActions(
  {
    [ACTION_TYPE.LOAD_DETAILS_ERROR]: onLoadDetailsError,
    [ACTION_TYPE.LOAD_DETAILS_PENDING]: onLoadDetailsPending,
    [ACTION_TYPE.LOAD_DETAILS_SUCCESS]: onLoadDetailsSuccess,
    [ACTION_TYPE.RESET_DETAILS]: onResetDetails,
  },
  initialState,
  { prefix: "GIG-DETAILS", namespace: "--" }
);
