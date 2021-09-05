/* global process importMapOverrides */
import { setPublicPath } from "systemjs-webpack-interop";
/* This dynamically sets the webpack public path so that code splits work properly. See related:
 * https://github.com/joeldenning/systemjs-webpack-interop#what-is-this
 * https://webpack.js.org/guides/public-path/#on-the-fly
 * https://single-spa.js.org/docs/faq/#code-splits
 */

setPublicPath("@topcoder/micro-frontends-gigs-app");

const componentPocUrl =
  process.env.MFE_CONFIG["@topcoder/micro-frontends-component-poc"];
importMapOverrides.addOverride(
  "@topcoder/micro-frontends-component-poc",
  componentPocUrl
);
