import * as API_SORT_BY from "./apiSortBy";
import * as LOCATION from "./location";
import * as SORT_BY from "./sortBy";
import * as SORT_ORDER from "./sortOrder";

export { LOCATION, SORT_BY, SORT_ORDER };

const API_HOST = process.env.API_HOST || "http://localhost:9000";
export const GIGS_API_URL = `${API_HOST}/gigs`;
export const SKILLS_API_URL = `${API_HOST}/skills`;

export const LOCATION_LABELS = {
  [LOCATION.ANY_ASIAN_COUNTRY]: "Any Asian Country",
  [LOCATION.ANY_LOCATION]: "Anywhere",
  [LOCATION.INDIA_PREFERRED]: "Any Location - India preferred",
  [LOCATION.INDIA_ONLY]: "India Only",
};

export const PAGE_SIZES = [10, 20, 50, 100];

export const PAYMENT_MAX_VALUE = 1e5;

export const SORT_BY_DEFAULT = SORT_BY.DATE_ADDED;
export const SORT_ORDER_DEFAULT = SORT_ORDER.ASC;

export const SORT_BY_TO_API = {
  [SORT_BY.DATE_ADDED]: API_SORT_BY.DATE_ADDED,
  [SORT_BY.DATE_UPDATED]: API_SORT_BY.DATE_UPDATED,
};

// maps state keys to API query parameters
export const STATE_KEY_TO_API = {
  location: "location",
  name: "name",
  pageNumber: "_page",
  pageSize: "_limit",
  paymentMax: "paymentMax",
  paymentMin: "paymentMin",
  sortBy: "_sort",
  sortOrder: "_order",
};

// maps state keys to URL parameter names in search query
export const URL_QUERY_PARAMS_MAP = new Map([
  ["name", "name"],
  ["skills", "skills"],
  ["location", "location"],
  ["paymentMin", "pay_min"],
  ["paymentMax", "pay_max"],
  ["sortBy", "by"],
  ["sortOrder", "order"],
  ["pageSize", "perpage"],
  ["pageNumber", "page"],
]);
