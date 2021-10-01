import styles from "./styles.scss";
import React, { useCallback } from "react";
import PT from "prop-types";
import cn from "classnames";
import TagList from "components/TagList";
import IconFlagDollars from "components/icons/FlagDollars";
import IconFlagHot from "components/icons/FlagHot";
import IconFlagNew from "components/icons/FlagNew";
import { formatWeeklyPayment } from "utils/gigs/formatting";
import { formatPlural } from "utils/formatting";

/**
 * Displays gigs list item.
 *
 * @param {Object} props component properties
 * @returns {JSX.Element}
 */
const GigItem = ({ className, gig, onClickSkill }) => {
  const {
    duration,
    id,
    isGlobal,
    location,
    payment,
    promotedAs,
    skills,
    title,
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
        <div styleName="name">{title}</div>
        <div styleName={cn("location", { global: isGlobal })}>{location}</div>
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
          {formatWeeklyPayment(payment?.min, payment?.max)}
        </div>
        <div styleName="payment-label">
          {payment?.frequency || "weekly"} payment
        </div>
      </div>
      <div styleName="duration">
        <div styleName="duration-weeks">
          {duration ? formatPlural(duration, "Week") : "-"}
        </div>
        <div styleName="duration-label">Duration</div>
      </div>
    </div>
  );
};

GigItem.propType = {
  className: PT.string,
  gig: PT.shape({
    duration: PT.number,
    id: PT.string.isRequired,
    isGlobal: PT.bool,
    location: PT.string.isRequired,
    payment: PT.shape({
      frequency: PT.string,
      max: PT.number,
      min: PT.number,
    }),
    skills: PT.arrayOf(
      PT.shape({
        id: PT.string.isRequired,
        name: PT.string.isRequired,
      })
    ),
    title: PT.string.isRequired,
  }).isRequired,
  onClickSkill: PT.func.isRequired,
};

export default GigItem;

const renderTag = ({ className, onClickTag, tag: { id, name } }) => (
  <span
    key={id}
    className={className}
    data-id={id}
    onClick={onClickTag}
    styleName="skill"
    role="button"
    tabIndex={0}
  >
    {name}
  </span>
);
