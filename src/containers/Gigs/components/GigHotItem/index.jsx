import styles from "./styles.scss";
import React from "react";
import { Link } from "@reach/router";
import PT from "prop-types";
import cn from "classnames";
import IconMark from "assets/icons/icon-location-mark.svg";
import { formatPaymentAmount } from "utils/gigs/formatting";
import { makeGigPath } from "utils/url";
import { FREQUENCY_TO_PERIOD } from "constants/gigs";

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
    <Link
      className={cn(
        styles.container,
        styles[`gig-hot-${index + 1}`],
        className
      )}
      to={makeGigPath(jobExternalId)}
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
    </Link>
  );
};

GigHotItem.propTypes = {
  className: PT.string,
  index: PT.number.isRequired,
  gig: PT.object.isRequired,
};

export default GigHotItem;
