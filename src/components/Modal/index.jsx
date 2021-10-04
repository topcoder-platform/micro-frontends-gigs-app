import React from "react";
import PT from "prop-types";
import cn from "classnames";
import { Modal as ReactModal } from "react-responsive-modal";

import styles from "./styles.scss";

const Modal = ({
  children,
  modalClassName,
  overlayClassName,
  open,
  center,
  onClose,
}) => {
  return (
    <ReactModal
      open={open}
      center={center}
      showCloseIcon={false}
      classNames={{
        modal: cn(styles.modal, styles.content, modalClassName),
        overlay: overlayClassName,
      }}
      focusTrapped={false}
      onClose={onClose}
    >
      {children}
    </ReactModal>
  );
};

Modal.defaultProps = {
  center: true,
  onClose() {},
};

Modal.propTypes = {
  children: PT.node,
  open: PT.bool,
  center: PT.bool,
  modalClassName: PT.string,
  overlayClassName: PT.string,
  onClose: PT.func,
};

export default Modal;
