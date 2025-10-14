/** Categories used to filter events */
var EventCategory;
(function (EventCategory) {
    EventCategory["Necessary"] = "necessary";
    EventCategory["Statistics"] = "statistics";
    EventCategory["Preferences"] = "preferences";
    EventCategory["Marketing"] = "marketing";
})(EventCategory || (EventCategory = {}));
/**
 * Create a new event
 *
 * @param type Event type
 * @param category Event category
 * @param trigger Default event trigger
 * @returns A new event
 */
function createEvent(type, category, trigger) {
    return { type: type, category, trigger };
}

/** Click event */
var Click = createEvent('click', EventCategory.Statistics, 'click');

/** Double click event */
var DoubleClick = createEvent('doubleClick', EventCategory.Statistics, 'dblclick');

/** Error event */
var Error = createEvent('error', EventCategory.Necessary);

/** Hover event */
var Hover = createEvent('hover', EventCategory.Statistics, 'mouseenter');

/** Keyboard event */
var Keyboard = createEvent('keyboard', EventCategory.Statistics, 'keydown');

/** Model change event */
var ModelChange = createEvent('modelChange', EventCategory.Statistics);

/** Page view event */
var PageView = createEvent('pageView', EventCategory.Statistics);

/** Core events for use in all applications */
const CoreEvents = {
    Click,
    DoubleClick,
    Error,
    Hover,
    Keyboard,
    ModelChange,
    PageView,
};

/**
 * Generated bundle index. Do not edit.
 */

export { CoreEvents, EventCategory, createEvent };
//# sourceMappingURL=hra-ui-common-analytics-events.mjs.map
