import { Directive, ViewContainerRef, computed, effect, inject, input } from '@angular/core';
import { DashboardComponentRegistryService } from './dashboard-registry.service';
import { DashboardComponentAnySpec } from './dashboard.model';

@Directive({
  selector: '[hraDashboardComponentOutlet]',
  standalone: true,
})
export class DashboardOutletDirective {
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

    const validatedSpec = this.registry.validateSpec(spec);
    if (!validatedSpec) {
      // TODO log invalid spec
      return undefined;
    }

    return { component, spec: validatedSpec };
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
