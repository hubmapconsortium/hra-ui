(self.webpackChunkhra_ui=self.webpackChunkhra_ui||[]).push([[8479],{"./libs/cdk/app-href/src/lib/app-href.service.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{o:()=>AppHrefService});var tslib__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_current_script__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/cdk/app-href/src/lib/current-script.ts");const INITIAL_APP_HREF=new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("InitialAppHref",{providedIn:"root",factory:()=>(0,_current_script__WEBPACK_IMPORTED_MODULE_1__.T)()});let AppHrefService=class AppHrefService{constructor(){this.initialAppHref=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(INITIAL_APP_HREF),this.appHrefSignal=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(this.initialAppHref),this.appHref=this.appHrefSignal.asReadonly()}setAppHref(href){this.appHrefSignal.set(href)}resetAppHref(){this.setAppHref(this.initialAppHref)}};AppHrefService=(0,tslib__WEBPACK_IMPORTED_MODULE_2__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable)({providedIn:"root"})],AppHrefService)},"./libs/cdk/app-href/src/lib/asset-url.pipe.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{i:()=>AssetUrlPipe});var tslib__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),ngxtension_computed_previous__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/ngxtension/fesm2022/ngxtension-computed-previous.mjs"),_app_href_service__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/cdk/app-href/src/lib/app-href.service.ts");let AssetUrlPipe=class AssetUrlPipe{constructor(){this.appHref=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_app_href_service__WEBPACK_IMPORTED_MODULE_1__.o).appHref,this.prevHref=(0,ngxtension_computed_previous__WEBPACK_IMPORTED_MODULE_2__.B)(this.appHref),this.cdr=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef),this.markChangeRef=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.effect)((()=>{null!==this.prevHref()&&this.cdr.markForCheck()}))}transform(path,type){const url=`${this.appHref()}${path}`;return"css"===type?`url("${url}")`:url}};AssetUrlPipe=(0,tslib__WEBPACK_IMPORTED_MODULE_3__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Pipe)({name:"assetUrl",standalone:!0,pure:!1})],AssetUrlPipe)},"./libs/cdk/app-href/src/lib/current-script.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{T:()=>getCurrentScriptBasePath});const currentScriptEl=document.currentScript;let currentScriptPath;function getCurrentScriptPath(){return currentScriptPath??=function findCurrentScriptPath(){if(currentScriptEl&&"src"in currentScriptEl)return currentScriptEl.src;return function findCurrentScriptPathFromStackTrace(){try{throw new Error}catch(error){const{stack}=error,match=stack?.match(/(https?:\/\/.+):\d+:\d+/);return match?.[1]}}()??""}(),currentScriptPath}function getCurrentScriptBasePath(){const fullPath=getCurrentScriptPath(),index=fullPath.lastIndexOf("/");return fullPath.slice(0,index+1)}},"./libs/design-system/app-logos/src/lib/app-logos.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{x:()=>AppLogosComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var app_logos_componentngResource=__webpack_require__("./libs/design-system/app-logos/src/lib/app-logos.component.scss?ngResource"),app_logos_componentngResource_default=__webpack_require__.n(app_logos_componentngResource),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),asset_url_pipe=__webpack_require__("./libs/cdk/app-href/src/lib/asset-url.pipe.ts");let AppLogosComponent=class AppLogosComponent{constructor(){this.variant=(0,core.input)("default"),this.appLink=core.input.required(),this.appIcon=core.input.required(),this.appTitle=core.input.required(),this.appDescription=(0,core.input)()}static#_=this.propDecorators={variant:[{type:core.Input,args:[{isSignal:!0,alias:"variant",required:!1,transform:void 0}]}],appLink:[{type:core.Input,args:[{isSignal:!0,alias:"appLink",required:!0,transform:void 0}]}],appIcon:[{type:core.Input,args:[{isSignal:!0,alias:"appIcon",required:!0,transform:void 0}]}],appTitle:[{type:core.Input,args:[{isSignal:!0,alias:"appTitle",required:!0,transform:void 0}]}],appDescription:[{type:core.Input,args:[{isSignal:!0,alias:"appDescription",required:!1,transform:void 0}]}]}};AppLogosComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"hra-app-logos",standalone:!0,imports:[common.CommonModule,asset_url_pipe.i],template:'<a\n  class="hra-logo"\n  href="https://humanatlas.io"\n  target="_blank"\n  rel="noopener noreferrer"\n  aria-label="Visit Human Reference Atlas"\n>\n  <img [attr.src]="\'assets/logo/hra_small.svg\' | assetUrl" [attr.alt]="\'HRA logo\'" class="hra-small" />\n  <span class="hra-logo-text">Human Reference Atlas</span>\n</a>\n<a class="app-logo" [href]="appLink()" target="_blank" rel="noopener noreferrer" aria-label="Return to app home">\n  <img [attr.src]="appIcon() | assetUrl" [attr.alt]="appTitle() + \' logo\'" />\n  <span>\n    <div class="mat-caption app-label">{{ appTitle() }}</div>\n    @if (appDescription()) {\n      <div class="mat-caption app-description">{{ appDescription() }}</div>\n    }\n  </span>\n</a>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,host:{"[attr.variant]":"variant()"},styles:[app_logos_componentngResource_default()]})],AppLogosComponent)},"./node_modules/css-loader/dist/runtime/api.js":module=>{"use strict";module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/css-loader/dist/runtime/noSourceMaps.js":module=>{"use strict";module.exports=function(i){return i[1]}},"./node_modules/ngxtension/fesm2022/ngxtension-computed-previous.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{B:()=>computedPrevious});var _angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");function computedPrevious(s){let current=null,previous=null;return(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.computed)((()=>{const value=s();return value!==current&&(previous=current,current=value),previous}))}},"./libs/design-system/app-logos/src/lib/app-logos.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Fixed:()=>Fixed,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={component:__webpack_require__("./libs/design-system/app-logos/src/lib/app-logos.component.ts").x,title:"AppLogosComponent",parameters:{design:{type:"figma",url:"https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=75-4"}},argTypes:{appLink:{control:"select",options:["https://apps.humanatlas.io/ftu-explorer/#/","https://apps.humanatlas.io/cde/","https://apps.humanatlas.io/dashboard/"]},appIcon:{control:"select",options:["assets/logo/ftu_logo.svg","assets/logo/cde_logo.svg","assets/logo/dashboards_logo.svg"]},appTitle:{control:"select",options:["FTU Explorer","Cell Distance Explorer","Dashboards"]}},args:{appLink:"https://apps.humanatlas.io/ftu-explorer/#/",appIcon:"assets/logo/ftu_logo.svg",appTitle:"FTU Explorer",appDescription:"HRA Preview Application"}},Default={},Fixed={args:{variant:"fixed"}},__namedExportsOrder=["Default","Fixed"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{}",...Default.parameters?.docs?.source}}},Fixed.parameters={...Fixed.parameters,docs:{...Fixed.parameters?.docs,source:{originalSource:"{\n  args: {\n    variant: 'fixed'\n  }\n}",...Fixed.parameters?.docs?.source}}}},"./libs/design-system/app-logos/src/lib/app-logos.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  display: flex;\n  height: 3rem;\n}\n:host > a {\n  display: inline-block;\n}\n:host .hra-logo,\n:host .app-logo {\n  display: inline-flex;\n  color: var(--sys-secondary);\n}\n:host .hra-logo {\n  width: 7.25rem;\n  margin-right: 0.5rem;\n}\n:host .hra-logo .hra-logo-text {\n  font: var(--sys-label-small);\n  letter-spacing: var(--sys-label-small-tracking);\n  line-height: 0.875rem;\n  width: min-content;\n  align-self: center;\n  margin: 0 auto;\n}\n:host .app-logo span {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n:host .app-logo img {\n  margin-right: 0.75rem;\n}\n:host .app-logo .app-label {\n  font: var(--sys-title-medium);\n  letter-spacing: var(--sys-title-medium-tracking);\n}\n:host .app-logo .app-description {\n  font: var(--sys-label-medium);\n  letter-spacing: var(--sys-label-medium-tracking);\n  color: var(--sys-on-secondary-fixed);\n}\n@media (max-width: 1012px) {\n  :host[variant=default] {\n    height: 2.375rem;\n  }\n  :host[variant=default] .hra-logo {\n    width: fit-content;\n    margin-right: 0.25rem;\n  }\n  :host[variant=default] .hra-logo .hra-logo-text {\n    display: none;\n  }\n  :host[variant=default] .app-logo img {\n    margin-right: 0.5rem;\n  }\n  :host[variant=default] .app-logo .app-label {\n    font: var(--sys-title-small);\n    letter-spacing: var(--sys-title-small-tracking);\n  }\n  :host[variant=default] .app-logo .app-description {\n    font: var(--sys-label-small);\n    letter-spacing: var(--sys-label-small-tracking);\n  }\n}\n:host[variant=fixed] .hra-logo {\n  width: fit-content;\n  margin-right: 0.25rem;\n}\n:host[variant=fixed] .hra-logo .hra-logo-text {\n  display: none;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);