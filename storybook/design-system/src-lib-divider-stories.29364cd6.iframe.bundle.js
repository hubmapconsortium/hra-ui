"use strict";(self.webpackChunkhra_ui=self.webpackChunkhra_ui||[]).push([[7537],{"./libs/design-system/src/lib/divider.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Divider:()=>Divider,__namedExportsOrder:()=>__namedExportsOrder,default:()=>divider_stories});var core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),coercion=__webpack_require__("./node_modules/@angular/cdk/fesm2022/coercion.mjs"),fesm2022_core=__webpack_require__("./node_modules/@angular/material/fesm2022/core.mjs");class MatDivider{constructor(){this._vertical=!1,this._inset=!1}get vertical(){return this._vertical}set vertical(value){this._vertical=(0,coercion.he)(value)}get inset(){return this._inset}set inset(value){this._inset=(0,coercion.he)(value)}static#_=this.ɵfac=function MatDivider_Factory(__ngFactoryType__){return new(__ngFactoryType__||MatDivider)};static#_2=this.ɵcmp=core["ɵɵdefineComponent"]({type:MatDivider,selectors:[["mat-divider"]],hostAttrs:["role","separator",1,"mat-divider"],hostVars:7,hostBindings:function MatDivider_HostBindings(rf,ctx){2&rf&&(core["ɵɵattribute"]("aria-orientation",ctx.vertical?"vertical":"horizontal"),core["ɵɵclassProp"]("mat-divider-vertical",ctx.vertical)("mat-divider-horizontal",!ctx.vertical)("mat-divider-inset",ctx.inset))},inputs:{vertical:"vertical",inset:"inset"},standalone:!0,features:[core["ɵɵStandaloneFeature"]],decls:0,vars:0,template:function MatDivider_Template(rf,ctx){},styles:[".mat-divider{display:block;margin:0;border-top-style:solid;border-top-color:var(--mat-divider-color, var(--mat-app-outline));border-top-width:var(--mat-divider-width)}.mat-divider.mat-divider-vertical{border-top:0;border-right-style:solid;border-right-color:var(--mat-divider-color, var(--mat-app-outline));border-right-width:var(--mat-divider-width)}.mat-divider.mat-divider-inset{margin-left:80px}[dir=rtl] .mat-divider.mat-divider-inset{margin-left:auto;margin-right:80px}"],encapsulation:2,changeDetection:0})}("undefined"==typeof ngDevMode||ngDevMode)&&core["ɵsetClassMetadata"](MatDivider,[{type:core.Component,args:[{selector:"mat-divider",host:{role:"separator","[attr.aria-orientation]":'vertical ? "vertical" : "horizontal"',"[class.mat-divider-vertical]":"vertical","[class.mat-divider-horizontal]":"!vertical","[class.mat-divider-inset]":"inset",class:"mat-divider"},template:"",encapsulation:core.ViewEncapsulation.None,changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,styles:[".mat-divider{display:block;margin:0;border-top-style:solid;border-top-color:var(--mat-divider-color, var(--mat-app-outline));border-top-width:var(--mat-divider-width)}.mat-divider.mat-divider-vertical{border-top:0;border-right-style:solid;border-right-color:var(--mat-divider-color, var(--mat-app-outline));border-right-width:var(--mat-divider-width)}.mat-divider.mat-divider-inset{margin-left:80px}[dir=rtl] .mat-divider.mat-divider-inset{margin-left:auto;margin-right:80px}"]}]}],null,{vertical:[{type:core.Input}],inset:[{type:core.Input}]});class MatDividerModule{static#_=this.ɵfac=function MatDividerModule_Factory(__ngFactoryType__){return new(__ngFactoryType__||MatDividerModule)};static#_2=this.ɵmod=core["ɵɵdefineNgModule"]({type:MatDividerModule,imports:[fesm2022_core.yE,MatDivider],exports:[MatDivider,fesm2022_core.yE]});static#_3=this.ɵinj=core["ɵɵdefineInjector"]({imports:[fesm2022_core.yE,fesm2022_core.yE]})}("undefined"==typeof ngDevMode||ngDevMode)&&core["ɵsetClassMetadata"](MatDividerModule,[{type:core.NgModule,args:[{imports:[fesm2022_core.yE,MatDivider],exports:[MatDivider,fesm2022_core.yE]}]}],null,null);var dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs");const content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",divider_stories={title:"MatDivider",decorators:[(0,dist.moduleMetadata)({imports:[MatDividerModule]})]},Divider={args:{vertical:!1},render:args=>({props:args,template:`\n    <div class="container" [class.vertical]="${args.vertical}">\n      <div class="content before">${content}</div>\n      <mat-divider vertical="${args.vertical}"></mat-divider>\n      <div class="content after">${content}</div>\n    </div>\n    `,styles:["div.container {\n        display: flex;\n        flex-direction: column;\n        font: var(--sys-body-medium);\n        letter-spacing: var(--sys-body-medium-tracking);\n      }","div.container.vertical {\n        flex-direction: row;\n      }","div.container .content {\n        margin: 8px;\n      }"]})},__namedExportsOrder=["Divider"];Divider.parameters={...Divider.parameters,docs:{...Divider.parameters?.docs,source:{originalSource:'{\n  args: {\n    vertical: false\n  },\n  render: args => ({\n    props: args,\n    template: `\n    <div class="container" [class.vertical]="${args[\'vertical\']}">\n      <div class="content before">${content}</div>\n      <mat-divider vertical="${args[\'vertical\']}"></mat-divider>\n      <div class="content after">${content}</div>\n    </div>\n    `,\n    styles: [`div.container {\n        display: flex;\n        flex-direction: column;\n        font: var(--sys-body-medium);\n        letter-spacing: var(--sys-body-medium-tracking);\n      }`, `div.container.vertical {\n        flex-direction: row;\n      }`, `div.container .content {\n        margin: 8px;\n      }`]\n  })\n}',...Divider.parameters?.docs?.source}}}}}]);