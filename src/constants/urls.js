export const PROXY_API_BASE_URL =
  process.env.PROXY_API + process.env.API_BASE_PATH;
export const GIG_DETAILS_API_URL = `${PROXY_API_BASE_URL}/job`;

export const RECRUIT_API_URL = `${process.env.URL.BASE}/api/recruit/jobs`;
export const TC_GIGS_URL = `${process.env.URL.BASE}/gigs`;

export const REFERRAL_API_URL = `${process.env.URL.COMMUNITY_APP}/api`;
export const REFERRAL_PROGRAM_URL = `${process.env.URL.BASE}/community/gig-referral`;

export const CHALLENGE_LIST_URL =
  process.env.URL.PLATFORM_WEBSITE_URL + process.env.CHALLENGE_LIST_PATH;
export const GIG_LIST_URL =
  process.env.URL.PLATFORM_WEBSITE_URL + process.env.GIG_LIST_PATH;

export const PROFILE_URL = `${process.env.URL.BASE}/settings/profile`;
export const GIGS_FORUM_URL = `${process.env.URL.DISCUSSIONS}/categories/gig-work-discusssions`;

export const LINKEDIN_URL =
  "https://www.linkedin.com/sharing/share-offsite/?url=";
export const FACEBOOK_URL =
  "https://www.facebook.com/sharer/sharer.php?src=share_button&u=";
export const TWITTER_URL = "https://twitter.com/intent/tweet?url=";

export const RECRUIT_CRM_GDPR_URL = "https://recruitcrm.io/gdpr";
export const RECRUIT_CRM_PRIVACY_POLICY_URL = "https://recruitcrm.io/privacy";
export const RECRUIT_CRM_URL = "https://recruitcrm.io";
export const TOPCODER_PRIVACY_POLICY_URL =
  "http://www.topcoder.com/policy/privacy-policy";
