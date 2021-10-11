import { LOCATION } from "constants/gigs";
import { englishCollator } from "utils/misc";

/**
 * Function to be used to sort locations' array.
 *
 * @param {string} locA location A
 * @param {string} locB location B
 * @returns {number}
 */
export function sortLocations(locA, locB) {
  if (locA === LOCATION.ALL) {
    return -1;
  }
  if (locB === LOCATION.ALL) {
    return 1;
  }
  return englishCollator.compare(locA, locB);
}
