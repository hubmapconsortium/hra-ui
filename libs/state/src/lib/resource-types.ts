import { createCustomType, payload } from '@hra-ui/cdk/state';

/** Metrics resource */
export const Metrics = createCustomType(
  'metrics',
  payload<{ metrics: { icon: string; value: string; description: string }[] }>()
);

/** Gradient legend resource */
export const Gradient = createCustomType('gradient', payload<{ points: { color: string; percentage: number }[] }>());

/** Size legend resource */
export const Size = createCustomType('size', payload<{ sizes: { label: string; radius: number }[] }>());
