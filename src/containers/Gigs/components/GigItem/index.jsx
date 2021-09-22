import styles from "./styles.scss";
import React, { useCallback } from "react";
import PT from "prop-types";
import cn from "classnames";
import TagList from "components/TagList";
import IconFlagDollars from "components/icons/FlagDollars";
import IconFlagHot from "components/icons/FlagHot";
import IconFlagNew from "components/icons/FlagNew";
import { LOCATION_LABELS } from "constants/gigs";
import { formatWeeklyPayment } from "utils/gigs/formatting";

/**
 * Displays gigs list item.
 *
 * @param {Object} props component properties
 * @returns {JSX.Element}
 */
const GigItem = ({ className, gig, onClickSkill }) => {
  const {
    durationWeeks,
    id,
    location,
    name,
    paymentMax,
    paymentMin,
    promotedAs,
    skills,
  } = gig;

  return (
    <div className={className} styleName="container">
      {promotedAs === "high-paid" && (
        <IconFlagDollars className={styles.flagIcon} id={id} />
      )}
      {promotedAs === "hot" && (
        <IconFlagHot className={styles.flagIcon} id={id} />
      )}
      {promotedAs === "new" && (
        <IconFlagNew className={styles.flagIcon} id={id} />
      )}
      <div styleName="name-skills">
        <div styleName="name">{name}</div>
        <div styleName={cn("location", location?.toLowerCase())}>
          {LOCATION_LABELS[location]}
        </div>
        {!!skills?.length && (
          <div styleName="skills">
            <TagList
              maxTagCount={3}
              onClickTag={onClickSkill}
              renderTag={renderTag}
              tags={skills}
            />
          </div>
        )}
      </div>
      <div styleName="payment">
        <div styleName="payment-range">
          {formatWeeklyPayment(paymentMin, paymentMax)}
        </div>
        <div styleName="payment-label">Weekly Payment</div>
      </div>
      <div styleName="duration">
        <div styleName="duration-weeks">{durationWeeks} Weeks</div>
        <div styleName="duration-label">Duration</div>
      </div>
    </div>
  );
};

GigItem.propType = {
  className: PT.string,
  gig: PT.object.isRequired,
  onClickSkill: PT.func.isRequired,
};

export default GigItem;

const renderTag = ({ className, onClickTag, tag: { code, id, name } }) => (
  <span
    key={id}
    className={className}
    data-code={code}
    data-id={id}
    onClick={onClickTag}
    styleName="skill"
    role="button"
    tabIndex={0}
  >
    {name}
  </span>
);
