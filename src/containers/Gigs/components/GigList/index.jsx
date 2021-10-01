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
 * @returns {JSX.Element}
 */
const GigList = () => {
  const gigPromos = useSelector(getGigPromos);
  const gigs = useSelector(getGigs);
  const dispatch = useDispatch();

  const onClickSkill = useCallback(
    (event) => {
      let target = event.target;
      let dataset = target.dataset;
      dispatch(actions.addSkill({ id: dataset.id, name: target.textContent }));
    },
    [dispatch]
  );

  // it's not defined in the requirements how to compute gig index after which
  // gig promos should be shown
  const promosIndex = Math.min(Math.max(gigs.length - 1, 0), 2);

  return (
    <div styleName="container">
      {gigs.map((gig, gigIndex) =>
        gigIndex === promosIndex ? (
          <React.Fragment key={"gig-promos-fragment"}>
            <div key={"gig-promo-list"} styleName="gig-promo-list">
              {gigPromos?.map((gig, promoIndex) => (
                <div styleName="gig-promo">
                  <GigItemPromo
                    key={gig.id}
                    className={styles.gigPromoItem}
                    index={promoIndex}
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
          </React.Fragment>
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

export default GigList;
