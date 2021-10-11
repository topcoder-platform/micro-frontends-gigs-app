import { getAuthUserTokens } from "@topcoder/micro-frontends-navbar-app";
import { REFERRAL_API_URL } from "constants/urls";

/**
 * Fetches referral data using properties from user profile object.
 *
 * @param {Object} profile profile object
 * @returns {Promise}
 */
export const fetchReferralData = async ({
  email,
  firstName,
  lastName,
  handle,
}) => {
  const token = await getAuthUserTokens();
  return fetch(
    `${REFERRAL_API_URL}/growsurf/participants?participantId=${email}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.tokenV3}`,
      },
      body: JSON.stringify({ email, firstName, lastName, tcHandle: handle }),
    }
  ).then((response) => {
    if (response.status >= 300) {
      throw new Error("Failed to fetch referral data");
    }
    return response.json();
  });
};
