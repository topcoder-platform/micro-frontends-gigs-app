import React from "react";
import PT from "prop-types";

import "./styles.scss";

/**
 * Displays a button.
 *
 * @param {Object} props component properties
 * @returns {JSX.Element}
 */
const Button = ({
  children,
  className,
  onClick,
  isPrimary,
  isSelected,
  isText,
  size,
  style,
  disabled,
  value,
}) => (
  <button
    className={className}
    data-value={value}
    styleName={`button ${style ? `button-${style}` : ""} ${
      isPrimary ? "button-primary" : ""
    } ${isText ? "button-text" : ""} ${size ? `button-${size}` : ""} ${
      isSelected ? "is-selected" : ""
    }`}
    onClick={onClick}
    tabIndex={0}
    type="button"
    disabled={disabled}
  >
    {children}
  </button>
);

Button.defaultProps = {
  isPrimary: false,
  disabled: false,
};

Button.propTypes = {
  children: PT.node,
  className: PT.string,
  onClick: PT.func,
  isPrimary: PT.bool,
  isSelected: PT.bool,
  isText: PT.bool,
  size: PT.string,
  style: PT.oneOf(["circle"]),
  value: PT.any,
};

export default Button;
