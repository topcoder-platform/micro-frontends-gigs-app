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
