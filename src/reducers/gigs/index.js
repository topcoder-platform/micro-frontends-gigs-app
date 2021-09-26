import { handleActions } from "redux-actions";
import * as ACTION_TYPE from "actions/gigs/types";
import { LOCATION, SORT_BY_DEFAULT, SORT_ORDER_DEFAULT } from "constants/gigs";
import { updateStateFromQuery } from "./urlQuery";
import { integerFormatter } from "utils/gigs/formatting";

const abortControllerDummy = { abort() {} };

const initPagination = () => ({
  pageCount: 0,
  pageNumber: 1,
  pageSize: 10,
  totalCount: 0,
});

const initFilters = () => ({
  location: LOCATION.ALL,
  name: "",
  paymentMax: 10000,
  paymentMin: 0,
  skills: [],
  skillsByCode: {},
});

const initSorting = () => ({
  sortBy: SORT_BY_DEFAULT,
  sortOrder: SORT_ORDER_DEFAULT,
});

const initValues = () => ({
  paymentMax: integerFormatter.format(10000),
  paymentMin: "0",
});

const initialState = {
  abortController: abortControllerDummy,
  filters: initFilters(),
  gigPromos: null,
  gigPromosError: null,
  gigs: [],
  gigsError: null,
  pagination: initPagination(),
  skillsAll: [],
  skillsByCode: null,
  skillsError: null,
  sorting: initSorting(),
  values: initValues(),
};

const onAddSkill = (state, { payload: { code } }) => {
  const filtersSkillsByCode = state.filters.skillsByCode;
  if (code in filtersSkillsByCode) {
    return state;
  }
  const skillsByCode = state.skillsByCode;
  const skill = skillsByCode[code];
  if (!skill) {
    return state;
  }
  return {
    ...state,
    filters: {
      ...state.filters,
      skills: [...state.filters.skills, skill],
      skillsByCode: { ...filtersSkillsByCode, [code]: skill },
    },
    pagination: {
      ...state.pagination,
      pageNumber: 1,
    },
  };
};

const onLoadPageError = (state, { payload: gigsError }) => ({
  ...state,
  abortController: null,
  gigsError,
});

const onLoadPagePending = (state, { payload: abortController }) => ({
  ...state,
  abortController,
  gigs: [],
  gigsError: null,
});

const onLoadPageSuccess = (
  state,
  { payload: { gigs, pageCount, totalCount } }
) => {
  const oldPagination = state.pagination;
  const pagination =
    oldPagination.totalCount !== totalCount ||
    oldPagination.pageCount !== pageCount
      ? { ...oldPagination, pageCount, totalCount }
      : oldPagination;
  return {
    ...state,
    abortController: null,
    gigs,
    pagination,
  };
};

const onLoadPromosError = (state, { payload: error }) => ({
  ...state,
  gigPromos: [],
  gigPromosError: error,
});

const onLoadPromosSuccess = (state, { payload: gigPromos }) => ({
  ...state,
  gigPromos,
});

const onLoadSkillsError = (state, { payload: skillsError }) => ({
  ...state,
  skillsByCode: {},
  skillsError,
});

const onLoadSkillsSuccess = (state, { payload: skillsAll }) => {
  const skillsByCode = {};
  for (let skill of skillsAll) {
    skillsByCode[skill.id] = skill;
  }
  return {
    ...state,
    skillsAll,
    skillsByCode,
  };
};

const onResetFilters = (state) => ({
  ...state,
  filters: initFilters(),
  pagination: {
    ...state.pagination,
    pageNumber: 1,
  },
  values: initValues(),
});

const onSetLocation = (state, { payload: location }) =>
  location === state.filters.location
    ? state
    : {
        ...state,
        filters: { ...state.filters, location },
        pagination: { ...state.pagination, pageNumber: 1 },
      };

const onSetName = (state, { payload: name }) =>
  name === state.filters.name
    ? state
    : {
        ...state,
        filters: { ...state.filters, name },
        pagination: { ...state.pagination, pageNumber: 1 },
      };

