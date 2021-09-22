import styles from "./styles.scss";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as selectors from "reducers/gigs/selectors";
import Button from "components/Button";
import CurrencyField from "components/CurrencyField";
import Dropdown from "components/Dropdown";
import MultiSelect from "components/MultiSelect";
import actions from "actions/gigs/creators";
import { LOCATION, PAYMENT_MAX_VALUE } from "constants/gigs";
import { getSelectedDropdownOption } from "utils";
import { preventDefault } from "utils/misc";

/**
 * Displays filter controls for Gigs listing page.
 *
 * @returns {JSX.Element}
 */
const GigsFilter = () => {
  const skillsAll = useSelector(selectors.getSkillsAll);
  const { location, skills } = useSelector(selectors.getFilters);
  const { paymentMax, paymentMin } = useSelector(selectors.getValues);
  const dispatch = useDispatch();

  const locationOptions = useMemo(
    () =>
      LOCATION_OPTIONS.map((option) => ({
        ...option,
        selected: option.value === location,
      })),
    [location]
  );

  const onChangeLocation = useCallback(
    (options) => {
      const option = getSelectedDropdownOption(options);
      dispatch(actions.setLocation(option.value));
    },
    [dispatch]
  );

  const onChangePaymentMax = useCallback(
    (value) => {
      dispatch(actions.setPaymentMaxValue(value));
    },
    [dispatch]
  );

  const onChangePaymentMin = useCallback(
    (value) => {
      dispatch(actions.setPaymentMinValue(value));
    },
    [dispatch]
  );

  const onCommitPaymentMax = useCallback(
    (value) => {
      dispatch(actions.setPaymentMax(value));
    },
    [dispatch]
  );

  const onCommitPaymentMin = useCallback(
    (value) => {
      dispatch(actions.setPaymentMin(value));
    },
    [dispatch]
  );

  const onChangeSkills = useCallback(
    (skills) => {
      dispatch(actions.setSkills(skills));
    },
    [dispatch]
  );

  const onClickClearBtn = useCallback(() => {
    dispatch(actions.resetFilters());
  }, [dispatch]);

  return (
    <form styleName="container" action="#" onSubmit={preventDefault}>
      <Dropdown
        className={styles.locationDropdown}
        label="Location"
        onChange={onChangeLocation}
        options={locationOptions}
        searchable={true}
        size="xs"
      />
      <MultiSelect
        className={styles.skillsSelect}
        label="Skills/Technologies"
        onChange={onChangeSkills}
        options={skillsAll}
        optLabelKey="name"
        optValueKey="id"
        placeholder="Type to add skill"
        value={skills}
      />
      <div styleName="section">
        <div styleName="section-title">Weekly Payment</div>
        <div styleName="payment-range">
          <CurrencyField
            className={styles.paymentMinField}
            currency="USD"
            id="filter-weekly-payment-min"
            label="From"
            maxValue={PAYMENT_MAX_VALUE}
            name="payment_min"
            onChange={onChangePaymentMin}
            onCommit={onCommitPaymentMin}
            required={true}
            value={paymentMin}
          />
          <span styleName="payment-range-separator">-</span>
          <CurrencyField
            className={styles.paymentMaxField}
            currency="USD"
            id="filter-weekly-payment-max"
            label="To"
            maxValue={PAYMENT_MAX_VALUE}
            name="payment_max"
            onChange={onChangePaymentMax}
            onCommit={onCommitPaymentMax}
            required={true}
            value={paymentMax}
          />
        </div>
      </div>
      <div styleName="controls">
        <Button onClick={onClickClearBtn}>CLEAR FILTER</Button>
        <Button>SAVE FILTER</Button>
      </div>
    </form>
  );
};

export default GigsFilter;

const LOCATION_OPTIONS = [
  { value: LOCATION.ALL, label: "All" },
  { value: LOCATION.ANY_ASIAN_COUNTRY, label: "Any Asian Country" },
  { value: LOCATION.ANY_LOCATION, label: "Any Location" },
  { value: LOCATION.INDIA_PREFERRED, label: "Any Location - India preferred" },
  { value: LOCATION.INDIA_ONLY, label: "India Only" },
];
