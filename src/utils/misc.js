/**
 * Creates a Promise that resolves after the specified number of milliseconds.
 *
 * @param {number} ms number of milliseconds
 * @returns {Promise}
 */
export const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

/**
 * Prevents default action for event.
 *
 * @param {Object} event event object
 */
export function preventDefault(event) {
  event.preventDefault();
}

export const englishCollator = new Intl.Collator("en");

/**
 * Function to be used for sorting arrays with objects that have "name" property.
 *
 * @param {Object} objA object A
 * @param {Object} objB object B
 * @returns {number}
 */
export function sortByName(objA, objB) {
  return englishCollator.compare(objA.name, objB.name);
}
