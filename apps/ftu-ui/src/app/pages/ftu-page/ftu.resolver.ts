import { ResolveFn } from '@angular/router';
import { of } from 'rxjs';

export const ftuResolver: ResolveFn<unknown> = (route) => {
  const id = route.queryParamMap.get('id');
  const uberon = route.queryParamMap.get('uberon');

  if (!id || !uberon) {
    return of({ error: 'Missing required params' });
  }

  return of({ id, uberon });
};
