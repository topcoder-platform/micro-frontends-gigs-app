import styles from "./styles.scss";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Button from "components/Button";
import LoadingCircles from "components/LoadingCircles";
import * as userSelectors from "reducers/user/selectors";
import { makeReferralUrl } from "utils/url";
import { preventDefault } from "utils/misc";

const GigReferralLink = ({ className }) => {
  const isLoadingReferralData = useSelector(
    userSelectors.getIsLoadingReferralData
  );
  const referralId = useSelector(userSelectors.getReferralId);

  const [hasCopiedLink, setHasCopiedLink] = useState(false);
  const copyTimeoutRef = useRef(0);

  const copyBtnLabel = hasCopiedLink ? "COPIED" : "COPY";

  const onClickBtnCopy = useCallback(() => {
    if (!referralId) {
      return;
    }
    const body = document.body;
    const input = document.createElement("input");
    input.className = styles.hiddenInput;
    input.value = makeReferralUrl(referralId);
    body.appendChild(input);
    input.select();
    document.execCommand("copy");
    body.removeChild(input);
    setHasCopiedLink(true);
  }, [referralId]);

  useEffect(() => {
    if (!hasCopiedLink) {
      return;
    }
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
    }
    copyTimeoutRef.current = setTimeout(() => {
      copyTimeoutRef.current = 0;
      setHasCopiedLink(false);
    }, 3000);

    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, [hasCopiedLink]);

  return (
    <form className={className} action="#" onSubmit={preventDefault}>
      {isLoadingReferralData ? (
        <LoadingCircles className={styles.loadingIndicator} />
      ) : referralId ? (
        <>
          <div styleName="label">Share your Referral Link:</div>
          <div styleName="referral-field">
            <input
              readOnly
              styleName="link-input"
              type="text"
              value={makeReferralUrl(referralId)}
            />
            <Button
              isPrimary
              isInverted
              size="lg"
              styleName="copy-button"
              onClick={onClickBtnCopy}
            >
              {copyBtnLabel}
            </Button>
          </div>
        </>
      ) : (
        <div styleName="error">Failed to load referral data.</div>
      )}
    </form>
  );
};

export default GigReferralLink;
