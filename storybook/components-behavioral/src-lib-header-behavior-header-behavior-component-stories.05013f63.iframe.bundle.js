(self.webpackChunkhra_ui=self.webpackChunkhra_ui||[]).push([[854],{"./libs/cdk/injectors/src/lib/dispatch/dispatch.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{WI:()=>dispatch});var _angular_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_ngxs_store__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@ngxs/store/fesm2015/ngxs-store.js");function identity(value){return value}function createActionFactory(type,boundArgs){return(...args)=>new type(...boundArgs,...args)}function dispatchImpl(actionFactory,resultHandler){const store=(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__.yh);return(...args)=>{const action=actionFactory(...args),obs$=store.dispatch(action);return resultHandler(action,obs$)}}function dispatch(type,...boundArgs){return dispatchImpl(createActionFactory(type,boundArgs),identity)}},"./libs/cdk/src/lib/link/link.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{I:()=>LinkDirective});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),select_snapshot=__webpack_require__("./libs/cdk/injectors/src/lib/select/select-snapshot.ts"),dispatch=__webpack_require__("./libs/cdk/injectors/src/lib/dispatch/dispatch.ts"),link_registry_model=__webpack_require__("./libs/cdk/state/src/link-registry/link-registry.model.ts"),ngxs_store=__webpack_require__("./node_modules/@ngxs/store/fesm2015/ngxs-store.js"),link_registry_state=__webpack_require__("./libs/cdk/state/src/link-registry/link-registry.state.ts");class LinkRegistrySelectors{static query(state){return(id,type)=>this.getEntry(state,id,type)}static getEntry(state,id,type){const entry=state[id];return void 0===type||entry?.type===type?entry:void 0}}(0,tslib_es6.gn)([(0,ngxs_store.Qf)([link_registry_state.V]),(0,tslib_es6.w6)("design:type",Function),(0,tslib_es6.w6)("design:paramtypes",[Object]),(0,tslib_es6.w6)("design:returntype",Function)],LinkRegistrySelectors,"query",null);var link_registry_actions=__webpack_require__("./libs/cdk/state/src/link-registry/link-registry.actions.ts"),create=__webpack_require__("./libs/shared/utils/src/lib/url/create.ts");let LinkDirective=class LinkDirective{constructor(){this.linkId=link_registry_model.Ry,this.injector=(0,core.inject)(core.Injector),this.tagName=(0,core.inject)(core.ElementRef).nativeElement.tagName.toLowerCase(),this.queryLink=(0,select_snapshot.w)(LinkRegistrySelectors.query),this.navigate=(0,dispatch.WI)(link_registry_actions.Fg)}get isAnchorElement(){return["a","area"].includes(this.tagName)}get isResourceUrl(){return["base","link"].includes(this.tagName)}get extras(){const{link}=this;return this.mergeExtras(link?.type===link_registry_model.Un.Internal?link.extras:void 0,this)}ngDoCheck(){const link=this.queryLink(this.linkId);this.link!==link&&this.updateLink(link)}onClick(event){const{link,linkId,isAnchorElement}=this;if(!link)return!0;if(isAnchorElement){const{button,ctrlKey,shiftKey,altKey,metaKey}=event;if(link.type===link_registry_model.Un.External||0!==button||ctrlKey||shiftKey||altKey||metaKey)return!0}return this.navigate(linkId,this.extras),!isAnchorElement}updateLink(link){this.link=link,({href:this.href,rel:this.rel,target:this.target}=this.getLinkAttributes(link))}getLinkAttributes(link){const{injector,extras,isResourceUrl}=this;switch(link?.type){case link_registry_model.Un.Internal:return{href:(0,create.L)(injector,link.commands,extras,isResourceUrl)};case link_registry_model.Un.External:return{...link,href:(0,create.D)(link.url,extras)};default:return{}}}mergeExtras(opt1,opt2){const result={...opt1},mergeKey=key=>{void 0!==opt2[key]&&(result[key]=opt2[key])};return mergeKey("queryParams"),mergeKey("queryParamsHandling"),mergeKey("fragment"),mergeKey("preserveFragment"),mergeKey("relativeTo"),result}static#_=this.propDecorators={linkId:[{type:core.Input,args:["hraLink"]}],queryParams:[{type:core.Input}],queryParamsHandling:[{type:core.Input}],fragment:[{type:core.Input}],preserveFragment:[{type:core.Input}],relativeTo:[{type:core.Input}],href:[{type:core.HostBinding,args:["attr.href"]}],rel:[{type:core.HostBinding,args:["attr.rel"]}],target:[{type:core.HostBinding,args:["attr.target"]}],onClick:[{type:core.HostListener,args:["click",["$event"]]}]}};LinkDirective=(0,tslib_es6.gn)([(0,core.Directive)({selector:"[hraLink]",standalone:!0})],LinkDirective)},"./libs/cdk/state/src/link-registry/link-registry.actions.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{AU:()=>LoadFromYaml,Fg:()=>Navigate,Gg:()=>AddMany,mm:()=>Add,tI:()=>AddFromYaml});const Action=(0,__webpack_require__("./libs/cdk/state/src/actions/actions.ts").W)("LinkRegistry");class Add extends(Action("Add")){constructor(id,entry){super(),this.id=id,this.entry=entry}}class AddMany extends(Action("Add Many")){constructor(entries){super(),this.entries=entries}}class AddFromYaml extends(Action("Add from Yaml")){constructor(yaml){super(),this.yaml=yaml}}class LoadFromYaml extends(Action("Load from Yaml")){constructor(url){super(),this.url=url}}class Navigate extends(Action("Navigate")){constructor(id,extras={}){super(),this.id=id,this.extras=extras}}},"./libs/cdk/state/src/link-registry/link-registry.model.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{HW:()=>createLinkId,Ry:()=>EMPTY_LINK,Un:()=>LinkType,l$:()=>LINK_REGISTRY_SCHEMA});var LinkType,zod__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/zod/lib/index.mjs");!function(LinkType){LinkType.Internal="internal",LinkType.External="external"}(LinkType||(LinkType={}));const EXTERNAL_LINK_SCHEMA=zod__WEBPACK_IMPORTED_MODULE_0__.z.object({type:zod__WEBPACK_IMPORTED_MODULE_0__.z.literal(LinkType.External),url:zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),rel:zod__WEBPACK_IMPORTED_MODULE_0__.z.string().default("noopener"),target:zod__WEBPACK_IMPORTED_MODULE_0__.z.string()}).partial({rel:!0,target:!0}),INTERNAL_LINK_SCHEMA=zod__WEBPACK_IMPORTED_MODULE_0__.z.object({type:zod__WEBPACK_IMPORTED_MODULE_0__.z.literal(LinkType.Internal),commands:zod__WEBPACK_IMPORTED_MODULE_0__.z.any().array(),extras:zod__WEBPACK_IMPORTED_MODULE_0__.z.object({queryParams:zod__WEBPACK_IMPORTED_MODULE_0__.z.record(zod__WEBPACK_IMPORTED_MODULE_0__.z.any()).nullable(),fragment:zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),queryParamsHandling:zod__WEBPACK_IMPORTED_MODULE_0__.z.enum(["merge","preserve",""]).nullable(),preserveFragment:zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean(),onSameUrlNavigation:zod__WEBPACK_IMPORTED_MODULE_0__.z.literal("reload"),skipLocationChange:zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean(),replaceUrl:zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean()}).partial()}).partial({extras:!0}),LINK_REGISTRY_SCHEMA=zod__WEBPACK_IMPORTED_MODULE_0__.z.record(zod__WEBPACK_IMPORTED_MODULE_0__.z.string().transform((id=>`LinkId:'${id}'`)).brand("LinkId"),zod__WEBPACK_IMPORTED_MODULE_0__.z.discriminatedUnion("type",[EXTERNAL_LINK_SCHEMA,INTERNAL_LINK_SCHEMA]));function createLinkId(id){return LINK_REGISTRY_SCHEMA.keySchema.parse(id)}const EMPTY_LINK=createLinkId("@@__EMPTY__")},"./libs/cdk/state/src/link-registry/link-registry.state.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{V:()=>LinkRegistryState});var _home_runner_work_hra_ui_hra_ui_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),tslib__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_common_http__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_router__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@angular/router/fesm2022/router.mjs"),_hra_ui_utils__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./libs/shared/utils/src/lib/url/create.ts"),_ngxs_store__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@ngxs/store/fesm2015/ngxs-store.js"),js_yaml__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/js-yaml/dist/js-yaml.mjs"),rxjs__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js"),rxjs__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Observable.js"),_link_registry_actions__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./libs/cdk/state/src/link-registry/link-registry.actions.ts"),_link_registry_model__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./libs/cdk/state/src/link-registry/link-registry.model.ts");let LinkRegistryState=class LinkRegistryState{constructor(){this.http=(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.eN),this.router=(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_4__.F0,{optional:!0}),this.zone=(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgZone)}addOne(ctx,{id,entry}){this.addMany(ctx,new _link_registry_actions__WEBPACK_IMPORTED_MODULE_5__.Gg({[id]:entry}))}addMany(ctx,{entries}){ctx.patchState(entries)}addYaml(ctx,{yaml},filename){const data=(0,js_yaml__WEBPACK_IMPORTED_MODULE_1__.zD)(yaml,{filename}),entries=_link_registry_model__WEBPACK_IMPORTED_MODULE_6__.l$.parse(data);this.addMany(ctx,new _link_registry_actions__WEBPACK_IMPORTED_MODULE_5__.Gg(entries))}loadYaml(ctx,{url}){return this.http.get(url,{responseType:"text"}).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.U)((data=>this.addYaml(ctx,new _link_registry_actions__WEBPACK_IMPORTED_MODULE_5__.tI(data),url))))}navigate(ctx,{id,extras}){var _this=this;return(0,_home_runner_work_hra_ui_hra_ui_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__.Z)((function*(){const entry=ctx.getState()[id];switch(entry?.type){case _link_registry_model__WEBPACK_IMPORTED_MODULE_6__.Un.Internal:yield _this.navigateToInternal(entry,extras);break;case _link_registry_model__WEBPACK_IMPORTED_MODULE_6__.Un.External:_this.navigateToExternal(entry,extras);break;default:throw new Error(`Cannot navigate to non-existing link '${id}'`)}}))()}navigateToInternal(entry,extras){var _this2=this;return(0,_home_runner_work_hra_ui_hra_ui_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__.Z)((function*(){yield _this2.zone.run((()=>_this2.router?.navigate(entry.commands,{...entry.extras,...extras})))}))()}navigateToExternal(entry,extras){const url=(0,_hra_ui_utils__WEBPACK_IMPORTED_MODULE_9__.D)(entry.url,extras);window.open(url,entry.target,entry.rel)}};(0,tslib__WEBPACK_IMPORTED_MODULE_10__.gn)([(0,_ngxs_store__WEBPACK_IMPORTED_MODULE_0__.aU)(_link_registry_actions__WEBPACK_IMPORTED_MODULE_5__.mm),(0,tslib__WEBPACK_IMPORTED_MODULE_10__.w6)("design:type",Function),(0,tslib__WEBPACK_IMPORTED_MODULE_10__.w6)("design:paramtypes",[Object,_link_registry_actions__WEBPACK_IMPORTED_MODULE_5__.mm]),(0,tslib__WEBPACK_IMPORTED_MODULE_10__.w6)("design:returntype",void 0)],LinkRegistryState.prototype,"addOne",null),(0,tslib__WEBPACK_IMPORTED_MODULE_10__.gn)([(0,_ngxs_store__WEBPACK_IMPORTED_MODULE_0__.aU)(_link_registry_actions__WEBPACK_IMPORTED_MODULE_5__.Gg),(0,tslib__WEBPACK_IMPORTED_MODULE_10__.w6)("design:type",Function),(0,tslib__WEBPACK_IMPORTED_MODULE_10__.w6)("design:paramtypes",[Object,_link_registry_actions__WEBPACK_IMPORTED_MODULE_5__.Gg]),(0,tslib__WEBPACK_IMPORTED_MODULE_10__.w6)("design:returntype",void 0)],LinkRegistryState.prototype,"addMany",null),(0,tslib__WEBPACK_IMPORTED_MODULE_10__.gn)([(0,_ngxs_store__WEBPACK_IMPORTED_MODULE_0__.aU)(_link_registry_actions__WEBPACK_IMPORTED_MODULE_5__.tI),(0,tslib__WEBPACK_IMPORTED_MODULE_10__.w6)("design:type",Function),(0,tslib__WEBPACK_IMPORTED_MODULE_10__.w6)("design:paramtypes",[Object,_link_registry_actions__WEBPACK_IMPORTED_MODULE_5__.tI,String]),(0,tslib__WEBPACK_IMPORTED_MODULE_10__.w6)("design:returntype",void 0)],LinkRegistryState.prototype,"addYaml",null),(0,tslib__WEBPACK_IMPORTED_MODULE_10__.gn)([(0,_ngxs_store__WEBPACK_IMPORTED_MODULE_0__.aU)(_link_registry_actions__WEBPACK_IMPORTED_MODULE_5__.AU),(0,tslib__WEBPACK_IMPORTED_MODULE_10__.w6)("design:type",Function),(0,tslib__WEBPACK_IMPORTED_MODULE_10__.w6)("design:paramtypes",[Object,_link_registry_actions__WEBPACK_IMPORTED_MODULE_5__.AU]),(0,tslib__WEBPACK_IMPORTED_MODULE_10__.w6)("design:returntype",rxjs__WEBPACK_IMPORTED_MODULE_11__.y)],LinkRegistryState.prototype,"loadYaml",null),(0,tslib__WEBPACK_IMPORTED_MODULE_10__.gn)([(0,_ngxs_store__WEBPACK_IMPORTED_MODULE_0__.aU)(_link_registry_actions__WEBPACK_IMPORTED_MODULE_5__.Fg),(0,tslib__WEBPACK_IMPORTED_MODULE_10__.w6)("design:type",Function),(0,tslib__WEBPACK_IMPORTED_MODULE_10__.w6)("design:paramtypes",[Object,_link_registry_actions__WEBPACK_IMPORTED_MODULE_5__.Fg]),(0,tslib__WEBPACK_IMPORTED_MODULE_10__.w6)("design:returntype",Promise)],LinkRegistryState.prototype,"navigate",null),LinkRegistryState=(0,tslib__WEBPACK_IMPORTED_MODULE_10__.gn)([(0,_ngxs_store__WEBPACK_IMPORTED_MODULE_0__.ZM)({name:"linkRegistry",defaults:{}}),(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)()],LinkRegistryState)},"./libs/shared/utils/src/lib/url/create.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{D:()=>createExternalUrl,L:()=>createInternalUrl});var _angular_common__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/platform-browser.mjs"),_angular_router__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/router/fesm2022/router.mjs");function setQueryParams(dest,params){for(const[key,value]of Object.entries(params??{}))null!=value&&dest.set(key,`${value}`)}function createInternalUrl(injector,commands,extras,isResourceUrl){const router=injector.get(_angular_router__WEBPACK_IMPORTED_MODULE_0__.F0,null),locationStrategy=injector.get(_angular_common__WEBPACK_IMPORTED_MODULE_1__.LocationStrategy,null),sanitizer=injector.get(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__.DomSanitizer),route=extras.relativeTo??injector.get(_angular_router__WEBPACK_IMPORTED_MODULE_0__.gz,null),securityContext=isResourceUrl?_angular_core__WEBPACK_IMPORTED_MODULE_3__.SecurityContext.RESOURCE_URL:_angular_core__WEBPACK_IMPORTED_MODULE_3__.SecurityContext.URL;if(!router||!locationStrategy)return;const tree=router.createUrlTree(commands,{...extras,relativeTo:route}),url=locationStrategy.prepareExternalUrl(router.serializeUrl(tree));return sanitizer.sanitize(securityContext,url)??void 0}function createExternalUrl(url,extras){const{fragment,preserveFragment,queryParams,queryParamsHandling}=extras,result=new URL(url);return void 0===fragment&&!1!==preserveFragment||(result.hash=fragment??""),""===queryParamsHandling?(result.search="",setQueryParams(result.searchParams,queryParams)):"preserve"!==queryParamsHandling&&setQueryParams(result.searchParams,queryParams),result.toString()}},"./libs/state/src/lib/link-ids.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{About:()=>About,Embed:()=>Embed,ExploreFTU:()=>ExploreFTU,Illustration:()=>Illustration,LandingPage:()=>LandingPage,LandingPageReadMore:()=>LandingPageReadMore,Portal:()=>Portal,ProductTitle:()=>ProductTitle});var _hra_ui_cdk_state__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./libs/cdk/state/src/link-registry/link-registry.model.ts");const LandingPage=(0,_hra_ui_cdk_state__WEBPACK_IMPORTED_MODULE_0__.HW)("LandingPage"),ProductTitle=(0,_hra_ui_cdk_state__WEBPACK_IMPORTED_MODULE_0__.HW)("ProductTitle"),About=(0,_hra_ui_cdk_state__WEBPACK_IMPORTED_MODULE_0__.HW)("About"),Portal=(0,_hra_ui_cdk_state__WEBPACK_IMPORTED_MODULE_0__.HW)("Portal"),Illustration=(0,_hra_ui_cdk_state__WEBPACK_IMPORTED_MODULE_0__.HW)("Illustration"),Embed=(0,_hra_ui_cdk_state__WEBPACK_IMPORTED_MODULE_0__.HW)("Embed"),ExploreFTU=(0,_hra_ui_cdk_state__WEBPACK_IMPORTED_MODULE_0__.HW)("ExploreFTU"),LandingPageReadMore=(0,_hra_ui_cdk_state__WEBPACK_IMPORTED_MODULE_0__.HW)("LandingPageReadMore")},"./node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>fromEvent});var tslib__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_observable_innerFrom__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js"),_Observable__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Observable.js"),_operators_mergeMap__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js"),_util_isArrayLike__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js"),_util_isFunction__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/isFunction.js"),_util_mapOneOrManyArgs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js"),nodeEventEmitterMethods=["addListener","removeListener"],eventTargetMethods=["addEventListener","removeEventListener"],jqueryMethods=["on","off"];function fromEvent(target,eventName,options,resultSelector){if((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.m)(options)&&(resultSelector=options,options=void 0),resultSelector)return fromEvent(target,eventName,options).pipe((0,_util_mapOneOrManyArgs__WEBPACK_IMPORTED_MODULE_1__.Z)(resultSelector));var _a=(0,tslib__WEBPACK_IMPORTED_MODULE_2__.CR)(function isEventTarget(target){return(0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.m)(target.addEventListener)&&(0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.m)(target.removeEventListener)}(target)?eventTargetMethods.map((function(methodName){return function(handler){return target[methodName](eventName,handler,options)}})):function isNodeStyleEventEmitter(target){return(0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.m)(target.addListener)&&(0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.m)(target.removeListener)}(target)?nodeEventEmitterMethods.map(toCommonHandlerRegistry(target,eventName)):function isJQueryStyleEventEmitter(target){return(0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.m)(target.on)&&(0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.m)(target.off)}(target)?jqueryMethods.map(toCommonHandlerRegistry(target,eventName)):[],2),add=_a[0],remove=_a[1];if(!add&&(0,_util_isArrayLike__WEBPACK_IMPORTED_MODULE_3__.z)(target))return(0,_operators_mergeMap__WEBPACK_IMPORTED_MODULE_4__.z)((function(subTarget){return fromEvent(subTarget,eventName,options)}))((0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_5__.Xf)(target));if(!add)throw new TypeError("Invalid event target");return new _Observable__WEBPACK_IMPORTED_MODULE_6__.y((function(subscriber){var handler=function(){for(var args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments[_i];return subscriber.next(1<args.length?args:args[0])};return add(handler),function(){return remove(handler)}}))}function toCommonHandlerRegistry(target,eventName){return function(methodName){return function(handler){return target[methodName](eventName,handler)}}}},"./libs/components/behavioral/src/lib/header-behavior/header-behavior.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>header_behavior_component_stories});var resource_registry_state=__webpack_require__("./libs/cdk/state/src/resource-registry/resource-registry.state.ts"),link_registry_state=__webpack_require__("./libs/cdk/state/src/link-registry/link-registry.state.ts"),resource_registry_actions=__webpack_require__("./libs/cdk/state/src/resource-registry/resource-registry.actions.ts"),link_registry_actions=__webpack_require__("./libs/cdk/state/src/link-registry/link-registry.actions.ts"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var header_behavior_componentngResource=__webpack_require__("./libs/components/behavioral/src/lib/header-behavior/header-behavior.component.scss?ngResource"),header_behavior_componentngResource_default=__webpack_require__.n(header_behavior_componentngResource),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),select_snapshot=__webpack_require__("./libs/cdk/injectors/src/lib/select/select-snapshot.ts"),resource_registry_selectors=__webpack_require__("./libs/cdk/state/src/resource-registry/resource-registry.selectors.ts");var header_componentngResource=__webpack_require__("./libs/components/molecules/src/lib/header/header.component.scss?ngResource"),header_componentngResource_default=__webpack_require__.n(header_componentngResource),fesm2022_button=__webpack_require__("./node_modules/@angular/material/fesm2022/button.mjs"),fesm2022_core=__webpack_require__("./node_modules/@angular/material/fesm2022/core.mjs"),icon=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs"),link_directive=__webpack_require__("./libs/cdk/src/lib/link/link.directive.ts"),link_registry_model=__webpack_require__("./libs/cdk/state/src/link-registry/link-registry.model.ts"),ngx_google_analytics=__webpack_require__("./node_modules/ngx-google-analytics/fesm2020/ngx-google-analytics.mjs");let HeaderComponent=class HeaderComponent{constructor(){this.productLogoUrl="",this.productTitle="",this.appTitle="",this.productTitleLink=link_registry_model.Ry,this.aboutLink=link_registry_model.Ry,this.ga=(0,core.inject)(ngx_google_analytics.$r)}aboutClicked(){this.ga.event("about_icon_click","link_click")}static#_=this.propDecorators={productLogoUrl:[{type:core.Input}],productTitle:[{type:core.Input}],appTitle:[{type:core.Input}],productTitleLink:[{type:core.Input}],aboutLink:[{type:core.Input}]}};HeaderComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"hra-header",standalone:!0,imports:[common.CommonModule,fesm2022_button.ot,icon.Ps,fesm2022_core.si,link_directive.I],template:'<a class="product" matRipple [hraLink]="productTitleLink">\n  <img class="logo image" [src]="productLogoUrl" alt="Product Logo" aria-hidden="true" />\n  <h1 class="text">{{ productTitle }}</h1>\n</a>\n<h1 class="app text">{{ appTitle }}</h1>\n\n<div class="filler"></div>\n\n<a mat-flat-button class="about" [hraLink]="aboutLink" (click)="aboutClicked()">\n  <mat-icon class="icon">info_outlined</mat-icon>\n  <span class="text">About</span>\n</a>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[header_componentngResource_default()]})],HeaderComponent);var resource_ids=__webpack_require__("./libs/state/src/lib/resource-ids.ts"),link_ids=__webpack_require__("./libs/state/src/lib/link-ids.ts");let HeaderBehaviorComponent=class HeaderBehaviorComponent{constructor(){this.productLogoUrl=(0,select_snapshot.w)(resource_registry_selectors.S.url,resource_ids.Dw),this.productTitle=(0,select_snapshot.w)(resource_registry_selectors.S.anyText,resource_ids.tc),this.appTitle=(0,select_snapshot.w)(resource_registry_selectors.S.anyText,resource_ids.dC),this.productTitleLink=link_ids.ProductTitle,this.aboutLink=link_ids.About}};HeaderBehaviorComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"ftu-header-behavior",standalone:!0,imports:[common.CommonModule,HeaderComponent],template:'<hra-header\n  [productLogoUrl]="productLogoUrl()"\n  [productTitle]="productTitle()"\n  [appTitle]="appTitle()"\n  [productTitleLink]="productTitleLink"\n  [aboutLink]="aboutLink"\n>\n</hra-header>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,styles:[header_behavior_componentngResource_default()]})],HeaderBehaviorComponent);const header_behavior_component_stories={title:"HeaderBehaviorComponent",component:HeaderBehaviorComponent,parameters:{state:{states:[resource_registry_state.E,link_registry_state.V],actions:[new resource_registry_actions.AU("assets/resources/header.yml"),new link_registry_actions.AU("assets/links/header.yml")]}}},Primary=(args=>({props:args})).bind({});Primary.args={},Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:"(args: HeaderBehaviorComponent) => ({\n  props: args\n})",...Primary.parameters?.docs?.source}}};const __namedExportsOrder=["Primary"]},"./libs/components/behavioral/src/lib/header-behavior/header-behavior.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  display: block;\n  position: fixed;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./libs/components/molecules/src/lib/header/header.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  display: flex;\n  align-items: center;\n  height: 4.5rem;\n  padding: 0 2rem;\n}\n:host .filler {\n  flex-grow: 1;\n}\n:host h1 {\n  margin: 0;\n}\n:host .product {\n  display: flex;\n  align-items: center;\n  text-decoration: none;\n  padding: 0 1rem;\n  border-radius: 0.25rem;\n}\n:host .product:hover {\n  cursor: pointer;\n}\n:host .product .text {\n  margin-left: 1rem;\n  font-weight: 600;\n  color: var(--palette-accent-A200-rgb);\n}\n:host .app {\n  margin-left: 0.5rem;\n}\n:host .about {\n  width: 9rem;\n  height: 3rem;\n  text-decoration: none;\n}\n:host .about span {\n  border-bottom: 1px solid var(--palette-primary-500-rgb);\n  letter-spacing: normal;\n}\n:host .about .icon {\n  width: 1.5rem;\n  height: 1.5rem;\n  font-size: 1.5rem;\n}\n:host .about:active .icon {\n  z-index: 1;\n}\n@media (max-width: 30rem) {\n  :host {\n    height: 4.5rem;\n  }\n  :host .product .text,\n  :host .about .text {\n    position: absolute;\n    width: 1px;\n    height: 1px;\n    padding: 0;\n    margin: -1px;\n    overflow: hidden;\n    clip: rect(0, 0, 0, 0);\n    border: 0;\n  }\n  :host .product {\n    height: 2.5rem;\n    padding: 0 0.25rem;\n  }\n  :host .product .logo {\n    width: 1.5rem;\n    height: 1.5rem;\n  }\n  :host .app {\n    font-size: 1rem;\n    line-height: 1.5rem;\n  }\n  :host .about {\n    min-width: 2.5rem;\n    width: 2.5rem;\n    height: 2.5rem;\n    padding: 0;\n  }\n  :host .about .icon {\n    margin: 0;\n  }\n}\n@media (max-width: 20rem) {\n  :host {\n    padding: 0;\n  }\n}\n@media (max-width: 22.5rem) {\n  :host {\n    padding: 0 1rem;\n  }\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);