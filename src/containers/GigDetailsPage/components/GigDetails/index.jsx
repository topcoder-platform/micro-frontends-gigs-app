import styles from "./styles.scss";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { navigate } from "@reach/router";
import cn from "classnames";
import Button from "components/Button";
import IconLocation from "assets/icons/icon-location-crimson.svg";
import IconPayment from "assets/icons/icon-payment.svg";
import IconCalendar from "assets/icons/icon-calendar-medium.svg";
import IconHourglass from "assets/icons/icon-hourglass.svg";
import IconGlobe from "assets/icons/icon-globe-simple.svg";
import IconGear from "assets/icons/icon-gear-blue.svg";
import LoginModal from "components/LoginModal";
import GigNotes from "../GigNotes";
import GigWidgets from "../GigWidgets";
import * as selectors from "reducers/gigDetails/selectors";
import * as gigsSelectors from "reducers/gigs/selectors";
import * as userSelectors from "reducers/user/selectors";
import { formatPaymentAmount } from "utils/gigs/formatting";
import { formatPlural } from "utils/formatting";
import { makeGigApplyUrl } from "utils/url";
import { FREQUENCY_TO_PERIOD } from "constants/gigs";
import { GIG_LIST_ROUTE } from "constants/routes";

const GigDetails = () => {
  const details = useSelector(selectors.getDetails);
  const skillsError = useSelector(gigsSelectors.getSkillsError);
  const isLoggedIn = useSelector(userSelectors.getIsLoggedIn);

  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);

  const {
    description,
    duration,
    hoursPerWeek = 0,
    jobExternalId,
    jobTimezone,
    location,
    payment,
    skills,
    synced = false,
    title,
  } = details;

  const periodName =
    FREQUENCY_TO_PERIOD[payment?.frequency?.toLowerCase()] || "week";
  const currency = payment?.currency || "$";
  const paymentAmount = formatPaymentAmount(
    payment?.min,
    payment?.max,
    currency,
    currency
  );

  const onClickBtnApply = useCallback(() => {
    if (!isLoggedIn) {
      setIsOpenLoginModal(true);
    } else if (jobExternalId) {
      window.location = makeGigApplyUrl(jobExternalId);
    }
  }, [isLoggedIn, jobExternalId]);

  const onClickBtnViewOther = useCallback(() => {
    navigate(GIG_LIST_ROUTE);
  }, []);

  const onCloseLoginModal = useCallback(() => {
    setIsOpenLoginModal(false);
  }, []);

  return (
    <div styleName="container">
      <h1 styleName="title">{title}</h1>
      <div styleName="conditions">
        <div styleName="condition">
          <div styleName="condition-icon-placeholder">
            <IconLocation
              className={cn(styles.conditionIcon, styles.locationIcon)}
            />
          </div>
          <div styleName="condition-data">
            <div styleName="condition-label">Location</div>
            <div styleName="condition-value">{location}</div>
          </div>
        </div>
        <div styleName="condition">
          <div styleName="condition-icon-placeholder">
            <IconPayment
              className={cn(styles.conditionIcon, styles.paymentIcon)}
            />
          </div>
          <div styleName="condition-data">
            <div styleName="condition-label">Compensation</div>
            <div styleName="condition-value">
              {paymentAmount === "-"
                ? "n/a"
                : `${paymentAmount} / ${periodName}`}
            </div>
          </div>
        </div>
        <div styleName="condition">
          <div styleName="condition-icon-placeholder">
            <IconCalendar
              className={cn(styles.conditionIcon, styles.durationIcon)}
            />
          </div>
          <div styleName="condition-data">
            <div styleName="condition-label">Duration</div>
            <div styleName="condition-value">
              {duration ? formatPlural(duration, "Week") : "n/a"}
            </div>
          </div>
        </div>
        <div styleName="condition">
          <div styleName="condition-icon-placeholder">
            <IconHourglass
              className={cn(styles.conditionIcon, styles.hoursIcon)}
            />
          </div>
          <div styleName="condition-data">
            <div styleName="condition-label">Hours</div>
            <div styleName="condition-value">
              {hoursPerWeek
                ? formatPlural(hoursPerWeek, "hour") + " / week"
                : "n/a"}
            </div>
          </div>
        </div>
        <div styleName="condition">
          <div styleName="condition-icon-placeholder">
            <IconGlobe
              className={cn(styles.conditionIcon, styles.timezoneIcon)}
            />
          </div>
          <div styleName="condition-data">
            <div styleName="condition-label">Timezone</div>
            <div styleName="condition-value">
              {jobTimezone ? jobTimezone : "n/a"}
            </div>
          </div>
        </div>
      </div>
      <div styleName="contents">
        <div styleName="text">
          <div styleName="skills">
            <div styleName="section-label">Skills</div>
            <div styleName="section-contents">
              {skillsError ? (
                <span styleName="skills-error">{skillsError}</span>
              ) : (
                <>
                  <IconGear className={styles.skillsIcon} />
                  {skills?.length
                    ? skills.map(({ name }) => name).join(", ")
                    : "n/a"}
                </>
              )}
            </div>
          </div>
          <div styleName="description">
            <div styleName="section-label">Description</div>
            <div
              styleName="section-contents"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
          <GigNotes />
          <div styleName="controls">
            {!synced && (
              <Button isPrimary size="lg" onClick={onClickBtnApply}>
                APPLY TO THIS JOB
              </Button>
            )}
            <Button size="lg" onClick={onClickBtnViewOther}>
              VIEW OTHER JOBS
            </Button>
          </div>
        </div>
        <GigWidgets className={styles.widgets} />
      </div>
      <LoginModal onClose={onCloseLoginModal} open={isOpenLoginModal} />
    </div>
  );
};

export default GigDetails;
