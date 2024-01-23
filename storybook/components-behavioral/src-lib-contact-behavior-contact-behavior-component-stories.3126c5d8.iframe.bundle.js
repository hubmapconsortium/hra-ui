"use strict";(self.webpackChunkhra_ui=self.webpackChunkhra_ui||[]).push([[805],{"./libs/cdk/injectors/src/lib/dispatch/dispatch.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{WI:()=>dispatch});var _angular_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_ngxs_store__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@ngxs/store/fesm2015/ngxs-store.js");function identity(value){return value}function createActionFactory(type,boundArgs){return(...args)=>new type(...boundArgs,...args)}function dispatchImpl(actionFactory,resultHandler){const store=(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__.yh);return(...args)=>{const action=actionFactory(...args),obs$=store.dispatch(action);return resultHandler(action,obs$)}}function dispatch(type,...boundArgs){return dispatchImpl(createActionFactory(type,boundArgs),identity)}},"./libs/components/behavioral/src/lib/contact-behavior/contact-behavior.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>contact_behavior_component_stories});var resource_registry_state=__webpack_require__("./libs/cdk/state/src/resource-registry/resource-registry.state.ts"),resource_registry_actions=__webpack_require__("./libs/cdk/state/src/resource-registry/resource-registry.actions.ts"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let ContactService=class ContactService{};ContactService=(0,tslib_es6.gn)([(0,core.Injectable)()],ContactService);var empty=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/empty.js");let MockContactService=class MockContactService extends ContactService{sendMessage(message){return console.log("Message received. Content: "+JSON.stringify(message)),empty.E}};MockContactService=(0,tslib_es6.gn)([(0,core.Injectable)({providedIn:"root"})],MockContactService);var ngxs_store=__webpack_require__("./node_modules/@ngxs/store/fesm2015/ngxs-store.js"),contact_actions=__webpack_require__("./libs/state/src/lib/contact/contact.actions.ts");let ContactState=class ContactState{constructor(){this.contact=(0,core.inject)(ContactService)}sendMessage(_ctx,{message}){return this.contact.sendMessage(message)}};(0,tslib_es6.gn)([(0,ngxs_store.aU)(contact_actions.u),(0,tslib_es6.w6)("design:type",Function),(0,tslib_es6.w6)("design:paramtypes",[Object,contact_actions.u]),(0,tslib_es6.w6)("design:returntype",Object)],ContactState.prototype,"sendMessage",null),ContactState=(0,tslib_es6.gn)([(0,ngxs_store.ZM)({name:"contact"}),(0,core.Injectable)()],ContactState);var dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs");const contact_behavior_component_stories={title:"ContactBehaviorComponent",component:__webpack_require__("./libs/components/behavioral/src/lib/contact-behavior/contact-behavior.component.ts").Q,parameters:{state:{states:[ContactState,resource_registry_state.E],actions:[new resource_registry_actions.AU("assets/resources/contact.yml")]}},decorators:[(0,dist.applicationConfig)({providers:[{provide:ContactService,useExisting:MockContactService}]})]},Primary=(args=>({props:args})).bind({});Primary.args={},Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:"(args: ContactBehaviorComponent) => ({\n  props: args\n})",...Primary.parameters?.docs?.source}}};const __namedExportsOrder=["Primary"]}}]);