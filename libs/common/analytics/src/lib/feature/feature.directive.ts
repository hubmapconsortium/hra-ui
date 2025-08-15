import { assertInInjectionContext, computed, Directive, inject, input, signal, Signal } from '@angular/core';

/**
 * Injects the feature path for the current location
 *
 * @returns A signal with the current feature path
 */
export function injectFeaturePath(): Signal<string> {
  assertInInjectionContext(injectFeaturePath);
  const feature = inject(FeatureDirective, { optional: true });
  return feature?.path ?? signal('');
}

/**
 * Names a feature in the application.
 * Used by analytics to determine where in the application an event originates.
 */
@Directive({
  selector: '[hraFeature]',
})
export class FeatureDirective {
  /** Feature name */
  readonly name = input.required<string>({ alias: 'hraFeature' });

  /** Full path of this feature. Each name along the path is separated by a dot */
  readonly path = computed((): string => {
    const parentPath = this.parent?.path();
    const name = this.name();
    return parentPath ? `${parentPath}.${name}` : name;
  });

  /** Direct parent feature in the injection tree */
  private readonly parent = inject(FeatureDirective, { skipSelf: true, optional: true });
}
