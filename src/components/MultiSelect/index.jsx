import "react-select/dist/react-select.css";
import styles from "./styles.scss";
import React, { useState } from "react";
import PT from "prop-types";
import cn from "classnames";
import Select from "react-select";
import iconDown from "assets/icons/dropdown-arrow.png";

const Arrow = () => (
  <img className={styles.arrow} src={iconDown} alt="icon down" />
);

/**
 * Displays a multi-select field.
 *
 * @param {Object} props component properties
 * @returns {JSX.Element}
 */
const MultiSelect = ({
  className,
  clearable,
  label,
  isRequired = false,
  onChange,
  onFocus,
  options,
  optLabelKey,
  optValueKey,
  placeholder,
  showArrow = false,
  size,
  value,
  error,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <>
      <div
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={() => setFocused(false)}
        className={cn(
          styles.container,
          { [styles.hasError]: !!error },
          styles[size],
          className
        )}
      >
        {label && (
          <span className={cn(styles.label, { [styles.focused]: focused })}>
            {label + (isRequired ? " *" : "")}
          </span>
        )}
        <Select
          arrowRenderer={showArrow ? Arrow : null}
          className={cn(styles.select, {
            [styles.hasValues]: value && value.length,
          })}
          clearable={clearable}
          labelKey={optLabelKey}
          valueKey={optValueKey}
          multi={true}
          onChange={onChange}
          onFocus={onFocus}
          options={options}
          placeholder={placeholder}
          value={value}
        />
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </>
  );
};

MultiSelect.propTypes = {
  className: PT.string,
  label: PT.string,
  onChange: PT.func.isRequired,
  options: PT.array.isRequired,
  optLabelKey: PT.string,
  optValueKey: PT.string,
  placeholder: PT.string,
  value: PT.array.isRequired,
};

export default MultiSelect;
