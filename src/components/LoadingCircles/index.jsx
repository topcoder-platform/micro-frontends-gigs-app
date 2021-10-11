import styles from "./styles.scss";
import React, { useLayoutEffect } from "react";
import PT from "prop-types";

const LoadingCircles = ({ className }) => (
  <svg className={className} styleName="container" viewBox="0 0 64 64">
    <circle styleName="circle-outer" cx="50%" cy="50%" r="0" />
    <circle styleName="circle-inner" cx="50%" cy="50%" r="0" />
  </svg>
);

LoadingCircles.propTypes = {
  className: PT.string,
};

export default LoadingCircles;
