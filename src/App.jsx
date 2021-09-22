/**
 * Main App component
 */
import React from "react";
import GigsPage from "./containers/GigsPage";
import MyGigsPage from "./containers/MyGigsPage";

import "react-date-range/dist/theme/default.css";
import "react-date-range/dist/styles.css";
import "rc-tooltip/assets/bootstrap.css";
import "react-responsive-modal/styles.css";

import "./styles/main.scss";

const App = ({ view }) => {
  return (
    <div className="layout-wrapper">
      {view === "gigs" && <GigsPage />}
      {view === "my-gigs" && <MyGigsPage />}
      <div id="tooltips-container-id" />
      {process.env.NODE_ENV === "test" && <span hidden>Gigs App</span>}
    </div>
  );
};

export default App;
