import { ResolveFn } from '@angular/router';

export const serverIdResolver: ResolveFn<string> = (route) => {
  return route.paramMap.get('endpoint') ?? '';
};
