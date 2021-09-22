import { GIGS_API_URL, SKILLS_API_URL } from "constants/gigs";
import { convertToApiQuery } from "utils/gigs/api";

/**
 * Fetches gigs from API.
 *
 * @param {Object} params
 * @param {AbortController} [controller]
 * @returns {[Promise, AbortController]}
 */
export const fetchGigs = (params, controller) => {
  let totalCount = 0;
  const { pageNumber = 1, pageSize = 1000 } = params;
  if (!controller) {
    controller = new AbortController();
  }
  const promise = fetch(`${GIGS_API_URL}?${convertToApiQuery(params)}`, {
    signal: controller.signal,
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("Failed to fetch gigs.");
      }
      totalCount = +response.headers.get("X-Total-Count") || 0;
      return response.json();
    })
    .then((data) => {
      return {
        data,
        pagination: {
          pageCount: Math.ceil(totalCount / pageSize),
          pageNumber,
          pageSize,
          totalCount,
        },
      };
    });
  return [promise, controller];
};

/**
 * Fetches skills from API.
 *
 * @returns {Promise}
 */
export const fetchSkills = () => {
  return fetch(SKILLS_API_URL).then((response) => {
    if (response.status !== 200) {
      throw new Error("Failed to fetch skills.");
    }
    return response.json();
  });
};
