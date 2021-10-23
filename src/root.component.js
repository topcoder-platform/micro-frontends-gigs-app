/* global process */
import React from "react";
import { createHistory, LocationProvider } from "@reach/router";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import ReactHeap from "reactjs-heap";

// History for location provider
const history = createHistory(window);
ReactHeap.initialize(process.env.HEAP_ID);

export default function Root({ view = "gigs" }) {
  return (
    <LocationProvider history={history}>
      <Provider store={store}>
        <App view={view} />
      </Provider>
    </LocationProvider>
  );
}
