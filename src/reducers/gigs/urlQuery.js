import {
  LOCATION,
  PAGE_SIZES,
  SORT_BY,
  SORT_BY_DEFAULT,
  SORT_ORDER,
  SORT_ORDER_DEFAULT,
  URL_QUERY_PARAMS_MAP,
} from "constants/gigs";
import { integerFormatter } from "utils/gigs/formatting";

/**
 * Creates a URL search query from current state.
 *
 * @param {Object} state working periods' newly created state slice
 * @returns {Object}
 */
export function makeQueryFromState(state) {
  const { filters, pagination, sorting } = state;
  const { location, name, paymentMax, paymentMin, skills } = filters;
  const { pageNumber, pageSize } = pagination;
  const { sortBy, sortOrder } = sorting;
  const skillCodes = [];
  for (let skill of skills) {
    skillCodes.push(skill.code);
  }
  const params = {
    location: location.toLowerCase(),
    name: encodeURIComponent(name),
    paymentMax: paymentMax + "",
    paymentMin: paymentMin + "",
    pageNumber,
    pageSize,
    skills: skillCodes.join(","),
    sortBy: sortBy.toLowerCase(),
    sortOrder,
  };
  const queryParams = [];
  for (let [stateKey, queryKey] of URL_QUERY_PARAMS_MAP) {
    let value = params[stateKey];
    if (value) {
      queryParams.push(`${queryKey}=${value}`);
    }
  }
  return queryParams.join("&");
}

/**
 * Updates state from the provided URL's search query.
 *
 * @param {Object} state working periods' state slice
 * @param {string} queryStr search query string
 * @returns {Object} state object
 */
export function updateStateFromQuery(state, queryStr) {
  if (!queryStr || queryStr === "?") {
    return state;
  }
  const params = {};
  const query = new URLSearchParams(queryStr);
  for (let [stateKey, queryKey] of URL_QUERY_PARAMS_MAP) {
    let value = query.get(queryKey);
    if (value) {
      params[stateKey] = value;
    }
  }
  let updateFilters = false;
  let updatePagination = false;
  let updateSorting = false;
  let updateValues = false;
  const { filters, pagination, skillsByCode, sorting, values } = state;

  // checking skills
  let hasSameSkills = true;
  const filtersSkills = filters.skills;
  const filtersSkillsByCode = filters.skillsByCode;
  const querySkills = [];
  const querySkillsByCode = {};
  const skillsStr = params.skills;
  if (skillsStr) {
    // checking if all skills from query are present in current filters' skills
    for (let skillCode of skillsStr.split(",")) {
      let skill = skillsByCode[skillCode];
      if (skill) {
        querySkills.push(skill);
        querySkillsByCode[skill.code] = skill;
        if (!(skillCode in filtersSkillsByCode)) {
          hasSameSkills = false;
        }
      }
    }
  }
  // it may happen that all skills in query are present in filters' skills
  // but there may be more filters' skills than query's skills
  if (querySkills.length !== filtersSkills.length) {
    hasSameSkills = false;
  }
  if (!hasSameSkills) {
    filters.skills = querySkills;
    filters.skillsByCode = querySkillsByCode;
    updateFilters = true;
  }

  // checking maximum payment
  const paymentMax = parseFloat(params.paymentMax);
  if (!isNaN(paymentMax) && paymentMax !== filters.paymentMax) {
    filters.paymentMax = paymentMax;
    values.paymentMax = integerFormatter.format(paymentMax);
    updateFilters = true;
    updateValues = true;
  }
  // checking minimum payment
  const paymentMin = parseFloat(params.paymentMin);
  if (!isNaN(paymentMin) && paymentMin !== filters.paymentMin) {
    filters.paymentMin = paymentMin;
    values.paymentMin = integerFormatter.format(paymentMin);
    updateFilters = true;
    updateValues = true;
  }

  // chacking location
  let location = params.location?.toUpperCase();
  location = location in LOCATION ? location : LOCATION.ALL;
  if (location !== filters.location) {
    filters.location = location;
    updateFilters = true;
  }
  // checking gig name
  const gigName = params.name?.slice(0, 256) || "";
  if (gigName !== filters.name) {
    filters.name = gigName;
    updateFilters = true;
  }

  // checking sorting criteria
  let sortBy = params.sortBy?.toUpperCase();
  sortBy = sortBy in SORT_BY ? sortBy : SORT_BY_DEFAULT;
  if (sortBy !== sorting.sortBy) {
    sorting.sortBy = sortBy;
    updateSorting = true;
  }
  // checking sorting order
  let sortOrder = params.sortOrder;
  sortOrder =
    sortOrder && sortOrder.toUpperCase() in SORT_ORDER
      ? sortOrder
      : SORT_ORDER_DEFAULT;
  if (sortOrder !== sorting.sortOrder) {
    sorting.sortOrder = sortOrder;
    updateSorting = true;
  }

  // checking page number
  const pageNumber = +params.pageNumber;
  if (pageNumber && pageNumber !== pagination.pageNumber) {
    pagination.pageNumber = pageNumber;
    updatePagination = true;
  }
  // checking page size
  const pageSize = +params.pageSize;
  if (PAGE_SIZES.includes(pageSize) && pageSize !== pagination.pageSize) {
    pagination.pageSize = pageSize;
    updatePagination = true;
  }
  if (updateFilters || updatePagination || updateSorting || updateValues) {
    state = { ...state };
    if (updateFilters) {
      state.filters = { ...filters };
    }
    if (updatePagination) {
      state.pagination = { ...pagination };
    }
    if (updateSorting) {
      state.sorting = { ...sorting };
    }
    if (updateValues) {
      state.values = { ...values };
    }
  }
  return state;
}
