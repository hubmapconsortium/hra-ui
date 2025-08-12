import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EventWriterService {
  write(event: string, data: object, meta: object): void {
    let params = new HttpParams();
    params = this.serializeParams(params, { event, ...meta });
    params = this.serializeParams(params, data, 'e');
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

  *serialize(data: unknown, path: string): Iterable<[path: string, value: string]> {
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

  private serializeParams(params: HttpParams, data: unknown, path = ''): HttpParams {
    for (const [key, value] of this.serialize(data, path)) {
      params = params.append(key, value);
    }
    return params;
  }
}
