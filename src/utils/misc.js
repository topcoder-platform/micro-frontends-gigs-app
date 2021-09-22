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
