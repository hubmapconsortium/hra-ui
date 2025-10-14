/**
 * Setup the testing environment for scrolling to work.
 * Adds global mocks for functions used by scrolling if they don't exist.
 */
function setupScrollTesting() {
    const globals = globalThis;
    if (typeof globals.ScrollTimeline !== 'function') {
        globals.ScrollTimeline = jest.fn();
    }
    if (typeof HTMLElement.prototype.animate !== 'function') {
        HTMLElement.prototype.animate = jest.fn(() => ({
            cancel: jest.fn(),
        }));
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { setupScrollTesting };
//# sourceMappingURL=hra-ui-design-system-scrolling-testing.mjs.map
