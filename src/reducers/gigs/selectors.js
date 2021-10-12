import { filterString, filterElement, filterRange } from "utils/gigs/misc";
import { convertNumberStringToNumber } from "utils/gigs/formatting";
/**
 * Functions that return portions of gigs' redux state slice.
 */

const clientSideFilters = (state, slice) => {
  let gigsRes = state.gigs[slice];
  if (state.gigs.filters.title !== "") {
    gigsRes = filterString(gigsRes, "title", state.gigs.filters.title);
  }
  if (state.gigs.filters.location !== "All") {
    gigsRes = filterString(gigsRes, "jobLocation", state.gigs.filters.location);
  }
  if (state.gigs.filters.skills.length > 0) {
    gigsRes = filterElement(gigsRes, "skills", state.gigs.filters.skills);
  }
  const { paymentMax, paymentMin } = state.gigs.values;
  gigsRes = filterRange(
    gigsRes,
    "min",
    "max",
    convertNumberStringToNumber(paymentMin),
    convertNumberStringToNumber(paymentMax)
  );
  return gigsRes;
};

export const getGigs = (state) => state.gigs.gigs;

export const getGigsError = (state) => state.gigs.gigsError;

export const getGigsFeatured = (state) => {
  return clientSideFilters(state, "gigsFeatured");
};

export const getGigsHot = (state) => {
  return clientSideFilters(state, "gigsHot");
};

export const getGigsSpecial = (state) => state.gigs.gigsSpecial;

export const getGigsSpecialError = (state) => state.gigs.gigsSpecialError;

export const getHasGigs = (state) =>
  !!state.gigs.gigs?.length ||
  !!state.gigs.gigsFeatured?.length ||
  !!state.gigs.gigsHot?.length;

export const getHasInitialData = (state) =>
  !!state.gigs.gigsSpecial && !!state.gigs.skillsById;

export const getIsLoadingPage = (state) =>
  !!state.gigs.abortController ||
  !state.gigs.gigsSpecial ||
  !state.gigs.skillsById;

export const getFilters = (state) => state.gigs.filters;

export const getLocation = (state) => state.gigs.filters.location;

export const getLocations = (state) => state.gigs.locations;

export const getPageNumber = (state) => state.gigs.pagination.pageNumber;

export const getPageSize = (state) => state.gigs.pagination.pageSize;

export const getPagination = (state) => state.gigs.pagination;

export const getSkillsAll = (state) => state.gigs.skillsAll;

export const getSorting = (state) => state.gigs.sorting;

export const getStateSlice = (state) => state.gigs;

export const getTitle = (state) => state.gigs.filters.title;

export const getValues = (state) => state.gigs.values;
