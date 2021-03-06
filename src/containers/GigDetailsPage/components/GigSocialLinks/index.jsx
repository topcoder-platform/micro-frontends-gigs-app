import styles from "./styles.scss";
import React from "react";
import { useSelector } from "react-redux";
import PT from "prop-types";
import IconLinkedIn from "assets/icons/icon-linkedin-gray.svg";
import IconFacebook from "assets/icons/icon-facebook-gray.svg";
import IconTwitter from "assets/icons/icon-twitter-gray.svg";
import * as userSelectors from "reducers/user/selectors";
import { makeFacebookUrl, makeLinkedInUrl, makeTwitterUrl } from "utils/url";

const GigSocialLinks = ({ className, label }) => {
  const referralId = useSelector(userSelectors.getReferralId);

  const shareUrl = referralId
    ? `${location.origin}${location.pathname}?referralId=${referralId}`
    : location.href;

  return (
    <div styleName="container" className={className}>
      <span styleName="label">{label}&nbsp;</span>
      <a
        styleName="social-link"
        href={makeLinkedInUrl(shareUrl)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconLinkedIn className={styles.socialIcon} />
      </a>
      <a
        styleName="social-link"
        href={makeFacebookUrl(shareUrl)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconFacebook className={styles.socialIcon} />
      </a>
      <a
        styleName="social-link"
        href={makeTwitterUrl(shareUrl)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconTwitter className={styles.socialIcon} />
      </a>
    </div>
  );
};

GigSocialLinks.propTypes = {
  className: PT.string,
  label: PT.string.isRequired,
};

export default GigSocialLinks;
