/* global process */
import React from "react";
import { createHistory, LocationProvider } from "@reach/router";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

// History for location provider
const history = createHistory(window);

export default function Root({ externalId, view = "gigs" }) {
  return (
    <LocationProvider history={history}>
      <Provider store={store}>
        <App externalId={externalId} view={view} />
      </Provider>
    </LocationProvider>
  );
}
