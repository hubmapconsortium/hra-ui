import { ComponentRef, effect, Injectable, signal } from '@angular/core';
import { ContentTemplateController, Controller } from '@hra-ui/cdk/content-template';
import { DataViewerComponent } from '@hra-ui/design-system/data-viewer';
import { linkedQueryParam } from 'ngxtension/linked-query-param';

// @Injectable()
// export class DataViewerParamSyncControllerService implements ContentTemplateController {
//   /** The controller ID */
//   static readonly id = 'DataViewerParamSync';

//   /** The version from URL params */
//   private readonly version = linkedQueryParam('version');

//   private readonly organ = linkedQueryParam('organ');

//   /** The component reference for the versioned data table */
//   private readonly componentRef = signal<ComponentRef<DataViewerComponent> | undefined>(undefined);

//   /** constructor */
//   constructor() {
//     effect(() => {
//       const version = this.version();
//       const organ = this.organ();
//       const componentRef = this.componentRef();
//       if (version && organ && componentRef) {
//         const versionItems = componentRef.instance.releaseVersionData();
//         const versionIndex = versionItems.findIndex((item) => item.version === version);
//         const organItems = versionItems[versionIndex]?.organData;
//         const organIndex = organItems?.findIndex((item) => item.label === organ);
//         if (versionIndex !== -1 && organIndex !== -1) {
//           componentRef.setInput('currentVersion', versionItems[versionIndex]);
//           componentRef.setInput('organ', organItems[organIndex]);
//         }
//       }
//     });
//   }

//   // TODO
// //   /** attach function that sets the correct version and organ in the URL*/
// //   attach(componentRef: ComponentRef<unknown>, options: Controller): void {
// //     const { instance } = componentRef;
// //     if (instance instanceof DataViewerComponent) {
// //       this.componentRef.set(componentRef as ComponentRef<DataViewerComponent>);
// //       instance.releaseVersion_.subscribe((index) => {
// //         const versionItems = instance.releaseVersionData();
// //         if()
// // }

// }
