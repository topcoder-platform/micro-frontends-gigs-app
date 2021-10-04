import { REFERRAL_API_URL } from "constants/urls";

/**
 * Fetches referral data using properties from user profile object.
 *
 * @param {Object} profile profile object
 * @returns {Promise}
 */
export const fetchReferralData = ({ email, firstName, lastName, handle }) => {
  return fetch(
    `${REFERRAL_API_URL}/growsurf/participants?participantId=${email}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, firstName, lastName, tcHandle: handle }),
    }
  ).then((response) => {
    if (response.status >= 300) {
      throw new Error("Failed to fetch referral data");
    }
    return response.json();
  });
};
