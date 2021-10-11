export const getIsLoadingRefId = (state) => state.user.isLoadingRefId;

export const getIsLoggedIn = (state) =>
  !state.user.isLoggingIn && !!state.user.profile;

export const getIsLoggingIn = (state) => state.user.isLoggingIn;

export const getProfile = (state) => state.user.profile;

export const getReferralId = (state) => state.user.referralId;

export const getStateSlice = (state) => state.user;
