'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
customElements.define('compodoc-menu', /*#__PURE__*/function (_HTMLElement) {
  function _class() {
    var _this;
    _classCallCheck(this, _class);
    _this = _callSuper(this, _class);
    _this.isNormalMode = _this.getAttribute('mode') === 'normal';
    return _this;
  }
  _inherits(_class, _HTMLElement);
  return _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render(this.isNormalMode);
    }
  }, {
    key: "render",
    value: function render(isNormalMode) {
      var tp = lithtml.html("\n        <nav>\n            <ul class=\"list\">\n                <li class=\"title\">\n                    <a href=\"index.html\" data-type=\"index-link\">design-system</a>\n                </li>\n\n                <li class=\"divider\"></li>\n                ".concat(isNormalMode ? "<div id=\"book-search-input\" role=\"search\"><input type=\"text\" placeholder=\"Type to search\"></div>" : '', "\n                <li class=\"chapter\">\n                    <a data-type=\"chapter-link\" href=\"index.html\"><span class=\"icon ion-ios-home\"></span>Getting started</a>\n                    <ul class=\"links\">\n                        <li class=\"link\">\n                            <a href=\"overview.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-keypad\"></span>Overview\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"index.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>README\n                            </a>\n                        </li>\n                                <li class=\"link\">\n                                    <a href=\"dependencies.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-list\"></span>Dependencies\n                                    </a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"properties.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-apps\"></span>Properties\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class=\"chapter modules\">\n                        <a data-type=\"chapter-link\" href=\"modules.html\">\n                            <div class=\"menu-toggler linked\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"', ">\n                                <span class=\"icon ion-ios-archive\"></span>\n                                <span class=\"link-name\">Modules</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                        </a>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"', ">\n                            <li class=\"link\">\n                                <a href=\"modules/ButtonModule.html\" data-type=\"entity-link\" >ButtonModule</a>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#directives-links-module-ButtonModule-a47b123ab05987a11a562cfd45eb5d2eef93ec6b252461785f1673324b4070ea003e0450ebc633feb1600c9ef58e981808b349b23b703cb488eb4de230195c81"' : 'data-bs-target="#xs-directives-links-module-ButtonModule-a47b123ab05987a11a562cfd45eb5d2eef93ec6b252461785f1673324b4070ea003e0450ebc633feb1600c9ef58e981808b349b23b703cb488eb4de230195c81"', ">\n                                        <span class=\"icon ion-md-code-working\"></span>\n                                        <span>Directives</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="directives-links-module-ButtonModule-a47b123ab05987a11a562cfd45eb5d2eef93ec6b252461785f1673324b4070ea003e0450ebc633feb1600c9ef58e981808b349b23b703cb488eb4de230195c81"' : 'id="xs-directives-links-module-ButtonModule-a47b123ab05987a11a562cfd45eb5d2eef93ec6b252461785f1673324b4070ea003e0450ebc633feb1600c9ef58e981808b349b23b703cb488eb4de230195c81"', ">\n                                        <li class=\"link\">\n                                            <a href=\"directives/ButtonSizeDirective.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ButtonSizeDirective</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"directives/CallToActionButtonDirective.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >CallToActionButtonDirective</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"directives/NavigationCategoryButtonDirective.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >NavigationCategoryButtonDirective</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"directives/PrimaryButtonDirective.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >PrimaryButtonDirective</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"directives/SecondaryButtonDirective.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >SecondaryButtonDirective</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/ExpansionPanelModule.html\" data-type=\"entity-link\" >ExpansionPanelModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/ScrollingModule.html\" data-type=\"entity-link\" >ScrollingModule</a>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#directives-links-module-ScrollingModule-be92df704ab4f4a4523b66effa747b28adbcd4019d314eb5d936bc3c0fcb004ad347b57d224ea9715e389f15b61ce0bf4f8dd875fed05a827cd767ba1ce12c35"' : 'data-bs-target="#xs-directives-links-module-ScrollingModule-be92df704ab4f4a4523b66effa747b28adbcd4019d314eb5d936bc3c0fcb004ad347b57d224ea9715e389f15b61ce0bf4f8dd875fed05a827cd767ba1ce12c35"', ">\n                                        <span class=\"icon ion-md-code-working\"></span>\n                                        <span>Directives</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="directives-links-module-ScrollingModule-be92df704ab4f4a4523b66effa747b28adbcd4019d314eb5d936bc3c0fcb004ad347b57d224ea9715e389f15b61ce0bf4f8dd875fed05a827cd767ba1ce12c35"' : 'id="xs-directives-links-module-ScrollingModule-be92df704ab4f4a4523b66effa747b28adbcd4019d314eb5d936bc3c0fcb004ad347b57d224ea9715e389f15b61ce0bf4f8dd875fed05a827cd767ba1ce12c35"', ">\n                                        <li class=\"link\">\n                                            <a href=\"directives/ScrollOverflowFadeDirective.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ScrollOverflowFadeDirective</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/WorkflowCardModule.html\" data-type=\"entity-link\" >WorkflowCardModule</a>\n                            </li>\n                </ul>\n                </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links"' : 'data-bs-target="#xs-components-links"', ">\n                            <span class=\"icon ion-md-cog\"></span>\n                            <span>Components</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="components-links"' : 'id="xs-components-links"', ">\n                            <li class=\"link\">\n                                <a href=\"components/AppsCardComponent.html\" data-type=\"entity-link\" >AppsCardComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/AppsSidenavDemoComponent.html\" data-type=\"entity-link\" >AppsSidenavDemoComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/BrandLogoComponent.html\" data-type=\"entity-link\" >BrandLogoComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/BrandmarkComponent.html\" data-type=\"entity-link\" >BrandmarkComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/BreadcrumbsComponent.html\" data-type=\"entity-link\" >BreadcrumbsComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ButtonStylesComponent.html\" data-type=\"entity-link\" >ButtonStylesComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ButtonToggleStylesComponent.html\" data-type=\"entity-link\" >ButtonToggleStylesComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ColorPickerComponent.html\" data-type=\"entity-link\" >ColorPickerComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/DeleteFileButtonComponent.html\" data-type=\"entity-link\" >DeleteFileButtonComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/DeprecatedWorkflowCardComponent.html\" data-type=\"entity-link\" class=\"deprecated-name\">DeprecatedWorkflowCardComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ErrorIndicatorComponent.html\" data-type=\"entity-link\" >ErrorIndicatorComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ExpansionPanelActionsComponent.html\" data-type=\"entity-link\" >ExpansionPanelActionsComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ExpansionPanelComponent.html\" data-type=\"entity-link\" >ExpansionPanelComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ExpansionPanelHeaderContentComponent.html\" data-type=\"entity-link\" >ExpansionPanelHeaderContentComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/FooterComponent.html\" data-type=\"entity-link\" >FooterComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/FullscreenActionsComponent.html\" data-type=\"entity-link\" >FullscreenActionsComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/FullscreenPortalComponent.html\" data-type=\"entity-link\" >FullscreenPortalComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/FullscreenPortalContentComponent.html\" data-type=\"entity-link\" >FullscreenPortalContentComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/IconButtonStylesComponent.html\" data-type=\"entity-link\" >IconButtonStylesComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/InfoModalComponent.html\" data-type=\"entity-link\" >InfoModalComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/InputStylesComponent.html\" data-type=\"entity-link\" >InputStylesComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/MenuDemoComponent.html\" data-type=\"entity-link\" >MenuDemoComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/MenuStylesComponent.html\" data-type=\"entity-link\" >MenuStylesComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/MicroTooltipStylesComponent.html\" data-type=\"entity-link\" >MicroTooltipStylesComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/NavHeaderButtonsComponent.html\" data-type=\"entity-link\" >NavHeaderButtonsComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/NavHeaderComponent.html\" data-type=\"entity-link\" >NavHeaderComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/NoticeComponent.html\" data-type=\"entity-link\" >NoticeComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ProductLogoComponent.html\" data-type=\"entity-link\" >ProductLogoComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ScrollbarStylesComponent.html\" data-type=\"entity-link\" >ScrollbarStylesComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ScrollOverflowFadeStylesComponent.html\" data-type=\"entity-link\" >ScrollOverflowFadeStylesComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/SelectStylesComponent.html\" data-type=\"entity-link\" >SelectStylesComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/SnackbarComponent.html\" data-type=\"entity-link\" >SnackbarComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/SocialMediaButtonComponent.html\" data-type=\"entity-link\" >SocialMediaButtonComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/SoftwareStatusIndicatorComponent.html\" data-type=\"entity-link\" >SoftwareStatusIndicatorComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/StepIndicatorComponent.html\" data-type=\"entity-link\" >StepIndicatorComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/TableDemoComponent.html\" data-type=\"entity-link\" >TableDemoComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/TableStylesComponent.html\" data-type=\"entity-link\" >TableStylesComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/TooltipCardComponent.html\" data-type=\"entity-link\" >TooltipCardComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/TreeDemoComponent.html\" data-type=\"entity-link\" >TreeDemoComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/TreeStylesComponent.html\" data-type=\"entity-link\" >TreeStylesComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/WorkflowCardActionsComponent.html\" data-type=\"entity-link\" >WorkflowCardActionsComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/WorkflowCardComponent.html\" data-type=\"entity-link\" >WorkflowCardComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/WorkflowCardExtraComponent.html\" data-type=\"entity-link\" >WorkflowCardExtraComponent</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#directives-links"' : 'data-bs-target="#xs-directives-links"', ">\n                                <span class=\"icon ion-md-code-working\"></span>\n                                <span>Directives</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"directives/ButtonSizeDirective.html\" data-type=\"entity-link\" >ButtonSizeDirective</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"directives/CallToActionButtonDirective.html\" data-type=\"entity-link\" >CallToActionButtonDirective</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"directives/FullscreenDirective.html\" data-type=\"entity-link\" >FullscreenDirective</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"directives/IconButtonSizeDirective.html\" data-type=\"entity-link\" >IconButtonSizeDirective</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"directives/MicroTooltipDirective.html\" data-type=\"entity-link\" >MicroTooltipDirective</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"directives/NavigationCategoryButtonDirective.html\" data-type=\"entity-link\" >NavigationCategoryButtonDirective</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"directives/PrimaryButtonDirective.html\" data-type=\"entity-link\" >PrimaryButtonDirective</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"directives/ScrollOverflowFadeDirective.html\" data-type=\"entity-link\" >ScrollOverflowFadeDirective</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"directives/SecondaryButtonDirective.html\" data-type=\"entity-link\" >SecondaryButtonDirective</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"directives/SoftwareStatusSizeDirective.html\" data-type=\"entity-link\" >SoftwareStatusSizeDirective</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"directives/ToggleButtonSizeDirective.html\" data-type=\"entity-link\" >ToggleButtonSizeDirective</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"directives/TreeSizeDirective.html\" data-type=\"entity-link\" >TreeSizeDirective</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"directives/ViewOutletDirective.html\" data-type=\"entity-link\" >ViewOutletDirective</a>\n                                </li>\n                            </ul>\n                        </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links"' : 'data-bs-target="#xs-injectables-links"', ">\n                                <span class=\"icon ion-md-arrow-round-down\"></span>\n                                <span>Injectables</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"injectables/DialogService.html\" data-type=\"entity-link\" >DialogService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/SnackbarService.html\" data-type=\"entity-link\" >SnackbarService</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#interfaces-links"' : 'data-bs-target="#xs-interfaces-links"', ">\n                            <span class=\"icon ion-md-information-circle-outline\"></span>\n                            <span>Interfaces</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interfaces/BreadcrumbItem.html\" data-type=\"entity-link\" >BreadcrumbItem</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/ButtonToggleConfig.html\" data-type=\"entity-link\" >ButtonToggleConfig</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/CardData.html\" data-type=\"entity-link\" >CardData</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/DataItem.html\" data-type=\"entity-link\" >DataItem</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/DesignSystemOptions.html\" data-type=\"entity-link\" >DesignSystemOptions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/DialogData.html\" data-type=\"entity-link\" >DialogData</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/MenuDemoOption.html\" data-type=\"entity-link\" >MenuDemoOption</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/NestedNode.html\" data-type=\"entity-link\" >NestedNode</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/ScrollingGlobals.html\" data-type=\"entity-link\" >ScrollingGlobals</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/ScrollingOptions.html\" data-type=\"entity-link\" >ScrollingOptions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/SnackbarData.html\" data-type=\"entity-link\" >SnackbarData</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/TableDemoData.html\" data-type=\"entity-link\" >TableDemoData</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/TooltipContent.html\" data-type=\"entity-link\" >TooltipContent</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#miscellaneous-links"' : 'data-bs-target="#xs-miscellaneous-links"', ">\n                            <span class=\"icon ion-ios-cube\"></span>\n                            <span>Miscellaneous</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"', ">\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/functions.html\" data-type=\"entity-link\">Functions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/typealiases.html\" data-type=\"entity-link\">Type aliases</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/variables.html\" data-type=\"entity-link\">Variables</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"divider\"></li>\n                    <li class=\"copyright\">\n                        Documentation generated using <a href=\"https://compodoc.app/\" target=\"_blank\" rel=\"noopener noreferrer\">\n                            <img data-src=\"images/compodoc-vectorise.png\" class=\"img-responsive\" data-type=\"compodoc-logo\">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        "));
      this.innerHTML = tp.strings;
    }
  }]);
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));