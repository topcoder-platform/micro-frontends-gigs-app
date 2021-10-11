import styles from "./styles.scss";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import GigItem from "../GigItem";
import GigHotItem from "../GigHotItem";
import * as selectors from "reducers/gigs/selectors";
import actions from "actions/gigs/creators";
import { GIGS_HOT_INDEX } from "constants/gigs";

/**
 * Displays gigs' list with promo gigs.
 *
 * @returns {JSX.Element}
 */
const GigList = () => {
  const gigs = useSelector(selectors.getGigs);
  let gigsFeatured = useSelector(selectors.getGigsFeatured);
  const gigsHot = useSelector(selectors.getGigsHot);
  const pageNumber = useSelector(selectors.getPageNumber);
  const dispatch = useDispatch();

  if (!gigsFeatured?.length) {
    gigsFeatured = [null];
  }
  const gigsHotIndex = Math.min(gigsFeatured.length - 1, GIGS_HOT_INDEX);

  const onClickSkill = useCallback(
    (event) => {
      event.preventDefault();
      let target = event.target;
      let dataset = target.dataset;
      dispatch(actions.addSkill({ id: dataset.id, name: target.textContent }));
    },
    [dispatch]
  );

  return (
    <div styleName="container">
      {pageNumber == 1 &&
        gigsFeatured?.map((gig, gigIndex) =>
          gigIndex === gigsHotIndex ? (
            <React.Fragment key={"gig-hotlist-fragment"}>
              {gig && (
                <GigItem
                  key={gig.id}
                  className={styles.gigItem}
                  gig={gig}
                  onClickSkill={onClickSkill}
                />
              )}
              <div key={"gig-hotlist"} styleName="gig-hotlist">
                {gigsHot?.map((gig, gigHotIndex) => (
                  <div styleName="gig-hot">
                    <GigHotItem
                      key={gig.id}
                      className={styles.gigHotItem}
                      index={gigHotIndex}
                      gig={gig}
                    />
                  </div>
                ))}
              </div>
              <div
                key={"row-color-preserver"}
                styleName="row-color-preserver"
              />
            </React.Fragment>
          ) : (
            gig && (
              <GigItem
                key={gig.id}
                className={styles.gigItem}
                gig={gig}
                onClickSkill={onClickSkill}
              />
            )
          )
        )}
      {gigs.map((gig) => (
        <GigItem
          key={gig.id}
          className={styles.gigItem}
          gig={gig}
          onClickSkill={onClickSkill}
        />
      ))}
    </div>
  );
};

export default GigList;
