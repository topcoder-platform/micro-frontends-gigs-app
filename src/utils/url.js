import _ from "lodash";
import qs from "qs";

/**
 * Return the query string of `params`:
 * `{ p: "" }`      => ""
 * `{ p: null }`      => ""
 * `{ p: undefined }` => ""
 * `{ p: value }`     => "p=value"
 * `{ p: [] }`        => ""
 * `{ p: ['active_jobs', 'open_jobs', 'completed_jobs', 'archived_jobs'] } => "p[]=active_jobs&p[]=open_jobs&p[]=completed_jobs&p[]=archived_jobs`
 * `{ p: { Active: true, Open: true, Completed: false, Archived: false } }` => "p[Active]=true&p[Open]=true&p[Completed]=false&p[Archived]=false"
 *
 * @params {Object<{[key: string]: any}>} params Query string parameters
 * @return {String}
 */
export function buildQueryString(params) {
  params = _.omitBy(params, (p) => p == null || p === "" || p.length === 0);

  let queryString = qs.stringify(params, {
    encode: false,
    arrayFormat: "brackets",
  });
  queryString = queryString ? `?${queryString}` : queryString;

  return queryString;
}

export function parseUrlQuery(queryString) {
  return qs.parse(queryString, { ignoreQueryPrefix: true });
}

export function updateQuery(params) {
  const oldQuery = decodeURIComponent(window.location.search);
  let query = buildQueryString(params);
  query = `?${query.substring(1).split("&").sort().join("&")}`;
  if (query !== oldQuery) {
    window.history.pushState(window.history.state, "", query);
  }
}

/**
 * Creates an external URL for a gig.
 *
 * @param {string} externalId gig external id
 * @returns {string}
 */
export function makeGigExternalUrl(externalId) {
  return externalId ? `${process.env.URL.BASE}/gigs/${externalId}` : "";
}

/**
 * Creates a login URL.
 *
 * @param {string} retUrl return URL
 * @returns {string}
 */
export function makeLoginUrl(retUrl) {
  let [path, query = ""] = retUrl.split("?");
  // If query parameters are not encoded twice all parameters except the first
  // are getting lost after returning from authentication flow.
  retUrl = `${path}?${encodeURIComponent(query)}`;
  return `${process.env.URL.AUTH}?retUrl=${encodeURIComponent(retUrl)}`;
}

/**
 * Creates a referral URL.
 *
 * @param {string} referralId referral id
 * @returns {string}
 */
export function makeReferralUrl(referralId) {
  return `${process.env.URL.BASE}/gigs?referralId=${encodeURIComponent(
    referralId
  )}`;
}

/**
 * Creates a registration URl.
 *
 * @param {string} retUrl return URL
 * @returns {string}
 */
export function makeRegisterUrl(retUrl) {
  let [path, query = ""] = retUrl.split("?");
  retUrl = `${path}?${encodeURIComponent(query)}`;
  return (
    `${process.env.URL.AUTH}?retUrl=${encodeURIComponent(retUrl)}` +
    "&mode=signUp&utm_source=gig_listing"
  );
}
