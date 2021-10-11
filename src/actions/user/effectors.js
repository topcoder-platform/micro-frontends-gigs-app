import { getAuthUserProfile } from "@topcoder/micro-frontends-navbar-app";
import actions from "./creators";
import * as selectors from "reducers/user/selectors";
import { fetchReferralData } from "services/referral";
import { delay } from "utils/misc";

/**
 * Loads referral id.
 *
 * @param {Object} store redux store object
 * @returns {Promise}
 */
export const getReferralId = async ({ dispatch, getState }) => {
  const profile = selectors.getProfile(getState());
  if (!profile) {
    console.error(
      "No profile data provided when trying to fetch referral data."
    );
    return;
  }
  let data = null;
  try {
    data = await fetchReferralData(profile);
  } catch (error) {
    dispatch(actions.getReferralIdError(error.toString()));
    return;
  }
  dispatch(actions.getReferralIdSuccess(data.id));
};

/**
 * Tries to load user's profile.
 *
 * @param {Object} store redux store object
 * @returns {Promise}
 */
export const loadProfile = async ({ dispatch, getState }) => {
  let error = null;
  let profile = selectors.getProfile(getState());
  if (profile) {
    return;
  }
  dispatch(actions.loadProfilePending());
  for (let i = 0; i < 3; i++) {
    try {
      profile = await getAuthUserProfile();
    } catch (err) {
      error = err;
    }
    if (profile) {
      break;
    }
    await delay(1000);
  }
  if (error) {
    dispatch(actions.loadProfileError(error.toString()));
  } else {
    dispatch(actions.loadProfileSuccess(profile));
  }
};
