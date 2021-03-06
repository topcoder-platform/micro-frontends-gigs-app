import styles from "./styles.scss";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import PT from "prop-types";
import store from "store";
import LoadingCircles from "components/LoadingCircles";
import Button from "components/Button";
import ReferralAuthModal from "components/ReferralAuthModal";
import * as userSelectors from "reducers/user/selectors";
import * as userEffectors from "actions/user/effectors";
import { makeReferralUrl } from "utils/url";
import { REFERRAL_PROGRAM_URL } from "constants/urls";

/**
 * Displays a referral banner with a message and a button. If user is logged in
 * displays referral link and a copy button.
 *
 * @param {Object} props component properties
 * @returns {JSX.Element}
 */
const ReferralBanner = ({ className }) => {
  const isLoadingReferralData = useSelector(
    userSelectors.getIsLoadingReferralData
  );
  const isLoggedIn = useSelector(userSelectors.getIsLoggedIn);
  const referralId = useSelector(userSelectors.getReferralId);
  const [hasCopiedLink, setHasCopiedLink] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const copyTimeoutRef = useRef(0);

  const copyBtnLabel = hasCopiedLink ? "COPIED" : "COPY";

  const onClickBtnCopy = useCallback(() => {
    if (!referralId) {
      return;
    }
    const body = document.body;
    const input = document.createElement("input");
    input.className = styles.input;
    input.value = makeReferralUrl(referralId);
    body.appendChild(input);
    input.select();
    document.execCommand("copy");
    body.removeChild(input);
    setHasCopiedLink(true);
  }, [referralId]);

  const onClickBtnRefer = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    if (isLoggedIn && !referralId) {
      userEffectors.loadReferralData(store);
    }
  }, [isLoggedIn, referralId]);

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
    <div className={className} styleName="container">
      {isLoggedIn ? (
        <span styleName="referral-link-message">
          <a
            styleName="referral-title"
            href={REFERRAL_PROGRAM_URL}
            target="_blank"
            rel="noreferrer"
          >
            Topcoder Referral Program:
          </a>
          <span styleName="referral-link-label">Your referral link:</span>
          {isLoadingReferralData ? (
            <LoadingCircles styleName="loading-indicator" />
          ) : referralId ? (
            <span styleName="referral-field">
              <span styleName="referral-link">
                {makeReferralUrl(referralId)}
              </span>
              <Button
                isPrimary
                isInverted
                size="sm"
                styleName="copy-button"
                onClick={onClickBtnCopy}
              >
                {copyBtnLabel}
              </Button>
            </span>
          ) : (
            <span styleName="referral-link-error">
              Oops, we couldn&apos;t load your profile. Please try again later
              or contact <a href="mailto:support@topcoder.com">support</a>.
            </span>
          )}
        </span>
      ) : (
        <>
          <span styleName="referral-message">
            <span styleName="referral-title">Topcoder Referral Program:</span>{" "}
            <span styleName="referral-description">
              Do you know someone who is perfect for a gig? You could earn $500
              for referring them!
            </span>
          </span>
          <Button
            isPrimary
            isInverted
            styleName="refer-button"
            onClick={onClickBtnRefer}
          >
            REFER TO A FRIEND
          </Button>
        </>
      )}
      <ReferralAuthModal onClose={onCloseModal} open={isModalOpen} />
    </div>
  );
};

ReferralBanner.propTypes = {
  className: PT.string,
};

export default ReferralBanner;
