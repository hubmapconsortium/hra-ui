import { Directive, ViewContainerRef, computed, effect, inject, input } from '@angular/core';
import { DashboardComponentRegistryService } from './dashboard-registry.service';
import { DashboardComponentAnySpec, safeValidateSpec } from './dashboard.model';

@Directive({
  selector: '[hraDashboardComponentOutlet]',
  standalone: true,
})
export class DashboardComponentOutletDirective {
  readonly hraDashboardComponentOutlet = input.required<DashboardComponentAnySpec | undefined>();

  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly registry = inject(DashboardComponentRegistryService);

  private readonly componentWithSpec = computed(() => {
    const spec = this.hraDashboardComponentOutlet();
    if (!spec) {
      return undefined;
    }

    const component = this.registry.componentFor(spec);
    if (!component) {
      // TODO log missing component
      return undefined;
    }

    // TODO: consider only validating the spec in dev mode

    const validateResult = safeValidateSpec(component, spec);
    if (!validateResult.success) {
      // TODO improve logging spec errors
      console.log(validateResult.error.issues);
      return undefined;
    }

    return { component, spec: validateResult.data };
  });

  private readonly component = computed(() => this.componentWithSpec()?.component);

  private readonly componentRef = computed(() => {
    const component = this.component();
    if (!component) {
      return undefined;
    }

    this.viewContainerRef.clear();
    return this.viewContainerRef.createComponent(component);
  });

  protected readonly inputBindingsRef = effect(() => {
    const componentRef = this.componentRef();
    if (!componentRef) {
      return;
    }

    // Spec is guaranteed to be defined when componentRef is defined
    const spec = (this.componentWithSpec() as { spec: DashboardComponentAnySpec }).spec;
    componentRef.setInput('spec', spec);
  });
}
