/**
 * Functions that return portions of gigs' redux state slice.
 */

export const getGigPromos = (state) => state.gigs.gigPromos;

export const getGigPromosError = (state) => state.gigs.gigPromosError;

export const getGigs = (state) => state.gigs.gigs;

export const getGigsError = (state) => state.gigs.gigsError;

export const getHasInitialData = (state) =>
  !!state.gigs.gigPromos && !!state.gigs.skillsByCode;

export const getHasGigs = (state) => !!state.gigs.gigs?.length;

export const getIsLoadingPage = (state) =>
  !!state.gigs.abortController ||
  !state.gigs.gigPromos ||
  !state.gigs.skillsByCode;

export const getFilters = (state) => state.gigs.filters;

export const getLocation = (state) => state.gigs.filters.location;

export const getName = (state) => state.gigs.filters.name;

export const getPageNumber = (state) => state.gigs.pagination.pageNumber;

export const getPageSize = (state) => state.gigs.pagination.pageSize;

export const getPagination = (state) => state.gigs.pagination;

export const getSkillsAll = (state) => state.gigs.skillsAll;

export const getSorting = (state) => state.gigs.sorting;

export const getStateSlice = (state) => state.gigs;

export const getValues = (state) => state.gigs.values;
