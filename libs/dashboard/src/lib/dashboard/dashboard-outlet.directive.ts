import { Directive, ViewContainerRef, computed, effect, inject, input } from '@angular/core';
import { DashboardComponentRegistryService } from './dashboard-registry.service';
import { DashboardComponentAnySpec, safeValidateSpec } from './dashboard.model';

/**
 * Dashboard outlet directive
 */
@Directive({
  selector: '[hraDashboardComponentOutlet]',
  standalone: true,
})
export class DashboardComponentOutletDirective {
  /** Input for dashboard outlet directive */
  readonly hraDashboardComponentOutlet = input.required<DashboardComponentAnySpec | undefined>();

  /** Reference to the view container */
  private readonly viewContainerRef = inject(ViewContainerRef);

  /** Reference to the dashboard component registry service */
  private readonly registry = inject(DashboardComponentRegistryService);

  /** Computed value for the component and its validated specification */
  private readonly componentWithSpec = computed(() => {
    const spec = this.hraDashboardComponentOutlet();
    if (!spec) {
      return undefined;
    }

    const component = this.registry.componentFor(spec);
    if (!component) {
      // TODO log missing component
      console.log('Component Missing', spec);
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

  /** Computed value for the component class */
  private readonly component = computed(() => this.componentWithSpec()?.component);

  /** Computed value for the component reference created within the view container */
  private readonly componentRef = computed(() => {
    const component = this.component();
    if (!component) {
      return undefined;
    }

    this.viewContainerRef.clear();
    return this.viewContainerRef.createComponent(component);
  });

  /** Effect to bind inputs to the created component reference */
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
