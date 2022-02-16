import "./styles.scss";
import React, { useCallback } from "react";
import { navigate } from "@reach/router";
import Button from "components/Button";
import { GIG_LIST_ROUTE } from "constants/routes";

const GigsFulFill = () => {
  const onClickBtnViewOther = useCallback(() => {
    navigate(GIG_LIST_ROUTE);
  }, []);
  return (
    <div styleName="container">
      <h3>THIS GIG HAS BEEN FULFILLED</h3>
      <div styleName="action">
        <Button size="lg" onClick={onClickBtnViewOther}>
          VIEW OTHER GIGS
        </Button>
      </div>
    </div>
  );
};

export default GigsFulFill;
