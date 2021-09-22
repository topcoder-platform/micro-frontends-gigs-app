import styles from "./styles.scss";
import React from "react";
import PT from "prop-types";
import cn from "classnames";
import Button from "components/Button";

/**
 * Displays a referral message with a button.
 *
 * @param {Object} props component properties
 * @returns {JSX.Element}
 */
const ReferralMessage = ({
  buttonText,
  children,
  className,
  onButtonClick,
}) => (
  <div className={cn(styles.container, className)}>
    <span styleName="text">{children}</span>
    <Button className={styles.button} onClick={onButtonClick}>
      {buttonText}
    </Button>
  </div>
);

ReferralMessage.propTypes = {
  buttonText: PT.string.isRequired,
  children: PT.node,
  className: PT.string,
  onButtonClick: PT.func,
};

export default ReferralMessage;
