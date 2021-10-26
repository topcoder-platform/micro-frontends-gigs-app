import styles from "./styles.scss";
import React, { useCallback } from "react";
import PT from "prop-types";
import Button from "components/Button";
import Modal from "components/Modal";
import { REFERRAL_PROGRAM_URL } from "constants/urls";
import { makeLoginUrl, makeRegisterUrl } from "utils/url";

/**
 * Displays a modal with "Login" and "Register" buttons which is displayed after
 * the user clicks the button in the ReferralBanner.
 *
 * @param {Object} props component properties
 * @returns {JSX.Element}
 */
const ReferralAuthModal = ({ onClose, open }) => {
  const onClickBtnLogin = useCallback(() => {
    window.location = makeLoginUrl(location.href);
  }, []);

  const onClickBtnRegister = useCallback(() => {
    window.open(makeRegisterUrl(location.href));
  }, []);

  return (
    <Modal
      modalClassName={styles.modal}
      overlayClassName={styles.modalOverlay}
      onClose={onClose}
      open={open}
    >
      <div styleName="title">Referral Program</div>
      <div styleName="message">Please login to receive your referral code.</div>
      <div styleName="controls">
        <Button
          className={styles.button}
          isPrimary
          shade="dark"
          size="lg"
          onClick={onClickBtnLogin}
        >
          LOGIN
        </Button>
        <Button
          className={styles.button}
          shade="dark"
          size="lg"
          onClick={onClickBtnRegister}
        >
          REGISTER
        </Button>
      </div>
      <div styleName="hint">
        Find out how the referral program works{" "}
        <a target="_blank" href={REFERRAL_PROGRAM_URL}>
          here
        </a>
        .
      </div>
    </Modal>
  );
};

ReferralAuthModal.propTypes = {
  onClose: PT.func.isRequired,
  open: PT.bool.isRequired,
};

export default ReferralAuthModal;
