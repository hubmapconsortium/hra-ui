(self.webpackChunkhra_ui=self.webpackChunkhra_ui||[]).push([[227],{"./libs/components/molecules/src/lib/source-list/source-list.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>source_list_component_stories});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var source_list_componentngResource=__webpack_require__("./libs/components/molecules/src/lib/source-list/source-list.component.scss?ngResource"),source_list_componentngResource_default=__webpack_require__.n(source_list_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),table=__webpack_require__("./node_modules/@angular/material/fesm2022/table.mjs"),icon=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs");var label_box_componentngResource=__webpack_require__("./libs/components/atoms/src/lib/label-box/label-box.component.scss?ngResource"),label_box_componentngResource_default=__webpack_require__.n(label_box_componentngResource);let LabelBoxComponent=class LabelBoxComponent{};LabelBoxComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"hra-label-box",standalone:!0,imports:[common.CommonModule],template:'<ng-content></ng-content>\n\n<div class="filler"></div>\n\n<ng-content select=".end"></ng-content>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[label_box_componentngResource_default()]})],LabelBoxComponent);var empty_biomarker_componentngResource=__webpack_require__("./libs/components/atoms/src/lib/empty-biomarker/empty-biomarker.component.scss?ngResource"),empty_biomarker_componentngResource_default=__webpack_require__.n(empty_biomarker_componentngResource),fesm2022_button=__webpack_require__("./node_modules/@angular/material/fesm2022/button.mjs"),ngx_markdown=__webpack_require__("./node_modules/ngx-markdown/fesm2022/ngx-markdown.mjs");let EmptyBiomarkerComponent=class EmptyBiomarkerComponent{constructor(){this.collaborateText="",this.message="",this.collaborateClick=new core.EventEmitter}static#_=this.propDecorators={collaborateText:[{type:core.Input}],message:[{type:core.Input}],collaborateClick:[{type:core.Output}]}};EmptyBiomarkerComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"hra-empty-biomarker",standalone:!0,imports:[common.CommonModule,fesm2022_button.ot,ngx_markdown.JP],template:'<markdown [data]="message" class="message"></markdown>\n<button mat-flat-button class="collaborate-button" color="primary" (click)="collaborateClick.emit($event)">\n  {{ collaborateText }}\n</button>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[empty_biomarker_componentngResource_default()]})],EmptyBiomarkerComponent);var ngx_google_analytics=__webpack_require__("./node_modules/ngx-google-analytics/fesm2020/ngx-google-analytics.mjs");let SourceListComponent=class SourceListComponent{constructor(){this.sources=[],this.collaborateText="",this.message="",this.showTable=!0,this.collaborateClick=new core.EventEmitter,this.ga=(0,core.inject)(ngx_google_analytics.$r)}toggleTable(){this.showTable=!this.showTable,this.ga.event("source_table_toggle",this.showTable.toString())}sourceLinkClicked(item){this.ga.event("source_link_clicked","link_click",item.link)}static#_=this.propDecorators={sources:[{type:core.Input}],collaborateText:[{type:core.Input}],message:[{type:core.Input}],collaborateClick:[{type:core.Output}]}};SourceListComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"hra-source-list",standalone:!0,imports:[common.CommonModule,table.p0,icon.Ps,LabelBoxComponent,EmptyBiomarkerComponent],template:'<hra-label-box class="toggle" (click)="toggleTable()">\n  Source Data\n  <mat-icon class="end">\n    {{ showTable ? \'keyboard_arrow_down\' : \'keyboard_arrow_up\' }}\n  </mat-icon>\n</hra-label-box>\n\n<div class="table-content" [class.hidden]="!showTable">\n  <table *ngIf="sources.length !== 0" mat-table [dataSource]="sources">\n    <caption class="sr-only">\n      Source List Table with Title and Links\n    </caption>\n\n    \x3c!-- Position Column --\x3e\n    <ng-container matColumnDef="link">\n      <th class="sr-only" mat-header-cell *matHeaderCellDef>Item Number</th>\n      <td mat-cell *matCellDef="let element; let i = index">{{ i + 1 }}.</td>\n    </ng-container>\n\n    \x3c!-- Data Column --\x3e\n    <ng-container matColumnDef="title">\n      <th class="sr-only" mat-header-cell *matHeaderCellDef>Title and Link</th>\n      <td mat-cell *matCellDef="let element">\n        {{ element.title }}\n        <br />\n        <a [href]="element.link" target="_blank" (click)="sourceLinkClicked(element)">{{ element.label }}</a>\n      </td>\n    </ng-container>\n\n    <tr mat-row *matRowDef="let row; columns: [\'link\', \'title\']"></tr>\n  </table>\n  <hra-empty-biomarker\n    *ngIf="sources.length === 0"\n    [collaborateText]="collaborateText"\n    [message]="message"\n    (collaborateClick)="collaborateClick.emit()"\n  ></hra-empty-biomarker>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[source_list_componentngResource_default()]})],SourceListComponent);const source_list_component_stories={title:"SourceListComponent",component:SourceListComponent},Default=(args=>({props:args})).bind({});Default.args={sources:[{title:"Kidney Precision Medicine Project",label:"Ancillary Study Data, Clinical Data, HRT Codebook",link:"google.com"},{title:"[Dataset Owner Title]",label:"<Dataset Title + Link to Dataset>",link:"google.com"},{title:"[Dataset Owner Title]",label:"<Dataset Title + Link to Dataset>",link:"google.com"},{title:"[Dataset Owner Title but extremely long and wraps around to the next line as you can see here in this example]",label:"<Extremely long dataset title that wraps around to the next line as you can see in this example + link to dataset>",link:"google.com"}]},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => ({\n  props: args\n})",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./libs/components/atoms/src/lib/empty-biomarker/empty-biomarker.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  display: block;\n  padding: 2.625rem 2rem 2.625rem 2rem;\n}\n:host .message {\n  color: #243142;\n}\n:host .collaborate-button {\n  margin-top: 2rem;\n  font-weight: 700;\n  color: #fff;\n  width: 100%;\n  max-width: 20rem;\n  height: 3rem;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/components/atoms/src/lib/label-box/label-box.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  display: flex;\n  align-items: center;\n  padding: 0.75rem 2rem;\n  background: #f8f9fa;\n  font-size: 1rem;\n}\n:host .filler {\n  flex-grow: 1;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/components/molecules/src/lib/source-list/source-list.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  display: block;\n  height: 100%;\n}\n:host .sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n:host .toggle {\n  display: flex;\n  align-items: center;\n  height: 3.5rem;\n  grid-area: source-list-header;\n  color: var(--dark-primary-text);\n  border-top: 0.063rem solid #d3d3d3;\n  border-bottom: 0.063rem solid #d3d3d3;\n}\n:host .table-content {\n  height: calc(100% - 3.5rem);\n  overflow: auto;\n}\n:host .table-content.hidden {\n  display: none;\n}\n:host .table-content table {\n  height: 100%;\n}\n:host .table-content .mat-mdc-cell {\n  vertical-align: top;\n  border: none;\n  padding: 0.25rem 0.875rem;\n  font-size: 1rem;\n}\n:host .table-content ::ng-deep .mdc-data-table__content {\n  display: block;\n  padding: 1rem 0rem;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);