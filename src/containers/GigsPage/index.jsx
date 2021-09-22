import styles from "./styles.scss";
import React, { useMemo } from "react";
import BasePage from "../BasePage";
import Gigs from "../Gigs";
import GigsFilter from "../GigsFilter";
import { FeedbackButton } from "@topcoder/micro-frontends-earn-app";

/**
 * Displays Gig listing page.
 *
 * @returns {JSX.Element}
 */
const GigsPage = () => {
  const gigsFilter = useMemo(() => <GigsFilter />, []);
  const feedbackBtn = useMemo(
    () => <FeedbackButton className={styles.feedbackBtn} />,
    []
  );

  return (
    <BasePage
      className={styles.page}
      contentClassName={styles.content}
      sidebarClassName={styles.sidebar}
      sidebarContent={gigsFilter}
      sidebarFooter={feedbackBtn}
    >
      <Gigs />
    </BasePage>
  );
};

export default GigsPage;
