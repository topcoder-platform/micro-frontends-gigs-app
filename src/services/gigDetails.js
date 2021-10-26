import { GIG_DETAILS_API_URL } from "constants/urls";

/**
 * Fetches gig details using external id.
 *
 * @param {string} externalId gig external id
 * @param {AbortController} [controller] fetch AbortController object
 * @returns {[Promise, AbortController]}
 */
export const fetchGig = (externalId, tokenV3, controller) => {
  if (!controller) {
    controller = new AbortController();
  }

  const headers = {};
  if (tokenV3) {
    headers.Authorization = `Bearer ${tokenV3}`;
  }

  const promise = fetch(`${GIG_DETAILS_API_URL}?externalId=${externalId}`, {
    headers,
    signal: controller.signal,
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error("Failed to fetch gig details");
    }
    return response.json();
  });

  return [promise, controller];
};
