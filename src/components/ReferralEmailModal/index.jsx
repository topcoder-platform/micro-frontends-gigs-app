import styles from "./styles.scss";
import modalStyles from "styles/_modal.scss";
import React, { useCallback } from "react";
import { navigate } from "@reach/router";
import cn from "classnames";
import Button from "components/Button";
import LoadingCircles from "components/LoadingCircles";
import Modal from "components/Modal";
import { GIG_LIST_ROUTE } from "constants/routes";

const ReferralEmailModal = ({ error, isBusy, isUserError, onClose, open }) => {
  const onClickBtnFindAnoherGig = useCallback(() => {
    navigate(GIG_LIST_ROUTE);
  }, []);

  return (
    <Modal
      modalClassName={cn(modalStyles.modal, styles.modal)}
      overlayClassName={modalStyles.modalOverlay}
      onClose={onClose}
      open={open}
    >
      {isBusy ? (
        <>
          <div className={modalStyles.message}>Sending your referral...</div>
          <LoadingCircles className={styles.sendLoadingIndicator} />
        </>
      ) : (
        <>
          <div className={modalStyles.title}>
            {error ? "Oops!" : "Congratulations!"}
          </div>
          <div className={modalStyles.message}>
            {error ? error : "Your referral has been sent."}
          </div>
          {!!error &&
            (isUserError ? (
              <div className={styles.hint}>
                If you think this is an error please contact
                <br />
                <a href="mailto:support@topcoder.com">support@topcoder.com</a>.
              </div>
            ) : (
              <div className={styles.hint}>
                Looks like there is a problem on our end. Please try again.
                <br />
                If this persists please contact{" "}
                <a href="mailto:support@topcoder.com">support@topcoder.com</a>.
              </div>
            ))}
          <div className={cn(modalStyles.controls, styles.controls)}>
            <Button
              isPrimary
              size="lg"
              className={modalStyles.button}
              onClick={onClose}
            >
              CLOSE
            </Button>
            <Button
              size="lg"
              className={modalStyles.button}
              onClick={onClickBtnFindAnoherGig}
            >
              FIND ANOTHER GIG
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default ReferralEmailModal;
