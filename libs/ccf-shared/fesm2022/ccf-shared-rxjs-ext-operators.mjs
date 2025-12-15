import { filter, pluck, distinctUntilChanged, shareReplay } from 'rxjs/operators';

/**
 * Removes all `null` and `undefined` values from a stream.
 *
 * @returns An `Observable` operator
 */
function filterNulls() {
    return filter((value) => value != null);
}

/**
 * Default options
 */
const DEFAULT_OPTIONS = {};
/**
 * Combines the functionaliy of `pluck` and `distinctUntilChanged`
 * as well as adding a `shareReplay`.
 *
 * @param {...string} props Properties to and options
 * @returns An `Observable` operator
 */
function pluckUnique(...props) {
    const last = props[props.length - 1];
    let keys = props;
    let opts = DEFAULT_OPTIONS;
    if (typeof last === 'object') {
        opts = last;
        keys = keys.slice(0, -1);
    }
    return (source) => source.pipe(pluck(...keys), distinctUntilChanged(opts.compare), shareReplay(1));
}

/**
 * Generated bundle index. Do not edit.
 */

export { filterNulls, pluckUnique };
//# sourceMappingURL=ccf-shared-rxjs-ext-operators.mjs.map
