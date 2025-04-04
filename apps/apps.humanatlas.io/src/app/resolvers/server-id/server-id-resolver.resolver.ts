import { ResolveFn } from '@angular/router';

/**
 * Route resolver function to resolve selected server from route params
 * @param route Route object
 * @returns Server ID to lookup in the servers constants.
 */
export const serverIdResolver: ResolveFn<string> = (route) => {
  /* return the serverId route param from the param map */
  return route.paramMap.get('serverId') ?? '';
};
