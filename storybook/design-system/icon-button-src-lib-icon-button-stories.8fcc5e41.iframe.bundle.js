(self.webpackChunkhra_ui=self.webpackChunkhra_ui||[]).push([[3993],{"./libs/cdk/app-href/src/lib/app-href.service.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{o:()=>AppHrefService});var tslib__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_current_script__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/cdk/app-href/src/lib/current-script.ts");const INITIAL_APP_HREF=new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("InitialAppHref",{providedIn:"root",factory:()=>(0,_current_script__WEBPACK_IMPORTED_MODULE_1__.T)()});let AppHrefService=class AppHrefService{constructor(){this.initialAppHref=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(INITIAL_APP_HREF),this.appHrefSignal=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(this.initialAppHref),this.appHref=this.appHrefSignal.asReadonly()}setAppHref(href){this.appHrefSignal.set(href)}resetAppHref(){this.setAppHref(this.initialAppHref)}};AppHrefService=(0,tslib__WEBPACK_IMPORTED_MODULE_2__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable)({providedIn:"root"})],AppHrefService)},"./libs/cdk/app-href/src/lib/current-script.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{T:()=>getCurrentScriptBasePath});const currentScriptEl=document.currentScript;let currentScriptPath;function getCurrentScriptPath(){return currentScriptPath??=function findCurrentScriptPath(){if(currentScriptEl&&"src"in currentScriptEl)return currentScriptEl.src;return function findCurrentScriptPathFromStackTrace(){try{throw new Error}catch(error){const{stack}=error,match=stack?.match(/(https?:\/\/.+):\d+:\d+/);return match?.[1]}}()??""}(),currentScriptPath}function getCurrentScriptBasePath(){const fullPath=getCurrentScriptPath(),index=fullPath.lastIndexOf("/");return fullPath.slice(0,index+1)}},"./libs/cdk/icons/src/lib/providers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{EB:()=>provideIcons});var core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),icon=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs"),platform_browser=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/platform-browser.mjs"),app_href_service=__webpack_require__("./libs/cdk/app-href/src/lib/app-href.service.ts");const FONT_ICONS_CONFIG=new core.InjectionToken("FONT_ICONS_CONFIG"),SVG_ICONS_CONFIG=new core.InjectionToken("SVG_ICONS_CONFIG"),DEFAULT_FONT_ICONS_CONFIG={defaultClasses:[]},DEFAULT_SVG_ICONS_CONFIG={directory:"assets/icons"};function registerDefaultFontSetClassesFactory(registry,{defaultClasses}){return()=>{const existingClasses=registry.getDefaultFontSetClass();registry.setDefaultFontSetClass(...defaultClasses,...existingClasses)}}function registerSvgIconResolverFactory(registry,appHrefService,sanitizer,{directory}){return()=>{const resolver=function createSvgIconResolver(config){const{appHref,sanitizer,directory}=config;return(name,namespace)=>{const path=function joinPath(...segments){return segments.join("/").replace(/\/{2,}/g,"/")}(directory,namespace,name)+".svg",url=appHref()+path;return sanitizer.bypassSecurityTrustResourceUrl(url)}}({appHref:appHrefService.appHref,sanitizer,directory});registry.addSvgIconResolver(resolver)}}function provideFontIcons(config){return(0,core.makeEnvironmentProviders)([{provide:FONT_ICONS_CONFIG,useValue:{...DEFAULT_FONT_ICONS_CONFIG,...config}},{provide:core.APP_INITIALIZER,multi:!0,useFactory:registerDefaultFontSetClassesFactory,deps:[icon.tp,FONT_ICONS_CONFIG]}])}function provideSvgIcons(config){return(0,core.makeEnvironmentProviders)([{provide:SVG_ICONS_CONFIG,useValue:{...DEFAULT_SVG_ICONS_CONFIG,...config}},{provide:core.APP_INITIALIZER,multi:!0,useFactory:registerSvgIconResolverFactory,deps:[icon.tp,app_href_service.o,platform_browser.DomSanitizer,SVG_ICONS_CONFIG]}])}function provideIcons(config){return(0,core.makeEnvironmentProviders)([provideFontIcons(config?.fontIcons),provideSvgIcons(config?.svgIcons)])}},"./libs/cdk/styling/src/lib/providers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{b:()=>provideStyleComponents});var _angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_style_component_manager_service__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./libs/cdk/styling/src/lib/style-component-manager.service.ts");function provideStyleComponents(...components){return(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.makeEnvironmentProviders)([{provide:_angular_core__WEBPACK_IMPORTED_MODULE_0__.APP_INITIALIZER,multi:!0,useFactory:()=>{const injector=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector),manager=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_style_component_manager_service__WEBPACK_IMPORTED_MODULE_1__.D);return()=>manager.registerStyleComponents(components,{injector})}}])}},"./libs/cdk/styling/src/lib/style-component-manager.service.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{$:()=>registerStyleComponents,D:()=>StyleComponentManagerService});var tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");function registerStyleComponents(components,options){options?.injector||(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.assertInInjectionContext)(registerStyleComponents);const injector=options?.injector??(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector);return(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(StyleComponentManagerService).registerStyleComponents(components,{injector})}let StyleComponentManagerService=class StyleComponentManagerService{constructor(){this.registry=new Map}registerStyleComponents(components,options){return(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.runInInjectionContext)(options.injector,(()=>{const instanceMap=this.getInstanceMap((0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.ApplicationRef)),environmentInjector=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.EnvironmentInjector);return components.map((component=>this.getInstance(component,instanceMap,environmentInjector)))}))}getInstanceMap(appRef){let instanceMap=this.registry.get(appRef);return instanceMap||(instanceMap=new Map,this.registry.set(appRef,instanceMap),appRef.onDestroy((()=>{this.registry.delete(appRef),instanceMap?.forEach((instance=>instance.destroy()))}))),instanceMap}getInstance(component,instanceMap,environmentInjector){let instance=instanceMap.get(component);return instance||(instance=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.createComponent)(component,{environmentInjector}),instanceMap.set(component,instance)),instance}};StyleComponentManagerService=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable)({providedIn:"root"})],StyleComponentManagerService)},"./libs/design-system/icon-button/src/lib/icon-button-size/icon-button-size.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{o:()=>IconButtonSizeDirective});var tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");const BUTTON_SIZES={small:1.5,medium:2.25,large:2.5},ICON_SIZES={small:1.25,medium:1.5,large:1.5};let IconButtonSizeDirective=class IconButtonSizeDirective{constructor(){this.size=_angular_core__WEBPACK_IMPORTED_MODULE_0__.input.required({alias:"hraIconButtonSize"}),this.buttonSize=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.computed)((()=>BUTTON_SIZES[this.size()])),this.iconSize=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.computed)((()=>ICON_SIZES[this.size()]))}static#_=this.propDecorators={size:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:[{isSignal:!0,alias:"hraIconButtonSize",required:!0,transform:void 0}]}]}};IconButtonSizeDirective=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive)({selector:"[hraIconButtonSize]",standalone:!0,host:{"[style.--mdc-icon-button-state-layer-size.rem]":"buttonSize()","[style.--mdc-icon-button-icon-size.rem]":"iconSize()"}})],IconButtonSizeDirective)},"./libs/design-system/icon-button/src/lib/providers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{q:()=>provideIconButtons});var core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),providers=__webpack_require__("./libs/cdk/styling/src/lib/providers.ts"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),icon_button_styles_componentngResource=__webpack_require__("./libs/design-system/icon-button/src/lib/icon-button-styles/icon-button-styles.component.scss?ngResource"),icon_button_styles_componentngResource_default=__webpack_require__.n(icon_button_styles_componentngResource);let IconButtonStylesComponent=class IconButtonStylesComponent{};function provideIconButtons(){return(0,core.makeEnvironmentProviders)([(0,providers.b)(IconButtonStylesComponent)])}IconButtonStylesComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"hra-icon-button-styles",standalone:!0,template:"",encapsulation:core.ViewEncapsulation.None,changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[icon_button_styles_componentngResource_default()]})],IconButtonStylesComponent)},"./libs/design-system/icon-button/src/lib/icon-button.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Large:()=>Large,Medium:()=>Medium,Small:()=>Small,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),_angular_material_button__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@angular/material/fesm2022/button.mjs"),_angular_material_icon__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs"),_hra_ui_cdk_icons__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/cdk/icons/src/lib/providers.ts"),_storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_icon_button_size_icon_button_size_directive__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./libs/design-system/icon-button/src/lib/icon-button-size/icon-button-size.directive.ts"),_providers__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./libs/design-system/icon-button/src/lib/providers.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"IconButton",args:{icon:"search",size:"large"},argTypes:{icon:{type:"string"},size:{control:"select",options:["small","medium","large"]}},decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.applicationConfig)({providers:[(0,_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.$R)(),(0,_hra_ui_cdk_icons__WEBPACK_IMPORTED_MODULE_2__.EB)({fontIcons:{defaultClasses:["material-symbols-rounded"]}}),(0,_providers__WEBPACK_IMPORTED_MODULE_3__.q)()]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata)({imports:[_angular_material_button__WEBPACK_IMPORTED_MODULE_4__.Hl,_angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.m_,_icon_button_size_icon_button_size_directive__WEBPACK_IMPORTED_MODULE_6__.o]})],render:args=>({props:args,template:`\n      <button mat-icon-button hraIconButtonSize="${args.size}">\n        <mat-icon>${args.icon}</mat-icon>\n      </button>\n    `})},Default={args:{}},Small={args:{size:"small"}},Medium={args:{size:"medium"}},Large={args:{size:"large"}},__namedExportsOrder=["Default","Small","Medium","Large"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {}\n}",...Default.parameters?.docs?.source}}},Small.parameters={...Small.parameters,docs:{...Small.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'small'\n  }\n}",...Small.parameters?.docs?.source}}},Medium.parameters={...Medium.parameters,docs:{...Medium.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'medium'\n  }\n}",...Medium.parameters?.docs?.source}}},Large.parameters={...Large.parameters,docs:{...Large.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'large'\n  }\n}",...Large.parameters?.docs?.source}}}},"./libs/design-system/icon-button/src/lib/icon-button-styles/icon-button-styles.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"button[mat-icon-button] {\n  --mat-icon-button-hover-state-layer-opacity: 0.04;\n  --mat-icon-button-pressed-state-layer-opacity: 0.08;\n  --mat-icon-color: var(--sys-secondary);\n  --mat-icon-button-state-layer-color: var(--sys-secondary);\n  --mat-icon-button-focus-state-layer-opacity: 0;\n}\nbutton[mat-icon-button]:focus-visible {\n  outline: 2px solid var(--sys-tertiary);\n}\nbutton[mat-icon-button] mat-icon {\n  height: var(--mdc-icon-button-icon-size);\n  width: var(--mdc-icon-button-icon-size);\n  font-size: var(--mdc-icon-button-icon-size);\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);