import { handleActions } from "redux-actions";
import * as ACTION_TYPE from "actions/user/types";

const initialState = {
  isLoadingRefId: true,
  isLoggingIn: true,
  profile: null,
  profileError: null,
  referralId: null,
  referralIdError: null,
};

const onGetReferralIdError = (state, { payload: referralIdError }) => ({
  ...state,
  isLoadingRefId: false,
  referralIdError,
});

const onGetReferralIdSuccess = (state, { payload: referralId }) => ({
  ...state,
  isLoadingRefId: false,
  referralId,
});

const onLoadProfileError = (state, { payload: profileError }) => ({
  ...state,
  isLoggingIn: false,
  profileError,
});

const onLoadProfilePending = (state) => ({
  ...state,
  isLoggingIn: true,
  profile: null,
});

const onLoadProfileSuccess = (state, { payload: profile }) => ({
  ...state,
  isLoggingIn: false,
  profile,
});

export default handleActions(
  {
    [ACTION_TYPE.GET_REFERRAL_ID_ERROR]: onGetReferralIdError,
    [ACTION_TYPE.GET_REFERRAL_ID_SUCCESS]: onGetReferralIdSuccess,
    [ACTION_TYPE.LOAD_PROFILE_ERROR]: onLoadProfileError,
    [ACTION_TYPE.LOAD_PROFILE_PENDING]: onLoadProfilePending,
    [ACTION_TYPE.LOAD_PROFILE_SUCCESS]: onLoadProfileSuccess,
  },
  initialState,
  { prefix: "USER", namespace: "--" }
);
