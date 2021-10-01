import * as API_SORT_BY from "./apiSortBy";
import * as LOCATION from "./location";
import * as SORT_BY from "./sortBy";
import * as SORT_ORDER from "./sortOrder";

export { LOCATION, SORT_BY, SORT_ORDER };

export const GIGS_API_URL = `${process.env.URL.PLATFORM_WEBSITE_URL}${process.env.API_BASE_PATH}/jobs`;

export const PAGE_SIZES = [10, 20, 50, 100];

export const PAYMENT_MAX_VALUE = 1e5;

export const SORT_BY_DEFAULT = SORT_BY.DATE_ADDED;
export const SORT_ORDER_DEFAULT = SORT_ORDER.ASC;

export const SORT_BY_TO_API = {
  [SORT_BY.DATE_ADDED]: API_SORT_BY.DATE_ADDED,
  [SORT_BY.DATE_UPDATED]: API_SORT_BY.DATE_UPDATED,
};

// maps state keys to URL parameter names in search query
export const URL_QUERY_PARAMS_MAP = new Map([
  ["title", "title"],
  ["location", "location"],
  ["paymentMin", "pay_min"],
  ["paymentMax", "pay_max"],
  ["sortBy", "by"],
  ["sortOrder", "order"],
  ["pageSize", "perpage"],
  ["pageNumber", "page"],
]);
