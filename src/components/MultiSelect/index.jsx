import "react-select/dist/react-select.css";
import styles from "./styles.scss";
import React from "react";
import PT from "prop-types";
import cn from "classnames";
import Select from "react-select";

/**
 * Displays a multi-select field.
 *
 * @param {Object} props component properties
 * @returns {JSX.Element}
 */
const MultiSelect = ({
  className,
  label,
  onChange,
  options,
  optLabelKey,
  optValueKey,
  placeholder,
  value,
}) => {
  return (
    <div className={cn(styles.container, className)}>
      {label && <span className={styles.label}>{label}</span>}
      <Select
        arrowRenderer={null}
        className={cn(styles.select, {
          [styles.hasValues]: value && value.length,
        })}
        labelKey={optLabelKey}
        valueKey={optValueKey}
        multi={true}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        value={value}
      />
    </div>
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
