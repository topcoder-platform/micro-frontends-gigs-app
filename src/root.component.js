/* global process */
import React from "react";
import { createHistory, LocationProvider } from "@reach/router";
import { Provider } from "react-redux";
import ReactHeap from "reactjs-heap";
import store from "./store";
import App from "./App";

// History for location provider
const history = createHistory(window);
if (process.env.HEAP_ANALYTICS_KEY) {
  ReactHeap.initialize(process.env.HEAP_ANALYTICS_KEY);
}

export default function Root({ view = "gigs" }) {
  return (
    <LocationProvider history={history}>
      <Provider store={store}>
        <App view={view} />
      </Provider>
    </LocationProvider>
  );
}
