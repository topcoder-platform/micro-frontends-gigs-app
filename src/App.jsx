/**
 * Main App component
 */
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useLocation } from "@reach/router";
import MyGigsFilter from "./containers/MyGigsFilter";
import MyGigs from "./containers/MyGigs";
import { FeedbackButton, showMenu } from "@topcoder/micro-frontends-earn-app";
import * as constants from "./constants";
import actions from "./actions";
import * as utils from "./utils";
import store from "./store";
import { initialGigFilter } from "./reducers/filter";
import _ from "lodash";

import "react-date-range/dist/theme/default.css";
import "react-date-range/dist/styles.css";
import "rc-tooltip/assets/bootstrap.css";
import "react-responsive-modal/styles.css";

import "./styles/main.scss";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const location = useLocation();
  const getDataDebounced = useRef(_.debounce((f) => f(), 500));

  useLayoutEffect(() => {
    showMenu(true);
    return () => {
      showMenu(false);
    };
  }, []);

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      setIsLoggedIn(await utils.auth.isLoggedIn());
    };
    checkIsLoggedIn();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      if (!location.search) {
        store.dispatch(actions.filter.updateGigFilter(initialGigFilter));
        const cachedGigs = store.getState().myGigs[initialGigFilter.status];
        if (cachedGigs.myGigs && cachedGigs.myGigs.length !== 0) {
          return;
        }
        store.dispatch(
          actions.myGigs.getMyOpenGigs(
            constants.GIGS_FILTER_STATUSES_PARAM[initialGigFilter.status]
          )
        );
        return;
      }
      const params = utils.url.parseUrlQuery(location.search);
      if (_.keys(params).length == 1 && params.externalId) {
        store.dispatch(actions.myGigs.startCheckingGigs(params.externalId));
        return;
      }
      const s =
        _.values(constants.GIGS_FILTER_STATUSES).indexOf(params.status) >= 0
          ? params.status
          : null;
      const updatedGigFilter = {
        status: s || "Open Applications",
      };
      const currentGig = store.getState().filter.gig;
      const diff = !_.isEqual(updatedGigFilter, currentGig);
      if (diff) {
        store.dispatch(actions.filter.updateGigFilter(updatedGigFilter));
      }
      if (updatedGigFilter.status !== initialGigFilter.status) {
        // preload the open application first page data.
        const cachedOpenGigs = store.getState().myGigs[initialGigFilter.status];
        if (!cachedOpenGigs.myGigs) {
          store.dispatch(
            actions.myGigs.getMyOpenGigs(
              constants.GIGS_FILTER_STATUSES_PARAM[initialGigFilter.status]
            )
          );
        }
      }
      const cachedGigs = store.getState().myGigs[updatedGigFilter.status];
      if (cachedGigs.myGigs) {
        return;
      }
      getDataDebounced.current(() => {
        if (
          updatedGigFilter.status == constants.GIGS_FILTER_STATUSES.ACTIVE_JOBS
        ) {
          store.dispatch(
            actions.myGigs.getMyActiveGigs(
              constants.GIGS_FILTER_STATUSES_PARAM[updatedGigFilter.status]
            )
          );
        }
        if (
          updatedGigFilter.status == constants.GIGS_FILTER_STATUSES.OPEN_JOBS
        ) {
          store.dispatch(
            actions.myGigs.getMyOpenGigs(
              constants.GIGS_FILTER_STATUSES_PARAM[updatedGigFilter.status]
            )
          );
        }
        if (
          updatedGigFilter.status ==
          constants.GIGS_FILTER_STATUSES.COMPLETED_JOBS
        ) {
          store.dispatch(
            actions.myGigs.getMyCompletedGigs(
              constants.GIGS_FILTER_STATUSES_PARAM[updatedGigFilter.status]
            )
          );
        }
        if (
          updatedGigFilter.status ==
          constants.GIGS_FILTER_STATUSES.ARCHIVED_JOBS
        ) {
          store.dispatch(
            actions.myGigs.getMyArchivedGigs(
              constants.GIGS_FILTER_STATUSES_PARAM[updatedGigFilter.status]
            )
          );
        }
      });
    }
  }, [location, isLoggedIn]);

  return (
    <>
      <div className="layout">
        <aside className="sidebar">
          <div className="sidebar-content">
            {/* <Menu /> */}
            <div id="menu-id" />
            <hr />
            {isLoggedIn && <MyGigsFilter />}
          </div>
          <div className="sidebar-footer">
            <FeedbackButton />
          </div>
        </aside>
        <div className="content">
          <MyGigs />
        </div>
      </div>
      <div id="tooltips-container-id" />
    </>
  );
};

export default App;
