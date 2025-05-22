import { ComponentRef, effect, Injectable, signal } from '@angular/core';
import { ContentTemplateController, Controller } from '@hra-ui/cdk/content-template';
import { VersionedDataTableComponent } from '@hra-ui/design-system/content-templates/versioned-data-table';
import { linkedQueryParam } from 'ngxtension/linked-query-param';

@Injectable()
export class VersionedTableParamSyncControllerService implements ContentTemplateController {
  static readonly id = 'VersionedTableParamSync';

  private readonly version = linkedQueryParam('version');

  private readonly componentRef = signal<ComponentRef<VersionedDataTableComponent> | undefined>(undefined);

  constructor() {
    effect(() => {
      const version = this.version();
      const componentRef = this.componentRef();
      if (version && componentRef) {
        const items = componentRef.instance.items();
        const index = items.findIndex((item) => item.version === version);
        if (index !== -1) {
          componentRef.setInput('selection', index);
        }
      }
    });
  }

  attach(componentRef: ComponentRef<unknown>, options: Controller): void {
    const { instance } = componentRef;
    if (instance instanceof VersionedDataTableComponent) {
      this.componentRef.set(componentRef as ComponentRef<VersionedDataTableComponent>);
      instance.selection.subscribe((index) => {
        const items = instance.items();
        if (items[index]) {
          this.version.set(items[index].version);
        }
      });
    }
  }

  detach(): void {
    // Intentionally empty
  }
}
