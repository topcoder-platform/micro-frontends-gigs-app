import cookies from "browser-cookies";
import { makeGigReferralUrl } from "./url";

/**
 * Creates an object that can be used to send referral email.
 *
 * @param {Object} params
 * @param {string} params.email recipient's email address
 * @param {Object} params.profile profile object
 * @param {string} params.externalId gig external id
 * @param {string} params.referralId user's referral id
 * @returns {Object}
 */
export const composeReferralEmail = ({
  email,
  profile,
  externalId,
  referralId,
}) => ({
  personalizations: [
    {
      to: [{ email }],
      subject: `${profile.firstName} ${profile.lastName} Thinks This Topcoder Gig Is For You!`,
    },
  ],
  from: {
    email: "noreply@topcoder.com",
    name: `${profile.firstName} ${profile.lastName} via Topcoder Gigwork`,
  },
  content: [
    {
      type: "text/plain",
      value: `Hey there!

Topcoder has a freelance gig that I thought you would be interested in. If you get the gig, I could earn cash!

Check it out:
${makeGigReferralUrl(externalId, referralId)}`,
    },
  ],
});

/**
 * Sets the cookie with referral id.
 */
export const setReferralCookie = () => {
  const params = new URLSearchParams(location.search);
  const referralId = params.get("referralId");
  if (referralId) {
    cookies.set(
      process.env.GROWSURF_COOKIE,
      JSON.stringify({ referralId }),
      process.env.GROWSURF_COOKIE_SETTINGS
    );
  }
};

/**
 * Clear the cookie
 */
export const clearReferralCookie = () => {
  cookies.set(process.env.GROWSURF_COOKIE, "", {
    maxAge: 0,
    overwrite: true,
  });
};

/**
 * Set applied cookie
 */
export const setAppliedCookie = (externalId) => {
  let ids = cookies.get(process.env.APPLIED_GIGS_COOKIE) || "";
  ids = ids.split(",");
  let index = ids.indexOf(externalId);
  // Already cached the gig ID
  if (index >= 0) return;
  ids += (ids === "" ? "" : ",") + `${externalId}`;
  cookies.set(process.env.APPLIED_GIGS_COOKIE, ids);
};

/**
 * Remove cached gig Id from cookie
 */
export const removeAppliedCookie = (externalId) => {
  let ids = cookies.get(process.env.APPLIED_GIGS_COOKIE) || "";
  ids = ids.split(",");
  let index = ids.indexOf(externalId);
  // the gig ID doesn't exist in local cache
  if (index < 0) return;
  ids.splice(index, 1);
  cookies.set(process.env.APPLIED_GIGS_COOKIE, ids.join(","));
};

/**
 * Get applied Cookie
 */
export const getAppliedCookie = () => {
  return cookies.get(process.env.APPLIED_GIGS_COOKIE) || "";
};
