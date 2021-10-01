import "./styles.scss";
import React, { useCallback, useEffect, useState } from "react";
import PT from "prop-types";
import cn from "classnames";
import debounce from "lodash/debounce";
import {
  convertNumberStringToNumber,
  integerFormatter,
  isValidNumberString,
} from "utils/gigs/formatting";
import { DEBOUNCE_ON_CHANGE_TIME } from "constants/index.js";

/**
 * Displays currency input field.
 *
 * @param {Object} props component properties
 * @param {string} [props.className] class name added to root element
 * @param {string} props.currency currency abbreviation
 * @param {string} props.id id for input element
 * @param {string} props.label field label
 * @param {number} [props.maxValue] maximum value
 * @param {number} [props.minValue] minimum value
 * @param {string} props.name name for input element
 * @param {(v: string) => void} props.onChange function called when input value changes
 * @param {(v: number) => void} props.onCommit function called after some delay
 * when input value changes and it is valid
 * @param {boolean} [props.required] whether the field required non-empty value
 * @param {*} props.value input value
 * @returns {JSX.Element}
 */
const CurrencyField = ({
  className,
  currency,
  id,
  label,
  maxValue = 1e5,
  minValue = 0,
  name,
  onChange,
  onCommit,
  required = false,
  value,
}) => {
  const [error, setError] = useState("");

  const checkValue = useCallback(
    debounce(
      (value) => {
        if (!value) {
          if (required) {
            setError("Required");
          }
          return;
        }
        let num = convertNumberStringToNumber(value);
        if (isValidNumberString(value) && !isNaN(num)) {
          setError("");
          onCommit(num);
        } else {
          setError("Invalid format");
        }
      },
      DEBOUNCE_ON_CHANGE_TIME,
      { leading: false }
    ),
    [maxValue, minValue, onCommit, required]
  );

  const onChangeValue = useCallback(
    (event) => {
      let value = event.target.value;
      setError("");
      if (value && isValidNumberString(value)) {
        let num = convertNumberStringToNumber(value);
        if (!isNaN(num)) {
          if (num > maxValue) {
            num = maxValue;
          } else if (num < minValue) {
            num = minValue;
          }
          value = integerFormatter.format(num);
        }
      }
      onChange(value);
      checkValue(value);
    },
    [maxValue, minValue, checkValue, onChange]
  );

  return (
    <div className={className} styleName="container">
      {label && (
        <label styleName="label" htmlFor={id}>
          {label}
        </label>
      )}
      <div styleName={cn("field", { "has-errors": error })}>
        <input
          type="text"
          styleName="input"
          id={id}
          name={name}
          onChange={onChangeValue}
          value={
            typeof value === "number" ? integerFormatter.format(value) : value
          }
        />
        <span styleName="currency">{currency}</span>
        {error && <span styleName="error">{error}</span>}
      </div>
    </div>
  );
};

CurrencyField.propTypes = {
  className: PT.string,
  currency: PT.string.isRequired,
  id: PT.string.isRequired,
  label: PT.string,
  maxValue: PT.number,
  minValue: PT.number,
  name: PT.string.isRequired,
  onChange: PT.func.isRequired,
  onCommit: PT.func.isRequired,
  required: PT.bool,
  value: PT.oneOfType([PT.number, PT.string]).isRequired,
};

export default CurrencyField;
