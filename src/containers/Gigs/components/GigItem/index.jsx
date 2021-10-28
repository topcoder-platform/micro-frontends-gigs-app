import styles from "./styles.scss";
import React, { useCallback } from "react";
import { Link } from "@reach/router";
import PT from "prop-types";
import cn from "classnames";
import TagList from "components/TagList";
import IconFlagDollars from "components/icons/FlagDollars";
import IconFlagHot from "components/icons/FlagHot";
import IconFlagNew from "components/icons/FlagNew";
import { formatPaymentAmount } from "utils/gigs/formatting";
import { formatPlural } from "utils/formatting";
import { makeGigPath } from "utils/url";

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
    jobExternalId,
    jobTag,
    location,
    payment,
    skills,
    title,
  } = gig;

  return (
    <Link
      className={className}
      styleName="container"
      to={makeGigPath(jobExternalId)}
    >
      {jobTag === "$$$" && (
        <IconFlagDollars className={styles.flagIcon} id={id} />
      )}
      {jobTag === "Hot" && <IconFlagHot className={styles.flagIcon} id={id} />}
      {jobTag === "New" && <IconFlagNew className={styles.flagIcon} id={id} />}
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
          {formatPaymentAmount(payment?.min, payment?.max, payment?.currency)}
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
    </Link>
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