const onSetPageNumber = (state, { payload: pageNumber }) => ({
  ...state,
  pagination:
    pageNumber === state.pagination.pageNumber
      ? state.pagination
      : { ...state.pagination, pageNumber },
});

const onSetPageSize = (state, { payload: pageSize }) => ({
  ...state,
  pagination:
    pageSize === state.pagination.pageSize
      ? state.pagination
      : { ...state.pagination, pageNumber: 1, pageSize },
});

const onSetPaymentMax = (state, { payload: paymentMax }) =>
  paymentMax === state.filters.paymentMax
    ? state
    : {
        ...state,
        filters: { ...state.filters, paymentMax },
        pagination: { ...state.pagination, pageNumber: 1 },
      };

const onSetPaymentMin = (state, { payload: paymentMin }) =>
  paymentMin === state.filters.paymentMin
    ? state
    : {
        ...state,
        filters: { ...state.filters, paymentMin },
        pagination: { ...state.pagination, pageNumber: 1 },
      };

const onSetPaymentMaxValue = (state, { payload: paymentMax }) => ({
  ...state,
  values: {
    ...state.values,
    paymentMax,
  },
});

const onSetPaymentMinValue = (state, { payload: paymentMin }) => ({
  ...state,
  values: {
    ...state.values,
    paymentMin,
  },
});

const onSetSkills = (state, { payload: skills }) => {
  const skillsByCode = {};
  for (let skill of skills) {
    skillsByCode[skill.id] = skill;
  }
  return {
    ...state,
    filters: {
      ...state.filters,
      skills,
      skillsByCode,
    },
    pagination: {
      ...state.pagination,
      pageNumber: 1,
    },
  };
};

const onSetSorting = (
  state,
  { payload: { sortBy = SORT_BY_DEFAULT, sortOrder = SORT_ORDER_DEFAULT } }
) => ({
  ...state,
  pagination: {
    ...state.pagination,
    pageNumber: 1,
  },
  sorting: {
    sortBy,
    sortOrder,
  },
});

const onUpdateStateFromQuery = (state, { payload: query }) =>
  updateStateFromQuery(state, query);

export default handleActions(
  {
    [ACTION_TYPE.ADD_SKILL]: onAddSkill,
    [ACTION_TYPE.LOAD_PAGE_ERROR]: onLoadPageError,
    [ACTION_TYPE.LOAD_PAGE_PENDING]: onLoadPagePending,
    [ACTION_TYPE.LOAD_PAGE_SUCCESS]: onLoadPageSuccess,
    [ACTION_TYPE.LOAD_PROMOS_ERROR]: onLoadPromosError,
    [ACTION_TYPE.LOAD_PROMOS_SUCCESS]: onLoadPromosSuccess,
    [ACTION_TYPE.LOAD_SKILLS_ERROR]: onLoadSkillsError,
    [ACTION_TYPE.LOAD_SKILLS_SUCCESS]: onLoadSkillsSuccess,
    [ACTION_TYPE.RESET_FILTERS]: onResetFilters,
    [ACTION_TYPE.SET_LOCATION]: onSetLocation,
    [ACTION_TYPE.SET_NAME]: onSetName,
    [ACTION_TYPE.SET_PAGE_NUMBER]: onSetPageNumber,
    [ACTION_TYPE.SET_PAGE_SIZE]: onSetPageSize,
    [ACTION_TYPE.SET_PAYMENT_MAX]: onSetPaymentMax,
    [ACTION_TYPE.SET_PAYMENT_MAX_VALUE]: onSetPaymentMaxValue,
    [ACTION_TYPE.SET_PAYMENT_MIN]: onSetPaymentMin,
    [ACTION_TYPE.SET_PAYMENT_MIN_VALUE]: onSetPaymentMinValue,
    [ACTION_TYPE.SET_SKILLS]: onSetSkills,
    [ACTION_TYPE.SET_SORTING]: onSetSorting,
    [ACTION_TYPE.UPDATE_STATE_FROM_QUERY]: onUpdateStateFromQuery,
  },
  initialState,
  { prefix: "GIGS", namespace: "--" }
);
