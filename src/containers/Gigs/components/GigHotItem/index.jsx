import styles from "./styles.scss";
import React from "react";
import PT from "prop-types";
import cn from "classnames";
import IconMark from "assets/icons/icon-location-mark.svg";
import { formatPaymentAmount } from "utils/gigs/formatting";
import { makeGigExternalUrl } from "utils/url";

const FREQUENCY_TO_PERIOD = {
  daily: "day",
  hourly: "hour",
  weekly: "week",
};

/**
 * Displays hot gig item.
 *
 * @param {Object} props component properties
 * @returns {JSX.Element}
 */
const GigHotItem = ({
  className,
  index,
  gig: { jobExternalId, location, payment, title },
}) => {
  const periodName =
    FREQUENCY_TO_PERIOD[payment?.frequency?.toLowerCase()] || "week";
  const currency = payment?.currency || "$";
  return (
    <a
      className={cn(
        styles.container,
        styles[`gig-hot-${index + 1}`],
        className
      )}
      href={makeGigExternalUrl(jobExternalId)}
    >
      <div styleName="location">
        <IconMark className={styles.locationMark} />
        <span styleName="location-text">{location}</span>
      </div>
      <div styleName="name">{title}</div>
      <div styleName="payment">
        {formatPaymentAmount(payment?.min, payment?.max, currency, currency)} /{" "}
        {periodName}
      </div>
    </a>
  );
};

GigHotItem.propTypes = {
  className: PT.string,
  index: PT.number.isRequired,
  gig: PT.object.isRequired,
};

export default GigHotItem;
