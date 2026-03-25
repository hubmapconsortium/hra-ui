import { Injector } from '@angular/core';
import { UrlCreationOptions } from '@angular/router';
import { Any } from '@hra-ui/utils/types';

/**
 * Creates an url from a set of route navigation commands
 * @param injector Injector to access router and other services required for the convertion
 * @param commands Navigation commands
 * @param extras Additional url creation options
 * @param isResourceUrl Whether the url will be used as a resource url or regular url for sanitation purposes
 * @returns An url string if the creation was successful, otherwise undefined
 */
declare function createInternalUrl(injector: Injector, commands: Any[], extras: UrlCreationOptions, isResourceUrl: boolean): string | undefined;
/**
 * Creates an url with additional creation options
 * @param url The original url
 * @param extras Additional url creation options
 * @returns A new url
 */
declare function createExternalUrl(url: string, extras: UrlCreationOptions): string;

export { createExternalUrl, createInternalUrl };
