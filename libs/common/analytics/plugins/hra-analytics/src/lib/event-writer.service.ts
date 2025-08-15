import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Service for writing events to a remote url with event data and
 * metadata encoded in the url's query string.
 */
@Injectable({ providedIn: 'root' })
export class EventWriterService {
  /**
   * Writes an event to remote data storage
   *
   * @param event Event name
   * @param data Event data
   * @param meta Event metadata
   */
  write(event: string, data: object, meta: object): void {
    const metaKVPairs = this.serialize({ ...meta, event }, '');
    const dataKVPairs = this.serialize(data, 'e');
    const params = [...metaKVPairs, ...dataKVPairs].reduce(
      (acc, [key, value]) => acc.append(key, value),
      new HttpParams(),
    );

    // TODO use HttpClient in angular v20
    // TODO url from token
    // TODO handle fetch errors (probably ignore)
    // eslint-disable-next-line no-constant-condition
    if (false) {
      fetch(`https://cdn.humanatlas.io/tr-dev?${params.toString()}`, {
        cache: 'no-store',
        keepalive: true,
        method: 'GET',
      });
    } else {
      console.log(`Writing event data: ${params.toString()}`);
    }
  }

  /**
   * Serialize data into key/value pairs
   *
   * @param data Data to serialize
   * @param path Current key path
   * @yields 2-element tuples containing the key path and associated value
   */
  *serialize(data: unknown, path: string): Iterable<[path: string, value: string]> {
    // TODO maybe handle Map, Set, etc.
    if (data === undefined || data === null) {
      return;
    } else if (typeof data !== 'object') {
      yield [path, `${data}`];
    } else if (data instanceof Date) {
      yield [path, data.toISOString()];
    } else if (Array.isArray(data)) {
      for (let index = 0; index < data.length; index++) {
        const item = data[index];
        const itemPath = `${path}[${typeof item === 'object' ? index : ''}]`;
        yield* this.serialize(item, itemPath);
      }
    } else {
      const prefix = path ? `${path}.` : '';
      for (const [key, value] of Object.entries(data)) {
        yield* this.serialize(value, `${prefix}${key}`);
      }
    }
  }
}
