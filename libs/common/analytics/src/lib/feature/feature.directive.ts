import { computed, Directive, inject, input } from '@angular/core';

@Directive({
  selector: '[hraFeature]',
})
export class FeatureDirective {
  readonly name = input.required<string>({ alias: 'hraFeature' });

  readonly path = computed((): string[] => {
    const parentPath = this.parent?.path() ?? [];
    return [...parentPath, this.name()];
  });

  private readonly parent = inject(FeatureDirective, { skipSelf: true, optional: true });
}
