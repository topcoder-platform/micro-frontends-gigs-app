import styles from "./styles.scss";
import React, { useCallback } from "react";
import PT from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import GigItem from "../GigItem";
import GigItemPromo from "../GigItemPromo";
import { getGigPromos, getGigs } from "reducers/gigs/selectors";
import actions from "actions/gigs/creators";

/**
 * Displays gigs' list with promo gigs.
 *
 * @param {Object} props component properties
 * @returns {JSX.Element}
 */
const GigList = () => {
  const gigPromos = useSelector(getGigPromos);
  const gigs = useSelector(getGigs);
  const dispatch = useDispatch();

  const onClickSkill = useCallback(
    (event) => {
      const dataset = event.target.dataset;
      dispatch(actions.addSkill({ code: dataset.code, id: dataset.id }));
    },
    [dispatch]
  );

  // it's not defined in the requirements how to compute gig index after which
  // gig promos should be shown
  const promosIndex = Math.min(Math.max(gigs.length - 1, 0), 2);

  return (
    <div styleName="container">
      {gigs.map((gig, index) =>
        index === promosIndex && gigPromos?.length ? (
          <>
            <div key={"gig-promo-list"} styleName="gig-promo-list">
              {gigPromos.map((gig, index) => (
                <div styleName="gig-promo">
                  <GigItemPromo
                    key={gig.id}
                    className={styles.gigPromoItem}
                    index={index}
                    gig={gig}
                  />
                </div>
              ))}
            </div>
            <div key={"row-color-preserver"} styleName="row-color-preserver" />
            <GigItem
              key={gig.id}
              className={styles.gigItem}
              gig={gig}
              onClickSkill={onClickSkill}
            />
          </>
        ) : (
          <GigItem
            key={gig.id}
            className={styles.gigItem}
            gig={gig}
            onClickSkill={onClickSkill}
          />
        )
      )}
    </div>
  );
};

GigList.propTypes = {
  promosIndex: PT.number.isRequired,
};

export default GigList;
