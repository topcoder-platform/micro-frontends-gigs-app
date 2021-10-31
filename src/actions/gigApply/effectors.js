import store from "store";
import applyActions from "./creators";
import * as applySelectors from "reducers/gigApply/selectors";
import * as detailsSelectors from "reducers/gigDetails/selectors";
import * as gigsSelectors from "reducers/gigs/selectors";
import * as lookupSelectors from "reducers/lookupSelectors";
import * as myGigsSelectors from "reducers/myGigsSelectors";
import lookupActions from "actions/lookup";
import * as detailsEffectors from "actions/gigDetails/effectors";
import * as applyServices from "services/gigApply";
import { composeApplication } from "utils/gigApply";

/**
 * Loads gig details and countries. Must be called after the user's profile
 * has loaded.
 */
export const loadInitialData = async (externalId) => {
  const { dispatch, getState } = store;
  const promises = [detailsEffectors.loadDetails(store, externalId)];
  let countryByCode = lookupSelectors.getCountryByCode(getState());
  if (!countryByCode) {
    promises.push(dispatch(lookupActions.getAllCountries()));
  }
  try {
    await Promise.all(promises);
  } catch (error) {
    console.error(error);
  }
  const state = getState();
  const profile = myGigsSelectors.getProfile(state);
  countryByCode = lookupSelectors.getCountryByCode(state);
  const country = countryByCode[profile.country]?.name || "";
  const skillsByName = gigsSelectors.getSkillsByName(state);
  const skillNames = profile.skill?.split(",") || [];
  const skills = [];
  for (let name of skillNames) {
    let skill = skillsByName[name];
    if (skill) {
      skills.push(skill);
    }
  }
  dispatch(applyActions.initProfileData({ country, profile, skills }));
};

export const sendApplication = async () => {
  const { dispatch, getState } = store;
  const state = getState();
  dispatch(applyActions.validateUntouched());
  const { jobExternalId } = detailsSelectors.getDetails(state);
  const formData = composeApplication(state);
  dispatch(applyActions.sendApplicationPending());
  let data = null;
  try {
    data = await applyServices.sendApplication(jobExternalId, formData);
  } catch (error) {
    dispatch(applyActions.sendApplicationError(error.toString()));
    return;
  }
  dispatch(applyActions.sendApplicationSuccess(data));
};
