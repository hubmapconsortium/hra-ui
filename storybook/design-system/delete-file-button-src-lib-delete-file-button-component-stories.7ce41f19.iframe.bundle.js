(self.webpackChunkhra_ui=self.webpackChunkhra_ui||[]).push([[3849],{"./libs/design-system/icon-button/src/lib/icon-button-size/icon-button-size.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{o:()=>IconButtonSizeDirective});var tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");const BUTTON_SIZES={small:1.5,large:2.5},ICON_SIZES={small:1.25,large:1.5};let IconButtonSizeDirective=class IconButtonSizeDirective{constructor(){this.size=_angular_core__WEBPACK_IMPORTED_MODULE_0__.input.required({alias:"hraIconButtonSize"}),this.buttonSize=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.computed)((()=>BUTTON_SIZES[this.size()])),this.iconSize=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.computed)((()=>ICON_SIZES[this.size()]))}static#_=this.propDecorators={size:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:[{isSignal:!0,alias:"hraIconButtonSize",required:!0,transform:void 0}]}]}};IconButtonSizeDirective=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive)({selector:"[hraIconButtonSize]",standalone:!0,host:{"[style.--mdc-icon-button-state-layer-size.rem]":"buttonSize()","[style.--mdc-icon-button-icon-size.rem]":"iconSize()"}})],IconButtonSizeDirective)},"./libs/design-system/delete-file-button/src/lib/delete-file-button.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>delete_file_button_component_stories});var providers=__webpack_require__("./libs/design-system/src/lib/providers.ts"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var delete_file_button_componentngResource=__webpack_require__("./libs/design-system/delete-file-button/src/lib/delete-file-button.component.scss?ngResource"),delete_file_button_componentngResource_default=__webpack_require__.n(delete_file_button_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),icon=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs"),fesm2022_button=__webpack_require__("./node_modules/@angular/material/fesm2022/button.mjs"),icon_button_size_directive=__webpack_require__("./libs/design-system/icon-button/src/lib/icon-button-size/icon-button-size.directive.ts");let DeleteFileButtonComponent=class DeleteFileButtonComponent{constructor(){this.fileName=core.input.required(),this.cancelLoad=(0,core.output)()}static#_=this.propDecorators={fileName:[{type:core.Input,args:[{isSignal:!0,alias:"fileName",required:!0,transform:void 0}]}],cancelLoad:[{type:core.Output,args:["cancelLoad"]}]}};DeleteFileButtonComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"hra-delete-file-button",standalone:!0,imports:[common.CommonModule,fesm2022_button.Hl,icon.m_,icon_button_size_directive.o],template:'<span class="file-name">{{ fileName() }}</span>\n\n<button mat-icon-button hraIconButtonSize="large" (click)="cancelLoad.emit()">\n  <mat-icon>delete</mat-icon>\n</button>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[delete_file_button_componentngResource_default()]})],DeleteFileButtonComponent);const delete_file_button_component_stories={component:DeleteFileButtonComponent,title:"DeleteFileButtonComponent",parameters:{design:{type:"figma",url:"https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/Explorer-Design-System-Repository?node-id=5676-22770&t=X0D1vCOZyGiIyp9H-4"}},decorators:[(0,dist.applicationConfig)({providers:[(0,providers.z)()]})],args:{fileName:"test.csv"},argTypes:{fileName:{control:"text"}}},Default={},__namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{}",...Default.parameters?.docs?.source}}}},"./libs/design-system/delete-file-button/src/lib/delete-file-button.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  width: fit-content;\n  display: flex;\n  align-items: center;\n  padding-left: 1rem;\n  background: var(--sys-surface-container);\n  gap: 0.5rem;\n  border-radius: 2rem;\n  font: var(--sys-label-large);\n}\n:host .file-name {\n  color: var(--sys-primary);\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);