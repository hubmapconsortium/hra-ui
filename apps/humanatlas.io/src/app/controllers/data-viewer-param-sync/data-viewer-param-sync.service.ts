import { ComponentRef, effect, Injectable, signal } from '@angular/core';
import { ContentTemplateController, Controller } from '@hra-ui/cdk/content-template';
import { DataViewerComponent } from '@hra-ui/design-system/data-viewer';
import { linkedQueryParam } from 'ngxtension/linked-query-param';

/**
 * Service to synchronize the DataViewerComponent's version and organ with URL parameters.
 */
@Injectable()
export class DataViewerParamSyncControllerService implements ContentTemplateController {
  /** The controller ID */
  static readonly id = 'DataViewerParamSync';

  /** The version from URL params */
  private readonly version = linkedQueryParam('version', { preserveFragment: true });

  /** The organ from URL params */
  private readonly organ = linkedQueryParam('organ', { preserveFragment: true });

  /** The component reference for the versioned data viewer */
  private readonly componentRef = signal<ComponentRef<DataViewerComponent> | undefined>(undefined);

  /** constructor */
  constructor() {
    effect(() => {
      const version = this.version();
      const organ = this.organ();
      const componentRef = this.componentRef();

      if (componentRef) {
        const instance = componentRef.instance;

        if (version) {
          const releaseVersionData = instance.releaseVersionData();
          const validVersion = releaseVersionData.find((item) => item.version === version);
          if (validVersion) {
            instance.releaseVersion.set(version);
          }
        }

        if (organ && instance.releaseVersion()) {
          const releaseVersionData = instance.releaseVersionData();
          const currentReleaseVersion =
            releaseVersionData.find((item) => item.version === instance.releaseVersion()) ?? releaseVersionData[0];
          const validOrgan = currentReleaseVersion.organData.find((item) => item.label === organ);
          if (validOrgan) {
            instance.organ.set(organ);
          }
        }
      }
    });
  }

  /** attach function that sets the correct version and organ in the URL*/
  attach(componentRef: ComponentRef<unknown>, options: Controller): void {
    const { instance } = componentRef;
    if (instance instanceof DataViewerComponent) {
      this.componentRef.set(componentRef as ComponentRef<DataViewerComponent>);

      // Subscribe to release version changes to update URL
      instance.releaseVersion.subscribe((version) => {
        if (version) {
          this.version.set(version);
        }
      });

      // Subscribe to organ changes to update URL
      instance.organ.subscribe((organLabel) => {
        if (organLabel !== undefined) {
          this.organ.set(organLabel);
        }
      });
    }
  }

  /** detach function that cleans up the component reference */
  detach(): void {
    this.componentRef.set(undefined);
  }
}
