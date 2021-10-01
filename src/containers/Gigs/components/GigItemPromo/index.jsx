import styles from "./styles.scss";
import React from "react";
import PT from "prop-types";
import cn from "classnames";
import IconMark from "assets/icons/icon-location-mark.svg";
import { currencyFormatter } from "utils/gigs/formatting";

/**
 * Displays gig promo item.
 *
 * @param {Object} props component properties
 * @returns {JSX.Element}
 */
const GigItemPromo = ({
  className,
  index,
  gig: { location, name, paymentMax, paymentMin },
}) => {
  return (
    <div
      className={cn(styles.container, styles[`promo-${index + 1}`], className)}
    >
      <div styleName="location">
        <IconMark className={styles.locationMark} />
        <span styleName="location-text">{location}</span>
      </div>
      <div styleName="name">{name}</div>
      <div styleName="payment">
        {currencyFormatter.format(paymentMin)} -{" "}
        {currencyFormatter.format(paymentMax)} / week
      </div>
    </div>
  );
};

GigItemPromo.propTypes = {
  className: PT.string,
  index: PT.number.isRequired,
  gig: PT.object.isRequired,
};

export default GigItemPromo;
