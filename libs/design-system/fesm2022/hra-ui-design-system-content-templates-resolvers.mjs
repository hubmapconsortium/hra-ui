import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { assetUrl } from '@hra-ui/common/url';
import { load } from 'js-yaml';
import { map } from 'rxjs';

/**
 * Creates a resolver function that loads and validates json data
 *
 * @param url Json url path
 * @param spec Zod schema to validate the spec
 * @returns A resolver function
 */
function createJsonSpecResolver(url, spec) {
    return () => {
        const http = inject(HttpClient);
        return http.get(assetUrl(url)(), { responseType: 'json' }).pipe(map((data) => spec.parse(data)));
    };
}
/**
 * Creates a resolver function that loads and validates yaml data
 *
 * @param file Yaml url path
 * @param spec Zod schema to validate the spec
 * @returns A resolver function
 */
function createYamlSpecResolver(url, spec) {
    return () => {
        const http = inject(HttpClient);
        return http.get(assetUrl(url)(), { responseType: 'text' }).pipe(map((data) => load(data, { filename: url })), map((data) => spec.parse(data)));
    };
}

/**
 * Generated bundle index. Do not edit.
 */

export { createJsonSpecResolver, createYamlSpecResolver };
//# sourceMappingURL=hra-ui-design-system-content-templates-resolvers.mjs.map
