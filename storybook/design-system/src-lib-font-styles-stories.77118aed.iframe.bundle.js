(self.webpackChunkhra_ui=self.webpackChunkhra_ui||[]).push([[1292],{"./node_modules/css-loader/dist/runtime/api.js":module=>{"use strict";module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/css-loader/dist/runtime/noSourceMaps.js":module=>{"use strict";module.exports=function(i){return i[1]}},"./libs/design-system/src/lib/font-styles.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_home_runner_work_hra_ui_hra_ui_libs_design_system_src_lib_font_styles_stories_ts_css_ngResource_home_runner_work_hra_ui_hra_ui_node_modules_ngtools_webpack_src_loaders_inline_resource_js_data_CiAgICAuY2FyZCB7CiAgICAgIGRpc3BsYXk6IGZsZXg7CiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47CiAgICAgIHdpZHRoOiBmaXQtY29udGVudDsKICAgICAgYm94LXNoYWRvdzogMHJlbSAwLjMxMjVyZW0gMXJlbSAwcmVtIHJnYihmcm9tIHZhcigtLXN5cy1zaGFkb3cpIHIgZyBiIC8gMC4zMjIpOwogICAgICBib3JkZXItcmFkaXVzOiAxcmVtOwogICAgICBwYWRkaW5nOiAxLjVyZW07CiAgICAgIGdhcDogMS41cmVtOwogICAgICBjb2xvcjogdmFyKC0tc3lzLXNlY29uZGFyeSk7CiAgICB9CgogICAgLmhlYWRlciB7CiAgICAgIGRpc3BsYXk6IGZsZXg7CiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47CiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1zeXMtb3V0bGluZS12YXJpYW50KTsKICAgICAgcGFkZGluZzogMCAxLjVyZW0gMXJlbSAwOwogICAgICBnYXA6IDAuNXJlbTsKICAgICAgY29sb3I6IHZhcigtLXN5cy1vbi1zZWNvbmRhcnktZml4ZWQpOwoKICAgICAgLmhlYWRlci10aXRsZSB7CiAgICAgICAgZm9udDogdmFyKC0tc3lzLWhlYWRsaW5lLWxhcmdlKTsKICAgICAgICBsZXR0ZXItc3BhY2luZzogdmFyKC0tc3lzLWhlYWRsaW5lLWxhcmdlLXRyYWNraW5nKTsKICAgICAgfQogICAgICAuaGVhZGVyLWRlc2NyaXB0aW9uIHsKICAgICAgICBmb250OiB2YXIoLS1zeXMtdGl0bGUtbWVkaXVtKTsKICAgICAgICBsZXR0ZXItc3BhY2luZzogdmFyKC0tc3lzLXRpdGxlLW1lZGl1bS10cmFja2luZyk7CiAgICAgIH0KICAgIH0KICA_3D_home_runner_work_hra_ui_hra_ui_libs_design_system_src_lib_font_styles_stories_ts__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./libs/design-system/src/lib/font-styles.stories.ts.css?ngResource!=!./node_modules/@ngtools/webpack/src/loaders/inline-resource.js?data=CiAgICAuY2FyZCB7CiAgICAgIGRpc3BsYXk6IGZsZXg7CiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47CiAgICAgIHdpZHRoOiBmaXQtY29udGVudDsKICAgICAgYm94LXNoYWRvdzogMHJlbSAwLjMxMjVyZW0gMXJlbSAwcmVtIHJnYihmcm9tIHZhcigtLXN5cy1zaGFkb3cpIHIgZyBiIC8gMC4zMjIpOwogICAgICBib3JkZXItcmFkaXVzOiAxcmVtOwogICAgICBwYWRkaW5nOiAxLjVyZW07CiAgICAgIGdhcDogMS41cmVtOwogICAgICBjb2xvcjogdmFyKC0tc3lzLXNlY29uZGFyeSk7CiAgICB9CgogICAgLmhlYWRlciB7CiAgICAgIGRpc3BsYXk6IGZsZXg7CiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47CiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1zeXMtb3V0bGluZS12YXJpYW50KTsKICAgICAgcGFkZGluZzogMCAxLjVyZW0gMXJlbSAwOwogICAgICBnYXA6IDAuNXJlbTsKICAgICAgY29sb3I6IHZhcigtLXN5cy1vbi1zZWNvbmRhcnktZml4ZWQpOwoKICAgICAgLmhlYWRlci10aXRsZSB7CiAgICAgICAgZm9udDogdmFyKC0tc3lzLWhlYWRsaW5lLWxhcmdlKTsKICAgICAgICBsZXR0ZXItc3BhY2luZzogdmFyKC0tc3lzLWhlYWRsaW5lLWxhcmdlLXRyYWNraW5nKTsKICAgICAgfQogICAgICAuaGVhZGVyLWRlc2NyaXB0aW9uIHsKICAgICAgICBmb250OiB2YXIoLS1zeXMtdGl0bGUtbWVkaXVtKTsKICAgICAgICBsZXR0ZXItc3BhY2luZzogdmFyKC0tc3lzLXRpdGxlLW1lZGl1bS10cmFja2luZyk7CiAgICAgIH0KICAgIH0KICA%3D!./libs/design-system/src/lib/font-styles.stories.ts"),_home_runner_work_hra_ui_hra_ui_libs_design_system_src_lib_font_styles_stories_ts_css_ngResource_home_runner_work_hra_ui_hra_ui_node_modules_ngtools_webpack_src_loaders_inline_resource_js_data_CiAgICAuY2FyZCB7CiAgICAgIGRpc3BsYXk6IGZsZXg7CiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47CiAgICAgIHdpZHRoOiBmaXQtY29udGVudDsKICAgICAgYm94LXNoYWRvdzogMHJlbSAwLjMxMjVyZW0gMXJlbSAwcmVtIHJnYihmcm9tIHZhcigtLXN5cy1zaGFkb3cpIHIgZyBiIC8gMC4zMjIpOwogICAgICBib3JkZXItcmFkaXVzOiAxcmVtOwogICAgICBwYWRkaW5nOiAxLjVyZW07CiAgICAgIGdhcDogMS41cmVtOwogICAgICBjb2xvcjogdmFyKC0tc3lzLXNlY29uZGFyeSk7CiAgICB9CgogICAgLmhlYWRlciB7CiAgICAgIGRpc3BsYXk6IGZsZXg7CiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47CiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1zeXMtb3V0bGluZS12YXJpYW50KTsKICAgICAgcGFkZGluZzogMCAxLjVyZW0gMXJlbSAwOwogICAgICBnYXA6IDAuNXJlbTsKICAgICAgY29sb3I6IHZhcigtLXN5cy1vbi1zZWNvbmRhcnktZml4ZWQpOwoKICAgICAgLmhlYWRlci10aXRsZSB7CiAgICAgICAgZm9udDogdmFyKC0tc3lzLWhlYWRsaW5lLWxhcmdlKTsKICAgICAgICBsZXR0ZXItc3BhY2luZzogdmFyKC0tc3lzLWhlYWRsaW5lLWxhcmdlLXRyYWNraW5nKTsKICAgICAgfQogICAgICAuaGVhZGVyLWRlc2NyaXB0aW9uIHsKICAgICAgICBmb250OiB2YXIoLS1zeXMtdGl0bGUtbWVkaXVtKTsKICAgICAgICBsZXR0ZXItc3BhY2luZzogdmFyKC0tc3lzLXRpdGxlLW1lZGl1bS10cmFja2luZyk7CiAgICAgIH0KICAgIH0KICA_3D_home_runner_work_hra_ui_hra_ui_libs_design_system_src_lib_font_styles_stories_ts__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_home_runner_work_hra_ui_hra_ui_libs_design_system_src_lib_font_styles_stories_ts_css_ngResource_home_runner_work_hra_ui_hra_ui_node_modules_ngtools_webpack_src_loaders_inline_resource_js_data_CiAgICAuY2FyZCB7CiAgICAgIGRpc3BsYXk6IGZsZXg7CiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47CiAgICAgIHdpZHRoOiBmaXQtY29udGVudDsKICAgICAgYm94LXNoYWRvdzogMHJlbSAwLjMxMjVyZW0gMXJlbSAwcmVtIHJnYihmcm9tIHZhcigtLXN5cy1zaGFkb3cpIHIgZyBiIC8gMC4zMjIpOwogICAgICBib3JkZXItcmFkaXVzOiAxcmVtOwogICAgICBwYWRkaW5nOiAxLjVyZW07CiAgICAgIGdhcDogMS41cmVtOwogICAgICBjb2xvcjogdmFyKC0tc3lzLXNlY29uZGFyeSk7CiAgICB9CgogICAgLmhlYWRlciB7CiAgICAgIGRpc3BsYXk6IGZsZXg7CiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47CiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1zeXMtb3V0bGluZS12YXJpYW50KTsKICAgICAgcGFkZGluZzogMCAxLjVyZW0gMXJlbSAwOwogICAgICBnYXA6IDAuNXJlbTsKICAgICAgY29sb3I6IHZhcigtLXN5cy1vbi1zZWNvbmRhcnktZml4ZWQpOwoKICAgICAgLmhlYWRlci10aXRsZSB7CiAgICAgICAgZm9udDogdmFyKC0tc3lzLWhlYWRsaW5lLWxhcmdlKTsKICAgICAgICBsZXR0ZXItc3BhY2luZzogdmFyKC0tc3lzLWhlYWRsaW5lLWxhcmdlLXRyYWNraW5nKTsKICAgICAgfQogICAgICAuaGVhZGVyLWRlc2NyaXB0aW9uIHsKICAgICAgICBmb250OiB2YXIoLS1zeXMtdGl0bGUtbWVkaXVtKTsKICAgICAgICBsZXR0ZXItc3BhY2luZzogdmFyKC0tc3lzLXRpdGxlLW1lZGl1bS10cmFja2luZyk7CiAgICAgIH0KICAgIH0KICA_3D_home_runner_work_hra_ui_hra_ui_libs_design_system_src_lib_font_styles_stories_ts__WEBPACK_IMPORTED_MODULE_3__),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_common__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs");const fontContent={Display:{type:"display",description:"Splash text headings",typography:{large:"Metropolis, Medium, 42/63, -1.25px",medium:"Metropolis, Medium, 38/57, -1.75px",small:"Metropolis, Medium, 32/48, -1.25px"}},Headline:{type:"headline",description:"Secondary headings",typography:{large:"Metropolis, Medium, 32/48, 0px",medium:"Metropolis, Medium, 28/42, 0px",small:"Metropolis, Medium, 24/32, 0px"}},Title:{type:"title",description:"Tertiary headings, titles in app components",typography:{large:"Metropolis, Medium, 24/36, 0px",medium:"Metropolis, Medium, 20/30, 0px",small:"Metropolis Medium, 16/24, 0px "}},Label:{type:"label",description:"Buttons, application interfaces, data visualizations",typography:{large:"Metropolis, Medium, 16/24, 0px",medium:"Metropolis, Medium, 14/21, 0px ",small:"Metropolis, Medium, 12/18, 0px"}},Body:{type:"body",description:"Paragraph text",typography:{splash:"Nunito Sans, 18/27, +0.5px",large:"Nunito Sans, 16/24, +0.5px",medium:"Nunito Sans, 14/21, +0.5px",small:"Nunito Sans, 12/18, +0.5px"}},Wordmark:{type:"wordmark",description:"HRA Wordmark only",typography:{large:"Metropolis, Regular, 25/36, 0.1px",small:"Metropolis, Regular, 12/18, 0px"}}};let FontStylesDemoComponent=class FontStylesDemoComponent{constructor(){this.variant=_angular_core__WEBPACK_IMPORTED_MODULE_0__.input.required(),this.typographies=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.computed)((()=>Object.entries(this.variant().typography)))}getStyles(size){return{font:`var(--sys-${this.variant().type}-${size})`,"letter-spacing":`var(--sys-${this.variant().type}-${size}-tracking)`}}static#_=this.propDecorators={variant:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:[{isSignal:!0,alias:"variant",required:!0,transform:void 0}]}]}};FontStylesDemoComponent=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Component)({selector:"hra-font-styles-demo",standalone:!0,template:'\n    <div class="card">\n      <div class="header">\n        <span class="header-title">{{ variant().type | titlecase }}</span>\n        <span class="header-description">Uses: {{ variant().description }}</span>\n      </div>\n      @for (entry of typographies(); track entry) {\n        <div [style]="getStyles(entry[0])">{{ entry[0] | titlecase }}: {{ entry[1] }}</div>\n      }\n    </div>\n  ',imports:[_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule],changeDetection:_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,styles:[_home_runner_work_hra_ui_hra_ui_libs_design_system_src_lib_font_styles_stories_ts_css_ngResource_home_runner_work_hra_ui_hra_ui_node_modules_ngtools_webpack_src_loaders_inline_resource_js_data_CiAgICAuY2FyZCB7CiAgICAgIGRpc3BsYXk6IGZsZXg7CiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47CiAgICAgIHdpZHRoOiBmaXQtY29udGVudDsKICAgICAgYm94LXNoYWRvdzogMHJlbSAwLjMxMjVyZW0gMXJlbSAwcmVtIHJnYihmcm9tIHZhcigtLXN5cy1zaGFkb3cpIHIgZyBiIC8gMC4zMjIpOwogICAgICBib3JkZXItcmFkaXVzOiAxcmVtOwogICAgICBwYWRkaW5nOiAxLjVyZW07CiAgICAgIGdhcDogMS41cmVtOwogICAgICBjb2xvcjogdmFyKC0tc3lzLXNlY29uZGFyeSk7CiAgICB9CgogICAgLmhlYWRlciB7CiAgICAgIGRpc3BsYXk6IGZsZXg7CiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47CiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1zeXMtb3V0bGluZS12YXJpYW50KTsKICAgICAgcGFkZGluZzogMCAxLjVyZW0gMXJlbSAwOwogICAgICBnYXA6IDAuNXJlbTsKICAgICAgY29sb3I6IHZhcigtLXN5cy1vbi1zZWNvbmRhcnktZml4ZWQpOwoKICAgICAgLmhlYWRlci10aXRsZSB7CiAgICAgICAgZm9udDogdmFyKC0tc3lzLWhlYWRsaW5lLWxhcmdlKTsKICAgICAgICBsZXR0ZXItc3BhY2luZzogdmFyKC0tc3lzLWhlYWRsaW5lLWxhcmdlLXRyYWNraW5nKTsKICAgICAgfQogICAgICAuaGVhZGVyLWRlc2NyaXB0aW9uIHsKICAgICAgICBmb250OiB2YXIoLS1zeXMtdGl0bGUtbWVkaXVtKTsKICAgICAgICBsZXR0ZXItc3BhY2luZzogdmFyKC0tc3lzLXRpdGxlLW1lZGl1bS10cmFja2luZyk7CiAgICAgIH0KICAgIH0KICA_3D_home_runner_work_hra_ui_hra_ui_libs_design_system_src_lib_font_styles_stories_ts__WEBPACK_IMPORTED_MODULE_3___default()]})],FontStylesDemoComponent);const __WEBPACK_DEFAULT_EXPORT__={component:FontStylesDemoComponent,title:"FontStyles",parameters:{design:{type:"figma",url:"https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=192-39"}},argTypes:{variant:{control:"select",options:Object.keys(fontContent),mapping:fontContent}},args:{variant:fontContent.Display}},Primary={args:{}},__namedExportsOrder=["Primary"];Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:"{\n  args: {}\n}",...Primary.parameters?.docs?.source}}}},"./libs/design-system/src/lib/font-styles.stories.ts.css?ngResource!=!./node_modules/@ngtools/webpack/src/loaders/inline-resource.js?data=CiAgICAuY2FyZCB7CiAgICAgIGRpc3BsYXk6IGZsZXg7CiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47CiAgICAgIHdpZHRoOiBmaXQtY29udGVudDsKICAgICAgYm94LXNoYWRvdzogMHJlbSAwLjMxMjVyZW0gMXJlbSAwcmVtIHJnYihmcm9tIHZhcigtLXN5cy1zaGFkb3cpIHIgZyBiIC8gMC4zMjIpOwogICAgICBib3JkZXItcmFkaXVzOiAxcmVtOwogICAgICBwYWRkaW5nOiAxLjVyZW07CiAgICAgIGdhcDogMS41cmVtOwogICAgICBjb2xvcjogdmFyKC0tc3lzLXNlY29uZGFyeSk7CiAgICB9CgogICAgLmhlYWRlciB7CiAgICAgIGRpc3BsYXk6IGZsZXg7CiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47CiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1zeXMtb3V0bGluZS12YXJpYW50KTsKICAgICAgcGFkZGluZzogMCAxLjVyZW0gMXJlbSAwOwogICAgICBnYXA6IDAuNXJlbTsKICAgICAgY29sb3I6IHZhcigtLXN5cy1vbi1zZWNvbmRhcnktZml4ZWQpOwoKICAgICAgLmhlYWRlci10aXRsZSB7CiAgICAgICAgZm9udDogdmFyKC0tc3lzLWhlYWRsaW5lLWxhcmdlKTsKICAgICAgICBsZXR0ZXItc3BhY2luZzogdmFyKC0tc3lzLWhlYWRsaW5lLWxhcmdlLXRyYWNraW5nKTsKICAgICAgfQogICAgICAuaGVhZGVyLWRlc2NyaXB0aW9uIHsKICAgICAgICBmb250OiB2YXIoLS1zeXMtdGl0bGUtbWVkaXVtKTsKICAgICAgICBsZXR0ZXItc3BhY2luZzogdmFyKC0tc3lzLXRpdGxlLW1lZGl1bS10cmFja2luZyk7CiAgICAgIH0KICAgIH0KICA%3D!./libs/design-system/src/lib/font-styles.stories.ts":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"\n    .card {\n      display: flex;\n      flex-direction: column;\n      width: fit-content;\n      box-shadow: 0rem 0.3125rem 1rem 0rem rgb(from var(--sys-shadow) r g b / 0.322);\n      border-radius: 1rem;\n      padding: 1.5rem;\n      gap: 1.5rem;\n      color: var(--sys-secondary);\n    }\n\n    .header {\n      display: flex;\n      flex-direction: column;\n      border-bottom: 1px solid var(--sys-outline-variant);\n      padding: 0 1.5rem 1rem 0;\n      gap: 0.5rem;\n      color: var(--sys-on-secondary-fixed);\n\n      .header-title {\n        font: var(--sys-headline-large);\n        letter-spacing: var(--sys-headline-large-tracking);\n      }\n      .header-description {\n        font: var(--sys-title-medium);\n        letter-spacing: var(--sys-title-medium-tracking);\n      }\n    }\n  ",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);