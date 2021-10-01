import actions from "./creators";
import * as selectors from "reducers/gigs/selectors";
import * as services from "services/gigs";
import lookupServices from "services/lookup";
import { isAbort } from "utils/fetch";
import { makeQueryFromState } from "reducers/gigs/urlQuery";
import { sortByName } from "utils/misc";
// import { SORT_BY, SORT_ORDER } from "constants/gigs";

/**
 * Loads the specified gigs' page. If page number is not provided the current
 * page number from current state is used. All relevant gigs' filters are loaded
 * from the current state to construct the request query.
 *
 * @returns {Promise}
 */
export const loadGigsPage = async ({ dispatch, getState }) => {
  const gigsState = selectors.getStateSlice(getState());
  // If there's an ongoing request we just cancel it since the data that comes
  // with its response will not correspond to application's current state,
  // namely filters and sorting.
  gigsState.abortController?.abort();
  const { filters, sorting, pagination } = gigsState;
  const { location, paymentMax, paymentMin, skills, title } = filters;
  const { pageNumber, pageSize } = pagination;
  const { sortBy, sortOrder } = sorting;
  const [promise, abortController] = services.fetchGigs({
    location,
    pageNumber,
    pageSize,
    paymentMax,
    paymentMin,
    skills,
    sortBy,
    sortOrder,
    title,
  });
  dispatch(actions.loadPagePending(abortController));
  let gigs, pageCount, totalCount;
  try {
    const { data, pagination } = await promise;
    gigs = data;
    pageCount = pagination.pageCount;
    totalCount = pagination.totalCount;
  } catch (error) {
    // If request was cancelled by the next call to loadGigsPage
    // there's nothing more to do.
    if (!isAbort(error)) {
      dispatch(actions.loadPageError(error.message));
    }
    return;
  }
  dispatch(actions.loadPageSuccess({ gigs, pageCount, totalCount }));
};

/**
 * Loads promo (hotlist) gigs.
 *
 * @param {Object} store redux store object
 * @returns {Promise}
 */
export const loadGigPromos = async ({ dispatch }) => {
  let gigPromos;
  // const [promosPromise] = services.fetchGigs({
  //   pageNumber: 1,
  //   pageSize: 1e3,
  //   sortBy: SORT_BY.DATE_UPDATED,
  //   sortOrder: SORT_ORDER.DESC,
  // });
  try {
    // let { data } = await promosPromise;
    gigPromos = [];
  } catch (error) {
    dispatch(actions.loadPromosError(error.toString()));
    return;
  }
  dispatch(actions.loadPromosSuccess(gigPromos));
};

/**
 * Loads all gigs' skills.
 *
 * @param {Object} store redux store
 * @returns {Promise}
 */
export const loadSkills = async ({ dispatch }) => {
  const pageSize = 1e3;
  let skills = null;
  try {
    const response = await lookupServices.getPaginatedSkills(1, pageSize);
    const totalPages = +response.meta?.totalPages || 0;
    const promises = [Promise.resolve(response)];
    for (let p = 2; p <= totalPages; p++) {
      promises.push(lookupServices.getPaginatedSkills(p, pageSize));
    }
    skills = (await Promise.all(promises)).flat().sort(sortByName);
  } catch (error) {
    dispatch(actions.loadSkillsError(error.toString()));
    console.error(error);
    return;
  }
  dispatch(actions.loadSkillsSuccess(skills));
};

/**
 * Updates state from current query (which may be empty) and then updates
 * URL query by replacing URL in history.
 *
 * @param {Object} store redux store object
 */
export const updateStateAndQuery = ({ dispatch, getState }) => {
  dispatch(actions.updateStateFromQuery(location.search));
  const query = makeQueryFromState(selectors.getStateSlice(getState()));
  window.history.replaceState(null, "", `${location.pathname}?${query}`);
};

/**
 * Updates URL query from current state by pushing new URL into history.
 *
 * @param {Object} store redux store object
 */
export const updateUrlQuery = ({ getState }) => {
  const query = makeQueryFromState(selectors.getStateSlice(getState()));
  window.history.pushState(null, "", `${location.pathname}?${query}`);
};
