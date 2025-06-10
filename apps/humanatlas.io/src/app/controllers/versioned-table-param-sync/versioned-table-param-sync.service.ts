import { ComponentRef, effect, Injectable, signal } from '@angular/core';
import { ContentTemplateController, Controller } from '@hra-ui/cdk/content-template';
import { VersionedDataTableComponent } from '@hra-ui/design-system/content-templates/versioned-data-table';
import { linkedQueryParam } from 'ngxtension/linked-query-param';

/**
 * Injectable service that synchronizes the version of a versioned data table with a URL query parameter.
 */
@Injectable()
export class VersionedTableParamSyncControllerService implements ContentTemplateController {
  /** The controller ID */
  static readonly id = 'VersionedTableParamSync';

  /** The version from URL params */
  private readonly version = linkedQueryParam('version');

  /** The component reference for the versioned data table */
  private readonly componentRef = signal<ComponentRef<VersionedDataTableComponent> | undefined>(undefined);

  /** constructor */
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

  /** attach function that sets the correct version in the URL*/
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

  /** detach function that is empty */
  detach(): void {
    // Intentionally empty
  }
}
