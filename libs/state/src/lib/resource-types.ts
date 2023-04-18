import { createCustomType, payload } from '@hra-ui/cdk/state';

/** Metrics resource */
export const Metrics = createCustomType(
  'metrics',
  payload<{ metrics: { icon: string; value: string; description: string }[] }>()
);
