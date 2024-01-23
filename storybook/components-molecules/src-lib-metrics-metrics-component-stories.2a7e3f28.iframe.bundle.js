(self.webpackChunkhra_ui=self.webpackChunkhra_ui||[]).push([[442],{"./node_modules/css-loader/dist/runtime/api.js":module=>{"use strict";module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/css-loader/dist/runtime/noSourceMaps.js":module=>{"use strict";module.exports=function(i){return i[1]}},"./libs/components/molecules/src/lib/metrics/metrics.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>metrics_component_stories});var dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var metrics_componentngResource=__webpack_require__("./libs/components/molecules/src/lib/metrics/metrics.component.scss?ngResource"),metrics_componentngResource_default=__webpack_require__.n(metrics_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs");let MetricsComponent=class MetricsComponent{constructor(){this.title="",this.logo="",this.metrics=[],this.baseHref=""}static#_=this.propDecorators={title:[{type:core.Input}],logo:[{type:core.Input}],metrics:[{type:core.Input}],baseHref:[{type:core.Input}]}};MetricsComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"hra-metrics",standalone:!0,imports:[common.CommonModule],template:'<img class="logo" [src]="logo" alt="" />\n<span class="header-title">{{ title }}</span>\n\n<div class="metrics">\n  <div class="metric" *ngFor="let item of metrics">\n    <img class="logo" [src]="baseHref + item.icon" alt="" />\n    <span class="value"> {{ item.value }} </span>\n    <span class="description"> {{ item.description }} </span>\n  </div>\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[metrics_componentngResource_default()]})],MetricsComponent);const metrics_component_stories={title:"MetricsComponent",component:MetricsComponent,decorators:[(0,dist.moduleMetadata)({imports:[]})]},Primary=(args=>({props:args})).bind({});Primary.args={logo:"/assets/logo.svg",title:"Metrics of the Human Reference Atlas",metrics:[{icon:"/assets/diversity.svg",value:"17",description:"consortia"},{icon:"/assets/publications.svg",value:"1,000+",description:"publications"},{icon:"/assets/experts.svg",value:"250+",description:"experts"},{icon:"/assets/structures.svg",value:"2,665",description:"anatomical structures"},{icon:"/assets/celltypes.svg",value:"953",description:"cell types"},{icon:"/assets/biomarkers.svg",value:"2,842",description:"biomarkers"}]},Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:"(args: MetricsComponent) => ({\n  props: args\n})",...Primary.parameters?.docs?.source}}};const __namedExportsOrder=["Primary"]},"./libs/components/molecules/src/lib/metrics/metrics.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 2rem 0 0 0;\n  background: #f8f9fa;\n  gap: 0.5rem;\n}\n:host .logo {\n  height: 2.75rem;\n}\n:host .header-title {\n  font-size: 2rem;\n  line-height: 2.5rem;\n  text-align: center;\n}\n:host .metrics {\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  gap: 3%;\n  padding: 2rem 1.75rem;\n}\n:host .metrics .metric {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  min-width: 14.2857142857%;\n  height: 14.75rem;\n  padding-top: 2rem;\n  padding-bottom: 2rem;\n}\n:host .metrics .metric .logo {\n  margin-bottom: 2rem;\n}\n:host .metrics .metric .value {\n  font-size: 3rem;\n  line-height: 4rem;\n  margin-bottom: 0.25rem;\n}\n:host .metrics .metric .description {\n  font-size: 1rem;\n  text-align: center;\n}\n@media (max-width: 1400px) {\n  :host .metrics {\n    flex-wrap: wrap;\n  }\n  :host .metrics .metric {\n    width: 31%;\n  }\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);