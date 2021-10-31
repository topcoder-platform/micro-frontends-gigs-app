import styles from "./styles.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingCircles from "components/LoadingCircles";
import LoginRequest from "./components/LoginRequest";
import ApplicationForm from "./components/ApplicationForm";
import * as myGigsSelectors from "reducers/myGigsSelectors";
import myGigsActions from "actions/myGigs";
import * as lookupSelectors from "reducers/lookupSelectors";
import * as detailsSelectors from "reducers/gigDetails/selectors";
import * as applyEffectors from "actions/gigApply/effectors";

const GigApplyPage = ({ externalId }) => {
  const isLoggingIn = useSelector(myGigsSelectors.getIsLoggingIn);
  const isLoggedIn = useSelector(myGigsSelectors.getIsLoggedIn);
  const isLoadingCountries = useSelector(lookupSelectors.getIsLoadingCountries);
  const isLoadingDetails = useSelector(detailsSelectors.getIsLoadingDetails);

  const dispatch = useDispatch();

  const isLoading =
    isLoggingIn || (isLoggedIn && (isLoadingDetails || isLoadingCountries));

  useEffect(() => {
    dispatch(myGigsActions.getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      applyEffectors.loadInitialData(externalId);
    }
  }, [isLoggedIn, externalId]);

  return (
    <div styleName="container">
      <div styleName="page">
        {isLoading ? (
          <LoadingCircles className={styles.loadingIndicator} />
        ) : isLoggedIn ? (
          <ApplicationForm />
        ) : (
          <LoginRequest />
        )}
      </div>
    </div>
  );
};

export default GigApplyPage;
