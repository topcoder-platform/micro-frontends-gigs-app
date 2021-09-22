import qs from "qs";
import { LOCATION, SORT_BY_TO_API, STATE_KEY_TO_API } from "constants/gigs";

export function convertToApiQuery(params) {
  const apiParams = {};
  if (params.sortBy) {
    params.sortBy = SORT_BY_TO_API[params.sortBy];
  }
  for (let stateKey in params) {
    let apiKey = STATE_KEY_TO_API[stateKey];
    if (apiKey) {
      let value = params[stateKey];
      if (typeof value === "number" || value) {
        if (apiKey === "location") {
          if (value === LOCATION.ALL) {
            continue;
          }
        } else if (apiKey === "name") {
          apiKey = "name_like";
        } else if (apiKey === "paymentMax") {
          if (typeof value !== "number") {
            continue;
          }
          apiKey = "paymentMax_lte";
        } else if (apiKey === "paymentMin") {
          if (typeof value === "number") {
            apiParams["paymentMax_gte"] = value;
          }
          continue;
        }
        apiParams[apiKey] = value;
      }
    }
  }
  return qs.stringify(apiParams);
}
