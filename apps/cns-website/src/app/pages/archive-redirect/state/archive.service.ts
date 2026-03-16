import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { injectAppHref, joinWithSlash } from '@hra-ui/common/url';
import { createInjectionToken } from 'ngxtension/create-injection-token';
import { map, Observable } from 'rxjs';

/** Archive page entry */
export interface ArchiveEntry {
  /** Timestamp of the archived page */
  timestamp: number;
  /** Archive page URL */
  url: string;
  /** Redirect URL */
  redirectUrl: string;
}

/** Default API endpoint URL */
const DEFAULT_API_ENDPOINT_URL = 'https://wayback.archive-it.org/219/';
/** Default application href */
const DEFAULT_APP_HREF = 'https://cns.iu.edu/';

/** Injection token for the API endpoint URL */
const API_ENDPOINT_URL_TOKEN = createInjectionToken(() => DEFAULT_API_ENDPOINT_URL);

/** Inject API endpoint URL */
export const injectApiEndpointUrl = API_ENDPOINT_URL_TOKEN[0];
/** Provide a different API endpoint URL */
export const provideApiEndpointUrl = API_ENDPOINT_URL_TOKEN[1];

/** Service for interacting with the archive API */
@Injectable({
  providedIn: 'root',
})
export class ArchiveService {
  /** Http client */
  private readonly http = inject(HttpClient);
  /** API endpoint URL */
  private readonly apiEndpointUrl = injectApiEndpointUrl();
  /** Application href */
  private readonly appHref = injectAppHref();

  /**
   * Load archive entries for a given route.
   *
   * @param route Route to load archive entries for
   * @returns Observable of archive entries
   */
  loadByRoute(route: string): Observable<ArchiveEntry[]> {
    const timemapEndpointUrl = joinWithSlash(this.apiEndpointUrl, 'timemap/cdx');
    const pageUrl = joinWithSlash(this.appHref() || DEFAULT_APP_HREF, route);
    return this.http
      .get(timemapEndpointUrl, {
        responseType: 'text',
        params: {
          fl: 'timestamp,original',
          url: pageUrl,
        },
      })
      .pipe(map((response) => this.parseCdxResponse(response)));
  }

  /**
   * Parse CDX API response into archive entries.
   *
   * @param response CDX API response
   * @returns Array of archive entries
   */
  private parseCdxResponse(response: string): ArchiveEntry[] {
    const entries: ArchiveEntry[] = [];
    for (const line of response.split('\n')) {
      const trimmedLine = line.trim();
      const [timestampString, url] = trimmedLine.split(' ');
      const timestamp = this.parseCdxTimestamp(timestampString);
      if (timestamp && url) {
        entries.push({
          timestamp,
          url,
          redirectUrl: this.constructRedirectUrl(timestampString, url),
        });
      }
    }

    return entries;
  }

  /**
   * Parse CDX timestamp string into a Unix timestamp.
   * CDX timestamps are in the format YYYYMMDDhhmmss.
   * Also note that the month is 1-based in the CDX timestamp.
   *
   * @param cdxTimestamp Timestamp string from CDX API response
   * @returns Unix timestamp in milliseconds
   */
  private parseCdxTimestamp(cdxTimestamp: string): number {
    const year = Number(cdxTimestamp.slice(0, 4));
    const month = Number(cdxTimestamp.slice(4, 6)) - 1;
    const day = Number(cdxTimestamp.slice(6, 8));
    const hour = Number(cdxTimestamp.slice(8, 10));
    const minute = Number(cdxTimestamp.slice(10, 12));
    const second = Number(cdxTimestamp.slice(12, 14));

    return Date.UTC(year, month, day, hour, minute, second);
  }

  /**
   * Construct a redirect URL for an archived page.
   *
   * @param timestamp Page timestamp in CDX format (YYYYMMDDhhmmss)
   * @param url Original URL of the archived page
   * @returns Constructed redirect URL
   */
  private constructRedirectUrl(timestamp: string, url: string): string {
    const base = joinWithSlash(this.apiEndpointUrl, timestamp);
    return joinWithSlash(base, url);
  }
}
